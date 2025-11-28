// src/app/api/workshop-registration/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { Buffer } from "buffer";
import path from "path";
import fs from "fs";
import { saveEnrollmentData } from "./saveEnrollmentData";
import type { FormDataType } from "./type";
import { copyPdfkitFonts } from "../utils/copyPdfkitFonts";

// +++ 新增依赖 +++
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

// ========== 0) AWS Stash 读取工具 ==========
const ddbRaw = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddb = DynamoDBDocumentClient.from(ddbRaw);
const STASH_TABLE = process.env.DDB_PAYFAST_STASH_TABLE || "sheen.bot-payfast-stash";

// 辅助函数：如果传入的数据看起来像 stash 引用，则去数据库捞取完整数据
// 修正：将 any 改为 unknown，并添加类型检查
async function resolveStashedData(data: unknown): Promise<FormDataType> {
  // 1. 将输入视为通用的键值对对象，以便进行属性检查
  const input = data as Record<string, unknown>;

  // 2. 检查特征：data 是对象 && 有 stashId (string) && 没有 parentEmail
  if (
    input &&
    typeof input === "object" &&
    typeof input.stashId === "string" &&
    !input.parentEmail
  ) {
    console.log(`[Registration] Detected stashId: ${input.stashId}, fetching full payload...`);
    try {
      const out = await ddb.send(new GetCommand({
        TableName: STASH_TABLE,
        Key: { stashId: input.stashId as string },
      }));
      
      if (out.Item && out.Item.value) {
        console.log(`[Registration] Successfully unstashed data for ${input.stashId}`);
        return out.Item.value as FormDataType;
      } else {
        console.warn(`[Registration] Stash record not found for ${input.stashId}`);
      }
    } catch (err) {
      console.error("[Registration] Failed to fetch stash:", err);
    }
  }
  
  // 3. 如果不需要解包，或者解包失败，返回原始数据
  return data as FormDataType;
}

// ========== 1) 定义接口 (保持不变) ==========
interface ExtendedPDFDocument extends PDFKit.PDFDocument {
  pageNumber: number; 
}
// ... (ChildInfo 接口等保持不变)

// ========== 3) 辅助函数 (保持不变) ==========
function getClassLabelByAge(age?: number): string {
    if (typeof age !== "number") return "";
    if (age >= 6 && age <= 8) return "Intro Class (6-8 yrs)";
    if (age >= 9 && age <= 11) return "Junior Class (9-11 yrs)";
    if (age >= 12 && age <= 17) return "Explorer Class (12+ yrs)";
    return "";
}

// ========== 4) 绘制页头 (保持不变) ==========
function drawHeader(doc: ExtendedPDFDocument) {
    // ... (原代码内容)
    const pageMargin = doc.page.margins.left || 50;
    const currentY = doc.y;
    const logoPath = path.join(process.cwd(), "public", "images", "enrollment", "logo.png");
  
    doc.fontSize(8);
    const headerText = `Sheen Technologies Pty Ltd (Reg No. 2024/133334/07)
Unit C4, Century Square, Heron Crescent,
Century City, Cape Town, 7441`;
  
    const textWidth = 300;
    const textHeight = doc.heightOfString(headerText, { width: textWidth });
    const logoHeight = fs.existsSync(logoPath) ? 60 : 0;
    const rowHeight = Math.max(textHeight, logoHeight);
  
    if (logoHeight > 0) {
      doc.image(logoPath, pageMargin, currentY + (rowHeight - logoHeight) / 2, { width: 60 });
    }
    const textX = pageMargin + 80;
    doc.text(headerText, textX, currentY + (rowHeight - textHeight) / 2, { width: textWidth });
    doc.y = currentY + rowHeight + 20;
}

// ========== 5) 表格渲染函数 (保持不变) ==========
function renderTwoColTable(
  doc: ExtendedPDFDocument,
  dataRows: Array<[string, string | undefined, string?]>,
  tableTitle?: string
) {
    // ... (原代码内容，省略以节省篇幅，请保持原逻辑完全不变)
    const pageMargin = doc.page.margins.left || 50;
    const availableWidth = doc.page.width - pageMargin * 2;
    const tableMaxWidth = availableWidth * 0.8; 
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
    const col1W = (tableMaxWidth - innerPadding * 2) * 0.3;
    const col2W = tableMaxWidth - innerPadding * 2 - col1W;
  
    let totalHeight = 0;
    const rowHeights: number[] = dataRows.map((row) => {
      const [label, value] = row;
      const labelH = doc.heightOfString(label || "", { width: col1W });
      const valueH = doc.heightOfString(value || "", { width: col2W });
      const rowH = Math.max(labelH, valueH) + 10; 
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
    const tableHeight = totalHeight + 10; 
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
      currentY += rowH;
    }
    doc.y = startY + tableHeight + 10;
    doc.moveDown(0.5);
}

// ========== 6) 主处理逻辑 (有修改) ==========
export async function POST(request: Request) {
  console.log("=== [API] /api/workshop-registration [POST] ===");
  try {
    const rawData = await request.json();
    
    // +++ 关键修改：在这里尝试解包 Stash 数据 +++
    // 如果是 EFT 流程，传入的可能是 { stashId: "..." }
    // 如果是 PayFast 流程，notify 接口可能已经解包过了，但也兼容再查一次
    const formData = await resolveStashedData(rawData);

    console.log("Processing formData for:", formData.parentEmail);

    // 校验：如果解包后还是没有 email，说明出问题了
    if (!formData.parentEmail) {
        throw new Error("Missing parentEmail. Data might be corrupted or stash retrieval failed.");
    }

    // ... (以下逻辑保持不变) ...
    const recordId = await saveEnrollmentData(formData);
    console.log("Data stored with recordId:", recordId);

    copyPdfkitFonts();

    let childNames = "";
    if (Array.isArray(formData.children) && formData.children.length > 0) {
      childNames = formData.children
        .map(child => `${child.firstName || ""} ${child.surname || ""}`)
        .join(" & ")
        .trim();
    }
    if (!childNames) childNames = "(Unnamed Child)";

    // ... PDF 生成逻辑保持不变 ...
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
        resolve(data);
      });

      doc.addPage();
      drawHeader(doc);

      doc.moveDown(2);
      doc.font("Helvetica-Bold").fontSize(22).text("Sheen Academy Registration Form", {
        align: "left",
      });
      doc.moveDown(1);

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
            childData.push(["Class Group", "Holiday Camp"]);
          }
          renderTwoColTable(doc, childData, childLabel);
        });
      }

      const emergencyRows: Array<[string, string]> = [
        ["Name", `${formData.emergencyFirstName || ""} ${formData.emergencySurname || ""}`],
        ["Contact Number", formData.emergencyContactNumber || ""],
        ["Relationship", formData.emergencyRelationship || ""]
      ];
      renderTwoColTable(doc, emergencyRows.map(r=>[r[0],r[1]]), "Emergency Contact");

      const pickup1Rows: Array<[string, string]> = [
        ["Name", `${formData.pickup1FirstName || ""} ${formData.pickup1Surname || ""}`],
        ["Contact Number", formData.pickup1ContactNumber || ""],
        ["Relationship", formData.pickup1Relationship || ""]
      ];
      renderTwoColTable(doc, pickup1Rows.map(r=>[r[0],r[1]]), "Authorized Pickup #1");

      const pickup2Rows: Array<[string, string]> = [
        ["Name", `${formData.pickup2FirstName || ""} ${formData.pickup2Surname || ""}`],
        ["Contact Number", formData.pickup2ContactNumber || ""],
        ["Relationship", formData.pickup2Relationship || ""]
      ];
      renderTwoColTable(doc, pickup2Rows.map(r=>[r[0],r[1]]), "Authorized Pickup #2");

      if (formData.selectedTimeslots && formData.selectedTimeslots.length > 0) {
        renderTwoColTable(doc, [["Workshop Schedule", formData.selectedTimeslots.join(", ")]], "Preferred Schedule");
      }

      const consentCheck = formData.consentConfirmed ? "[x]" : "[ ]";
      const popiaCheck = formData.popiaConfirmed ? "[x]" : "[ ]";
      // (文字内容略，保持原样)
      const consentText = `I, the undersigned, confirm that all the information provided is accurate...`;
      const popiaText = `PROTECTION OF PERSONAL INFORMATION ACT (POPIA) COMPLIANCE...`; 
      
      const consentRows: Array<[string, string]> = [
        [`${consentCheck} Consent Confirmed`, consentText],
        [`${popiaCheck} POPIA Confirmed`, popiaText],
      ];
      renderTwoColTable(doc, consentRows.map(r=>[r[0],r[1]]), "Consent & POPIA");

      doc.font("Helvetica-Bold").fontSize(12).text("Parent / Guardian Signature", { align: "left", underline: true });
      doc.moveDown(1);
      if (formData.signatureData) {
        try {
          const base64Data = formData.signatureData.replace(/^data:image\/\w+;base64,/, "");
          const sigBuffer = Buffer.from(base64Data, "base64");
          const sigX = (doc.page.width - 150) / 2;
          doc.image(sigBuffer, sigX, doc.y, { fit: [150, 80] });
          doc.moveDown(1);
        } catch (imgErr) {
          console.error("[Signature] Error inserting image into PDF:", imgErr);
          doc.text("[Signature image failed to load]", { align: "left" });
        }
      } else {
        doc.text("[No signature provided]", { align: "left" });
      }
      const now = new Date();
      doc.moveDown(0.5);
      doc.fillColor("#D9D9D9").fontSize(10).text(`Signed at ${now.toUTCString()}`, { align: "left" });

      doc.end();
    });

    console.log(`Sending PDF to '${formData.parentEmail}'...`);

    // ... 邮件发送逻辑保持不变 ...
    const ccEnv = process.env.SMTP_CC || "";
    const ccList = ccEnv.split(",").map(s => s.trim()).filter(Boolean);
    
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
    const emailText = `Hello ${formData.parentFirstName},\n\nThank you for registering your child(ren) ${childNames} at Sheen Academy!\n\nWe are excited to have them join our workshops. Attached is a PDF copy of the registration form for your reference. We look forward to seeing your child(ren) soon.\n\nIf you have any questions, feel free to contact us.\n\nBest Regards,\nSheen Academy\n`;

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