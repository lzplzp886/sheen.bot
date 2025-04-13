// src/app/api/enroll/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { Buffer } from "buffer";

export async function POST(request: Request) {
  console.log("=== [API] /api/enroll [POST] ===");

  try {
    // 1. 解析前端表单数据
    const formData = await request.json();
    console.log("Received formData:", formData);

    // 2. 创建 PDFDocument
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    // 如果 PDFKit 在生成过程中出现错误，也会帮助调试
    doc.on("error", (err) => {
      console.error("[PDFDocument error]", err);
    });

    doc.on("data", (chunk) => buffers.push(chunk));

    doc.on("end", async () => {
      // doc 生成结束后，把 buffers 合并成完整 pdf
      const pdfData = Buffer.concat(buffers);
      console.log("PDF generation complete. Size:", pdfData.length);

      // 3. 配置 nodemailer
      const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false, // STARTTLS
        auth: {
          user: "info@sheen.co.za",
          pass: "+m4GWK9?&p;E+Pc",
        },
        // 也可以尝试加一下 tls 配置：
        tls: {
          ciphers: "SSLv3",
        },
      });

      console.log("[Nodemailer] Transporter created. Attempting to send mail...");

      try {
        // 4. 发送带 PDF 附件的邮件
        const mailOptions = {
          from: '"Sheen Academy" <info@sheen.co.za>',
          to: formData.parentEmail,
          subject: "Sheen Academy Enrollment Form",
          text: "Your form has been received. See attached PDF.",
          attachments: [
            {
              filename: "enrollment.pdf",
              content: pdfData,
            },
          ],
        };

        console.log("[Nodemailer] mailOptions:", mailOptions);

        const info = await transporter.sendMail(mailOptions);
        console.log("[Nodemailer] Message sent:", info.messageId);

        return NextResponse.json({
          message: "Form submitted and email sent!",
          info: info,
        });
      } catch (sendErr) {
        // 如果 sendMail 抛错，会在这里捕获
        console.error("[Nodemailer] Error sending mail:", sendErr);
        return NextResponse.json(
          {
            message: "Error sending email",
            error: (sendErr as Error).message,
          },
          { status: 500 }
        );
      }
    });

    // 在这里写入 PDF 文本内容
    doc.fontSize(16).text("Sheen Academy Enrollment Form", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Referral Code: ${formData.referralCode || ""}`);
    doc.text(`Number of Children: ${formData.children?.length || 0}`);

    // 如果有签名数据
    if (formData.signatureData) {
      try {
        const base64Data = formData.signatureData.replace(/^data:image\/\w+;base64,/, "");
        const sigBuffer = Buffer.from(base64Data, "base64");
        doc.addPage();
        doc.text("Signature:", { align: "left" });
        doc.image(sigBuffer, { fit: [300, 100], align: "center" });
      } catch (imgErr) {
        console.error("[Signature] Error inserting image into PDF:", imgErr);
      }
    }

    // 结束 PDF 流，让 doc.on("end", ...) 触发
    doc.end();
  } catch (error) {
    // 如果在 parse JSON 或其他地方报错，会在这里捕获
    console.error("[/api/enroll] Server Error:", error);
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}
