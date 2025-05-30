// src/app/api/workshop-registration/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { Buffer } from "buffer";
import path from "path";
import fs from "fs";
import { saveEnrollmentData } from "./saveEnrollmentData";
import type { FormDataType } from "./type";

// ========== 1) 定义接口 ==========
interface ExtendedPDFDocument extends PDFKit.PDFDocument {
  pageNumber: number; // 仅在运行时可访问
}

export interface ChildInfo {
  firstName?: string;
  surname?: string;
  age?: number;
  grade?: string;
  schoolName?: string; // 新增：学校名称
  medicalConditions?: string;
  allergies?: string;
  gender?: string;
}

// // ========== 2) Hacky 方案：复制 PDFKit 的 Helvetica.afm 文件 ==========
// function ensureHelveticaAFM() {
//   const sourcePath = path.resolve("node_modules/pdfkit/js/data/Helvetica.afm");
//   const destDir = path.resolve(".next/server/app/api/workshop-registration/data");
//   const destPath = path.join(destDir, "Helvetica.afm");

//   if (!fs.existsSync(destDir)) {
//     fs.mkdirSync(destDir, { recursive: true });
//     console.log("Created directory:", destDir);
//   }
//   if (!fs.existsSync(destPath)) {
//     fs.copyFileSync(sourcePath, destPath);
//     console.log("Copied Helvetica.afm to:", destPath);
//   } else {
//     console.log("Helvetica.afm already exists at:", destPath);
//   }
// }

// function ensureHelveticaBoldAFM() {
//   const sourcePath = path.resolve("node_modules/pdfkit/js/data/Helvetica-Bold.afm");
//   const destDir = path.resolve(".next/server/app/api/workshop-registration/data");
//   const destPath = path.join(destDir, "Helvetica-Bold.afm");

//   if (!fs.existsSync(destDir)) {
//     fs.mkdirSync(destDir, { recursive: true });
//     console.log("Created directory:", destDir);
//   }
//   if (!fs.existsSync(destPath)) {
//     fs.copyFileSync(sourcePath, destPath);
//     console.log("Copied Helvetica-Bold.afm to:", destPath);
//   } else {
//     console.log("Helvetica-Bold.afm already exists at:", destPath);
//   }
// }

// ========== 3) 根据 age 返回班级文字描述 ==========
// 此处原来返回图标路径，现改为返回文字信息
function getClassLabelByAge(age?: number): string {
  if (typeof age !== "number") return "";
  if (age >= 6 && age <= 8) return "Intro Class (6-8 yrs)";
  if (age >= 9 && age <= 11) return "Junior Class (9-11 yrs)";
  if (age >= 12 && age <= 17) return "Explorer Class (12+ yrs)";
  return "";
}

// ========== 4) 绘制页头：使用两列布局，将 logo 与公司信息包裹在“表格”中垂直居中 ==========
function drawHeader(doc: ExtendedPDFDocument) {
  const pageMargin = doc.page.margins.left || 50;
  const currentY = doc.y;
  const logoPath = path.join(process.cwd(), "public", "images", "enrollment", "logo.png");

  // 公司信息文本设置
  doc.fontSize(8);
  const headerText = `Sheen Technologies Pty Ltd (Reg No. 2024/133334/07)
Unit C1, Century Square, Heron Crescent,
Century City, Cape Town, 7441`;

  // 测量文本高度（假设宽度 300）
  const textWidth = 300;
  const textHeight = doc.heightOfString(headerText, { width: textWidth });
  // 若 logo 存在，则固定宽 60；否则为 0
  const logoHeight = fs.existsSync(logoPath) ? 60 : 0;
  const rowHeight = Math.max(textHeight, logoHeight);

  // 居中绘制 logo（左侧）
  if (logoHeight > 0) {
    doc.image(logoPath, pageMargin, currentY + (rowHeight - logoHeight) / 2, { width: 60 });
  }
  // 右侧绘制公司信息，距离 logo 80 像素处
  const textX = pageMargin + 80;
  doc.text(headerText, textX, currentY + (rowHeight - textHeight) / 2, { width: textWidth });
  // 更新光标位置：下移 rowHeight 加间距
  doc.y = currentY + rowHeight + 20;
}

// ========== 5) “两列表格”模块渲染函数 ==========

/**
 * dataRows: 数组，每一项为 [左侧 label, 右侧 value]
 * tableTitle: 表格标题（例如 "General Info"、"Child #1" 等）
 *
 * 注意：
 * - 我们不再根据 icon 的高度去增大 rowHeight。
 * - 整行文本（label/value）垂直居中。
 * - 如果有图标，则该列仅传入内容，不进行额外高度调整（现已不再使用图标，调用时传空）。
 */
function renderTwoColTable(
  doc: ExtendedPDFDocument,
  dataRows: Array<[string, string | undefined, string?]>,
  tableTitle?: string
) {
  const pageMargin = doc.page.margins.left || 50;
  const availableWidth = doc.page.width - pageMargin * 2;
  const tableMaxWidth = availableWidth * 0.8; // 80% width
  const tableX = pageMargin + (availableWidth - tableMaxWidth) / 2;

  if (tableTitle) {
    doc.fontSize(12).text(tableTitle, tableX, doc.y, {
      width: availableWidth,
      align: "left",
      underline: true,
    });
    doc.moveDown(0.5);
  }

  const innerPadding = 10;
  // 调整：左列 30%，右列 70%
  const col1W = (tableMaxWidth - innerPadding * 2) * 0.3;
  const col2W = tableMaxWidth - innerPadding * 2 - col1W;

  // 计算总高度：不因图标增高
  let totalHeight = 0;
  const rowHeights: number[] = dataRows.map((row) => {
    const [label, value] = row;
    const labelH = doc.heightOfString(label || "", { width: col1W });
    const valueH = doc.heightOfString(value || "", { width: col2W });
    const rowH = Math.max(labelH, valueH) + 10; // +10 为底部留白
    totalHeight += rowH;
    return rowH;
  });

  const bottomMargin = doc.page.margins.bottom || 50;
  const pageBottom = doc.page.height - bottomMargin;
  if (doc.y + totalHeight > pageBottom) {
    doc.addPage();
    drawHeader(doc);
  }

  const startY = doc.y;
  const tableHeight = totalHeight + 10; // 上下各留少许空白
  doc.save();
  doc.strokeColor("#4790FC")
    .lineWidth(2)
    .roundedRect(tableX, startY, tableMaxWidth, tableHeight, 8)
    .stroke();
  doc.restore();

  const col1X = tableX + innerPadding;
  const col2X = col1X + col1W + innerPadding;

  let currentY = startY + 5;
  for (let i = 0; i < dataRows.length; i++) {
    const [label, value] = dataRows[i];
    const rowH = rowHeights[i];

    const labelH = doc.heightOfString(label || "", { width: col1W });
    const valueH = doc.heightOfString(value || "", { width: col2W });
    const labelY = currentY + (rowH - labelH) / 2;
    const valueY = currentY + (rowH - valueH) / 2;

    doc.fontSize(10).text(label || "", col1X, labelY, { width: col1W });
    doc.text(value || "", col2X, valueY, { width: col2W });

    // 如果有图标，此处已经不使用图标显示（调用时传空即可）
    currentY += rowH;
  }
  doc.y = startY + tableHeight + 10;
  doc.moveDown(0.5);
}

// ========== 6) 主处理逻辑 ==========
export async function POST(request: Request) {
  console.log("=== [API] /api/workshop-registration [POST] ===");
  try {
    const formData: FormDataType = await request.json();
    console.log("Received formData:", formData);

    // 保存到 DynamoDB
    const recordId = await saveEnrollmentData(formData);
    console.log("Data stored with recordId:", recordId);

    // ensureHelveticaAFM();
    // ensureHelveticaBoldAFM();

    // 提取孩子姓名
    let childNames = "";
    if (Array.isArray(formData.children) && formData.children.length > 0) {
      childNames = formData.children
        .map(child => `${child.firstName || ""} ${child.surname || ""}`)
        .join(" & ")
        .trim();
    }
    if (!childNames) childNames = "(Unnamed Child)";

    // 创建 PDF 文档
    const doc = new PDFDocument({ autoFirstPage: false, margin: 50 }) as ExtendedPDFDocument;
    const buffers: Buffer[] = [];
    doc.on("data", chunk => buffers.push(chunk));
    doc.on("error", err => {
      console.error("[PDFDocument error]", err);
      throw err;
    });

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      doc.on("end", () => {
        const data = Buffer.concat(buffers);
        console.log("PDF generation complete. Size:", data.length);
        resolve(data);
      });

      // ---------- 打开第一页并绘制页头 ----------
      doc.addPage();
      drawHeader(doc);

      // 大标题：居中显示、加粗
      doc.moveDown(2);
      doc.font("Helvetica-Bold").fontSize(22).text("Sheen Academy Registration Form", {
        align: "left",
      });
      doc.moveDown(1);

      // ========== 模块 1：General Info ==========
      const generalRows: Array<[string, string]> = [
                ["Number of Children", String(formData.children?.length || 0)],
        ["Parent/Guardian Name", `${formData.parentFirstName || ""} ${formData.parentSurname || ""}`],
        ["Parent/Guardian Relationship", formData.parentRelationship || ""],
        ["Contact Number", formData.parentContactNumber || ""],
        ["Email Address", formData.parentEmail || ""],
        ["Preferred Contact Method(s)", (formData.preferredContactMethods || []).join(", ")],
        ["Subscribe Newsletter", formData.subscribeNewsletter || ""],
      ];
      const generalRowsData = generalRows.map(row => [row[0], row[1]]) as Array<[string, string, string?]>;
      renderTwoColTable(doc, generalRowsData, "General Info");

      // ========== 模块 2：Children ==========
      if (formData.children && formData.children.length > 0) {
        formData.children.forEach((child, idx) => {
          const childLabel = `Child #${idx + 1}`;
          const nameVal = `${child.firstName || ""} ${child.surname || ""}`;
          const ageVal = child.age == null ? "?" : String(child.age);
          const genderVal = child.gender || "Unknown";
          const schoolVal = child.schoolName || "N/A";
          const gradeVal = child.grade || "N/A";
          const medical = child.medicalConditions || "None";
          const allergies = child.allergies || "None";

          // 使用文字描述班级
          const classLabel = getClassLabelByAge(child.age);

          const childData: Array<[string, string | undefined, string?]> = [
            ["Name", nameVal],
            ["Age", ageVal],
            ["Gender", genderVal],
            ["School", schoolVal],
            ["Grade", gradeVal],
            ["Medical Conditions", medical],
            ["Allergies", allergies],
          ];
          if (classLabel) {
            childData.push(["Class Group", classLabel]);
          }
          renderTwoColTable(doc, childData, childLabel);
        });
      }

      // ========== 模块 3：Emergency Contact ==========
      const emergencyRows: Array<[string, string]> = [
        ["Name", `${formData.emergencyFirstName || ""} ${formData.emergencySurname || ""}`],
        ["Contact Number", formData.emergencyContactNumber || ""],
        ["Relationship", formData.emergencyRelationship || ""]
      ];
      const emergencyRowsData = emergencyRows.map(row => [row[0], row[1]]) as Array<[string, string, string?]>;
      renderTwoColTable(doc, emergencyRowsData, "Emergency Contact");

      // ========== 模块 4：Authorized Pickup #1 ==========
      const pickup1Rows: Array<[string, string]> = [
        ["Name", `${formData.pickup1FirstName || ""} ${formData.pickup1Surname || ""}`],
        ["Contact Number", formData.pickup1ContactNumber || ""],
        ["Relationship", formData.pickup1Relationship || ""]
      ];
      const pickup1RowsData = pickup1Rows.map(row => [row[0], row[1]]) as Array<[string, string, string?]>;
      renderTwoColTable(doc, pickup1RowsData, "Authorized Pickup #1");

      // ========== 模块 5：Authorized Pickup #2 ==========
      const pickup2Rows: Array<[string, string]> = [
        ["Name", `${formData.pickup2FirstName || ""} ${formData.pickup2Surname || ""}`],
        ["Contact Number", formData.pickup2ContactNumber || ""],
        ["Relationship", formData.pickup2Relationship || ""]
      ];
      const pickup2RowsData = pickup2Rows.map(row => [row[0], row[1]]) as Array<[string, string, string?]>;
      renderTwoColTable(doc, pickup2RowsData, "Authorized Pickup #2");

      // ========== 模块 8：Preferred Schedule ==========
      if (formData.selectedTimeslots && formData.selectedTimeslots.length > 0) {
        const scheduleRows: Array<[string, string]> = [
          ["Workshop Schedule", formData.selectedTimeslots.join(", ")]
        ];
        const scheduleRowsData = scheduleRows.map(row => [row[0], row[1]]) as Array<[string, string, string?]>;
        renderTwoColTable(doc, scheduleRowsData, "Preferred Schedule");
      }

      // ========== 模块 6：Consent & POPIA ==========
      const consentCheck = formData.consentConfirmed ? "[x]" : "[ ]";
      const popiaCheck = formData.popiaConfirmed ? "[x]" : "[ ]";
      const consentText = `I, the undersigned, confirm that all the information provided is accurate. I consent to my child participating in the coding and robotics course. I understand that the academy will take all reasonable precautions to ensure the safety of my child. In case of a medical emergency, I authorize the academy to seek medical assistance for my child if I am not immediately available. I agree to all mentioned above.`;
      const popiaText = `PROTECTION OF PERSONAL INFORMATION ACT (POPIA) COMPLIANCE

By completing this form, you acknowledge that you understand and agree to the collection and processing of personal information in accordance with the Protection of Personal Information Act (POPIA) of South Africa. Your personal data will be used solely for registration, communication, and safety purposes. We will not share your information with third parties without your consent. I consent to my personal information being collected and used as per the terms stated above.`;
      const consentRows: Array<[string, string]> = [
        [`${consentCheck} Consent Confirmed`, consentText],
        [`${popiaCheck} POPIA Confirmed`, popiaText],
      ];
      const consentRowsData = consentRows.map(row => [row[0], row[1]]) as Array<[string, string, string?]>;
      renderTwoColTable(doc, consentRowsData, "Consent & POPIA");

      // ========== 模块 7：签名区域 ==========
      doc.font("Helvetica-Bold").fontSize(12).text("Parent / Guardian Signature", { align: "left", underline: true });
      doc.moveDown(1);
      if (formData.signatureData) {
        try {
          const base64Data = formData.signatureData.replace(/^data:image\/\w+;base64,/, "");
          const sigBuffer = Buffer.from(base64Data, "base64");
          // 居中显示签名图像
          const sigX = (doc.page.width - 150) / 2;
          doc.image(sigBuffer, sigX, doc.y, { fit: [150, 80] });
          doc.moveDown(1);
        } catch (imgErr) {
          console.error("[Signature] Error inserting image into PDF:", imgErr);
          doc.fillColor("red").text("Signature image failed to load.", { align: "left" });
          doc.fillColor("black");
        }
      } else {
        doc.text("[No signature provided]", { align: "left" });
      }
      const now = new Date();
      const timeString = now.toUTCString();
      // 指定输出UTC时间
      doc.moveDown(0.5);
      doc.fillColor("#D9D9D9").fontSize(10).text(`Signed at ${timeString}`, { align: "left" });

      doc.end();
    });

    console.log(`Sending PDF to '${formData.parentEmail}'...`);

    // ========== 7) 使用 nodemailer 发送邮件 ==========

    // 从环境变量里读抄送，按逗号分割成数组
    const ccEnv = process.env.SMTP_CC || "";
    const ccList = ccEnv
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: process.env.SMTP_TLS_CIPHERS || "SSLv3",
      },
    });

    const pdfFileName = `sheen academy - Workshop registration form - ${childNames}.pdf`.replace(/\s+/, " ");
    const subjectLine = `sheen academy - Workshop registration form for ${childNames}`;
    const emailText = `Hello ${formData.parentFirstName},

Thank you for registering your child(ren) ${childNames} at Sheen Academy!

We are excited to have them join our workshops. Attached is a PDF copy of the registration form for your reference. We look forward to seeing your child(ren) soon.

If you have any questions, feel free to contact us.

Best Regards,
Sheen Academy
`;

    const mailOptions = {
      from: '"Sheen Academy Workshop Registration" <info@sheen.co.za>',
      to: formData.parentEmail,
      ...(ccList.length > 0 && { cc: ccList }),
      subject: subjectLine,
      text: emailText,
      attachments: [
        {
          filename: pdfFileName,
          content: pdfBuffer,
        },
      ],
    };

    console.log("[Nodemailer] mailOptions:", mailOptions);
    const info = await transporter.sendMail(mailOptions);
    console.log("[Nodemailer] Message sent:", info.messageId);

    return NextResponse.json({
      progress: "Sent",
      message: "Your registration form has been submitted and emailed!",
      info: info,
    });
  } catch (error) {
    console.error("[/api/workshop-registration] Server Error:", error);
    return NextResponse.json(
      {
        message: "Server Error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
