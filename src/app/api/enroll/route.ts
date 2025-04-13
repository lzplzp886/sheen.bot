// src/app/api/enroll/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { Buffer } from "buffer";
import path from "path";
import fs from "fs";

// 辅助函数：确保将 pdfkit 内置的 Helvetica.afm 文件复制到可访问目录中
function ensureHelveticaAFM() {
  // 源文件：pdfkit 内置 Helvetica.afm 的位置
  const sourcePath = path.resolve("node_modules/pdfkit/js/data/Helvetica.afm");
  // 目标目录，例如放在 .next/server/app/api/enroll/data 下
  const destDir = path.resolve(".next/server/app/api/enroll/data");
  const destPath = path.join(destDir, "Helvetica.afm");

  // 创建目标目录（如果不存在）
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log("Created directory:", destDir);
  }

  // 如果目标文件不存在，则复制源文件到目标
  if (!fs.existsSync(destPath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log("Copied Helvetica.afm to:", destPath);
  } else {
    console.log("Helvetica.afm already exists at:", destPath);
  }
}

export async function POST(request: Request) {
  console.log("=== [API] /api/enroll [POST] ===");

  try {
    // 1. 解析前端表单数据
    const formData = await request.json();
    console.log("Received formData:", formData);

    // 先确保内置字体文件已复制（hacky 方案）
    ensureHelveticaAFM();

    // 2. 创建 PDF 文档并包装为 Promise，等待生成完成
    const pdfBuffer: Buffer = await new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      // 构建自定义字体文件的绝对路径（你也可以替换成其他字体，如 OpenSans-Regular.ttf）
      const fontPath = path.join(process.cwd(), "public", "fonts", "Helvetica.ttf");
      console.log("Custom font file path:", fontPath, "Exists?", fs.existsSync(fontPath));
      // 注册自定义字体，并覆盖默认“Helvetica”
      doc.registerFont("Helvetica", fontPath);

      doc.on("error", (err) => {
        console.error("[PDFDocument error]", err);
        reject(err);
      });
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => {
        const data = Buffer.concat(buffers);
        console.log("PDF generation complete. Size:", data.length);
        resolve(data);
      });

      // 写入 PDF 内容，采用注册的字体
      doc.font("Helvetica").fontSize(16).text("Sheen Academy Enrollment Form", { align: "center" });
      doc.moveDown();
      doc.font("Helvetica").fontSize(12).text(`Referral Code: ${formData.referralCode || ""}`);
      doc.font("Helvetica").text(`Number of Children: ${formData.children?.length || 0}`);

      // 如果有签名数据，则添加签名页
      if (formData.signatureData) {
        try {
          const base64Data = formData.signatureData.replace(/^data:image\/\w+;base64,/, "");
          const sigBuffer = Buffer.from(base64Data, "base64");
          doc.addPage();
          doc.font("Helvetica").text("Signature:", { align: "left" });
          doc.image(sigBuffer, { fit: [300, 100], align: "center" });
        } catch (imgErr) {
          console.error("[Signature] Error inserting image into PDF:", imgErr);
        }
      }

      console.log("doc.end() called. PDF generation in progress...");
      doc.end();
    });

    // 模拟加载效果：此时将打印发送邮件前的进度
    console.log(`Generating Enrollment Form, Sending to '${formData.parentEmail}'...`);

    // 3. 配置 Nodemailer 并发送邮件
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // 使用 STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: process.env.SMTP_TLS_CIPHERS || "SSLv3",
      },
    });
    console.log("[Nodemailer] Transporter created. Attempting to send mail...");

    const mailOptions = {
      from: '"Sheen Academy Enrollment" <info@sheen.co.za>',
      to: formData.parentEmail,
      subject: "Sheen Academy Enrollment Form",
      text: "Your form has been received. See attached PDF.",
      attachments: [
        {
          filename: "enrollment.pdf",
          content: pdfBuffer,
        },
      ],
    };
    console.log("[Nodemailer] mailOptions:", mailOptions);

    const info = await transporter.sendMail(mailOptions);
    console.log("[Nodemailer] Message sent:", info.messageId);
    console.log("Sent");

    // 返回最终响应：这里返回 progress 作为 "Sent"
    return NextResponse.json({
      progress: "Sent",
      message: "Your enrollment form has been submitted and emailed!",
      info: info,
    });
  } catch (error) {
    console.error("[/api/enroll] Server Error:", error);
    return NextResponse.json({ message: "Server Error", error: error instanceof Error ? error.message : error }, { status: 500 });
  }
}
