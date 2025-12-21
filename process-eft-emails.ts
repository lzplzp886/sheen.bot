// scripts/process-eft-emails.ts

import fs from "fs";
import path from "path";
import csv from "csv-parser";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import dotenv from "dotenv";

// 加载环境变量
// 优先加载 .env.local，因为这里通常包含敏感信息（密码等）
const result = dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (result.error) {
  // 如果找不到 .env.local，尝试加载默认的 .env
  console.log("Note: .env.local not found, trying .env...");
  dotenv.config();
}

// ================= 配置区域 =================
const CSV_FILE_PATH = path.join(process.cwd(), "results.csv");

// 1. 不需要再次发送的黑名单 (姓名 或 电话)
const EXCLUDED_USERS = [
  "Portia Mubenga-Mutombo",
  "Michele Geldenhuys",
  "27820421912"
];

// 2. 已处理邮箱集合 (用于去重)
const processedEmails = new Set<string>();

// ================= 类型定义 =================
interface ChildInfo {
  firstName?: string;
  surname?: string;
  age?: number;
  grade?: string;
  schoolName?: string;
  medicalConditions?: string;
  allergies?: string;
  gender?: string;
}

interface FormDataType {
  parentFirstName?: string;
  parentSurname?: string;
  parentEmail?: string;
  parentContactNumber?: string;
  parentRelationship?: string;
  emergencyFirstName?: string;
  emergencySurname?: string;
  emergencyContactNumber?: string;
  emergencyRelationship?: string;
  pickup1FirstName?: string;
  pickup1Surname?: string;
  pickup1ContactNumber?: string;
  pickup1Relationship?: string;
  pickup2FirstName?: string;
  pickup2Surname?: string;
  pickup2ContactNumber?: string;
  pickup2Relationship?: string;
  children?: ChildInfo[];
  selectedTimeslots?: string[];
  preferredContactMethods?: string[];
  subscribeNewsletter?: string;
  consentConfirmed?: boolean;
  popiaConfirmed?: boolean;
  signatureData?: string;
}

// ================= DynamoDB JSON 解包工具 (递归处理) =================
function unmarshallValue(val: any): any {
  if (!val || typeof val !== 'object') return val;
  
  if ('S' in val) return val.S;
  if ('N' in val) return Number(val.N);
  if ('BOOL' in val) return val.BOOL;
  if ('M' in val) return unmarshallDdbItem(val.M);
  if ('L' in val) return (val.L as any[]).map(unmarshallValue);
  
  // 如果没有任何类型包装，可能是已经是普通对象，递归处理其属性
  return unmarshallDdbItem(val);
}

function unmarshallDdbItem(item: any): any {
  if (!item || typeof item !== 'object') return item;
  const result: any = {};
  for (const key in item) {
    // 忽略 DynamoDB 元数据字段（如果有）
    if (key === 'stashId' || key === 'ttlSeconds') continue;
    result[key] = unmarshallValue(item[key]);
  }
  return result;
}

// 安全获取字符串并 Trim
function safeTrim(val: any): string {
  if (val === null || val === undefined) return "";
  return String(val).trim();
}

// ================= PDF 辅助函数 =================
function getClassLabelByAge(age?: number): string {
  if (typeof age !== "number") return "";
  if (age >= 6 && age <= 8) return "Intro Class (6-8 yrs)";
  if (age >= 9 && age <= 11) return "Junior Class (9-11 yrs)";
  if (age >= 12 && age <= 17) return "Explorer Class (12+ yrs)";
  return "";
}

function drawHeader(doc: PDFKit.PDFDocument) {
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

function renderTwoColTable(
  doc: PDFKit.PDFDocument,
  dataRows: Array<[string, string | undefined, string?]>,
  tableTitle?: string
) {
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

// ================= PDF 生成 =================
async function generatePDF(formData: FormDataType, childNames: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ autoFirstPage: false, margin: 50 });
    const buffers: Buffer[] = [];
    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("error", reject);
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    doc.addPage();
    drawHeader(doc);

    doc.moveDown(2);
    doc.font("Helvetica-Bold").fontSize(22).text("Sheen Academy Registration Form", { align: "left" });
    doc.moveDown(1);

    // 1. General Info
    const generalRows: Array<[string, string]> = [
      ["Number of Children", String(formData.children?.length || 0)],
      ["Parent/Guardian Name", `${safeTrim(formData.parentFirstName)} ${safeTrim(formData.parentSurname)}`],
      ["Parent/Guardian Relationship", safeTrim(formData.parentRelationship)],
      ["Contact Number", safeTrim(formData.parentContactNumber)],
      ["Email Address", safeTrim(formData.parentEmail)],
      ["Preferred Contact Method(s)", (formData.preferredContactMethods || []).join(", ")],
      ["Subscribe Newsletter", safeTrim(formData.subscribeNewsletter)],
    ];
    renderTwoColTable(doc, generalRows.map(r => [r[0], r[1]]), "General Info");

    // 2. Children
    if (formData.children && formData.children.length > 0) {
      formData.children.forEach((child, idx) => {
        const childLabel = `Child #${idx + 1}`;
        const nameVal = `${safeTrim(child.firstName)} ${safeTrim(child.surname)}`;
        const classLabel = getClassLabelByAge(child.age);
        const childData: Array<[string, string | undefined, string?]> = [
          ["Name", nameVal],
          ["Age", child.age == null ? "?" : String(child.age)],
          ["Gender", safeTrim(child.gender) || "Unknown"],
          ["School", safeTrim(child.schoolName) || "N/A"],
          ["Grade", safeTrim(child.grade) || "N/A"],
          ["Medical Conditions", safeTrim(child.medicalConditions) || "None"],
          ["Allergies", safeTrim(child.allergies) || "None"],
        ];
        if (classLabel) childData.push(["Class Group", "Holiday Camp"]);
        renderTwoColTable(doc, childData, childLabel);
      });
    }

    // 3. Emergency Contact
    const emergencyRows = [
      ["Name", `${safeTrim(formData.emergencyFirstName)} ${safeTrim(formData.emergencySurname)}`],
      ["Contact Number", safeTrim(formData.emergencyContactNumber)],
      ["Relationship", safeTrim(formData.emergencyRelationship)]
    ];
    renderTwoColTable(doc, emergencyRows.map(r=>[r[0],r[1]] as [string, string]), "Emergency Contact");
    
    // 4. Pickup #1
    const pickup1Rows: Array<[string, string]> = [
      ["Name", `${safeTrim(formData.pickup1FirstName)} ${safeTrim(formData.pickup1Surname)}`],
      ["Contact Number", safeTrim(formData.pickup1ContactNumber)],
      ["Relationship", safeTrim(formData.pickup1Relationship)]
    ];
    renderTwoColTable(doc, pickup1Rows.map(r => [r[0], r[1]]), "Authorized Pickup #1");

    // 5. Pickup #2
    const pickup2Rows: Array<[string, string]> = [
      ["Name", `${safeTrim(formData.pickup2FirstName)} ${safeTrim(formData.pickup2Surname)}`],
      ["Contact Number", safeTrim(formData.pickup2ContactNumber)],
      ["Relationship", safeTrim(formData.pickup2Relationship)]
    ];
    renderTwoColTable(doc, pickup2Rows.map(r => [r[0], r[1]]), "Authorized Pickup #2");

    // 6. Preferred Schedule
    if (formData.selectedTimeslots && formData.selectedTimeslots.length > 0) {
      const scheduleRows: Array<[string, string]> = [
        ["Workshop Schedule", formData.selectedTimeslots.join(", ")]
      ];
      renderTwoColTable(doc, scheduleRows.map(r => [r[0], r[1]]), "Preferred Schedule");
    }

    // 7. Consent & POPIA (FULL TEXT from route.ts)
    const consentCheck = formData.consentConfirmed ? "[x]" : "[ ]";
    const popiaCheck = formData.popiaConfirmed ? "[x]" : "[ ]";
    
    const consentText = `I, the undersigned, confirm that all the information provided is accurate. I consent to my child participating in the coding and robotics course. I understand that the academy will take all reasonable precautions to ensure the safety of my child. In case of a medical emergency, I authorize the academy to seek medical assistance for my child if I am not immediately available. I agree to all mentioned above.`;
    
    const popiaText = `PROTECTION OF PERSONAL INFORMATION ACT (POPIA) COMPLIANCE

By completing this form, you acknowledge that you understand and agree to the collection and processing of personal information in accordance with the Protection of Personal Information Act (POPIA) of South Africa. Your personal data will be used solely for registration, communication, and safety purposes. We will not share your information with third parties without your consent. I consent to my personal information being collected and used as per the terms stated above.`;

    renderTwoColTable(doc, [
      [`${consentCheck} Consent Confirmed`, consentText],
      [`${popiaCheck} POPIA Confirmed`, popiaText],
    ], "Consent & POPIA");

    // 8. Signature
    doc.font("Helvetica-Bold").fontSize(12).text("Parent / Guardian Signature", { align: "left", underline: true });
    doc.moveDown(1);
    if (formData.signatureData && String(formData.signatureData).startsWith("data:image")) {
      try {
        const base64Data = String(formData.signatureData).replace(/^data:image\/\w+;base64,/, "");
        const sigBuffer = Buffer.from(base64Data, "base64");
        const sigX = (doc.page.width - 150) / 2;
        doc.image(sigBuffer, sigX, doc.y, { fit: [150, 80] });
        doc.moveDown(1);
      } catch (e) {
        doc.text("[Signature Load Failed]");
      }
    } else {
      doc.text("[No signature provided]");
    }
    
    // 9. Signed At Footer (UTC Time)
    const now = new Date();
    doc.moveDown(0.5);
    doc.fillColor("#D9D9D9").fontSize(10).text(`Signed at ${now.toUTCString()}`, { align: "left" });

    doc.end();
  });
}

// ================= 发送邮件 =================
async function sendEmail(formData: FormDataType, pdfBuffer: Buffer, childNames: string) {
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
    tls: { ciphers: process.env.SMTP_TLS_CIPHERS || "SSLv3" },
  });

  const pdfFileName = `sheen academy - Workshop registration form - ${childNames}.pdf`.replace(/\s+/, " ");
  const parentName = safeTrim(formData.parentFirstName) || "Parent";
  
  // Standard Email Template from route.ts
  const subjectLine = `sheen academy - Workshop registration form for ${childNames}`;
  const emailText = `Hello ${parentName},

Thank you for registering your child(ren) ${childNames} at Sheen Academy!

We are excited to have them join our workshops. Attached is a PDF copy of the registration form for your reference. We look forward to seeing your child(ren) soon.

If you have any questions, feel free to contact us.

Best Regards,
Sheen Academy
`;

  await transporter.sendMail({
    from: '"Sheen Academy Workshop Registration" <info@sheen.co.za>',
    to: formData.parentEmail,
    cc: ccList,
    subject: subjectLine,
    text: emailText,
    attachments: [{ filename: pdfFileName, content: pdfBuffer }],
  });
}

// ================= 主流程 =================
async function main() {
  console.log("=== Starting EFT Email Processing (Direct CSV Value) ===");

  const rows: any[] = [];
  
  fs.createReadStream(CSV_FILE_PATH)
    .pipe(csv())
    .on("data", (data) => rows.push(data))
    .on("end", async () => {
      console.log(`Loaded ${rows.length} rows from CSV.`);
      
      let successCount = 0;
      let skipCount = 0;
      let failCount = 0;

      for (const row of rows) {
        try {
          // 1. 获取 raw value (DynamoDB JSON string)
          const rawValue = row.value;
          if (!rawValue) {
            console.log("Skipping row: No 'value' column found.");
            continue;
          }

          // 2. 解析 JSON
          let ddbJsonObj;
          try {
            ddbJsonObj = JSON.parse(rawValue);
          } catch (e) {
            console.warn("Failed to parse value JSON string");
            // 打印出错误的原始数据，方便查找是哪位家长
            console.log("BAD ROW DATA:", rawValue);
            failCount++;
            continue;
          }

          // 3. 解包 DynamoDB JSON
          const formData = unmarshallDdbItem(ddbJsonObj) as FormDataType;
          
          // 4. 提取关键字段
          const fullName = `${safeTrim(formData.parentFirstName)} ${safeTrim(formData.parentSurname)}`;
          const email = safeTrim(formData.parentEmail).toLowerCase();
          const contact = safeTrim(formData.parentContactNumber).replace(/\s+/g, "");

          // 5. 黑名单检查
          const isExcluded = EXCLUDED_USERS.some(ex => 
             fullName.includes(ex) || 
             (contact && contact.includes(ex))
          );

          if (isExcluded) {
            console.log(`[SKIP] Excluded User: ${fullName}`);
            skipCount++;
            continue;
          }

          if (!email || processedEmails.has(email)) {
            console.log(`[SKIP] Duplicate or Invalid Email: ${email}`);
            skipCount++;
            continue;
          }

          // 6. 生成 PDF 并发送
          console.log(`>>> Processing: ${fullName} <${email}>`);
          
          let childNames = "(Unnamed)";
          if (formData.children && Array.isArray(formData.children) && formData.children.length > 0) {
            childNames = formData.children.map(c => `${safeTrim(c.firstName)} ${safeTrim(c.surname)}`).join(" & ");
          }

          const pdfBuffer = await generatePDF(formData, childNames);
          await sendEmail(formData, pdfBuffer, childNames);
          
          processedEmails.add(email);
          console.log(`[SUCCESS] Email sent to ${email}`);
          successCount++;

          // 限流防止被封
          await new Promise(r => setTimeout(r, 1000));

        } catch (err) {
          console.error(`[FAIL] Error processing row:`, err);
          failCount++;
        }
      }

      console.log("\n=== Processing Complete ===");
      console.log(`Success: ${successCount}`);
      console.log(`Skipped: ${skipCount}`);
      console.log(`Failed:  ${failCount}`);
    });
}

main().catch(console.error);