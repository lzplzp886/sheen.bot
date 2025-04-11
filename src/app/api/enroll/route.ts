import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { Buffer } from "buffer";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    // formData 中包含所有 enrollment 信息 + signatureData (base64)

    // 1. 创建PDF
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];
    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

      // 2. 发送邮件 (示例)
      const transporter = nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        secure: false,
        auth: {
          user: "your_email@example.com",
          pass: "your_password",
        },
      });

      await transporter.sendMail({
        from: '"Sheen Academy" <your_email@example.com>',
        to: formData.parentEmail,
        subject: "Sheen Academy Enrollment",
        text: "Your form has been received. See attached PDF.",
        attachments: [
          {
            filename: "enrollment.pdf",
            content: pdfData,
          },
        ],
      });

      return NextResponse.json({ message: "Form submitted and email sent!" });
    });

    // PDF 内容示例
    doc.fontSize(16).text("Sheen Academy Enrollment Form", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Referral Code: ${formData.referralCode || ""}`);
    doc.text(`Number of Children: ${formData.children?.length || 0}`);
    // ... 根据你前端的字段逐个写入
    // 在最后插入签名
    if (formData.signatureData) {
      const base64Data = formData.signatureData.replace(/^data:image\/\w+;base64,/, "");
      const sigBuffer = Buffer.from(base64Data, "base64");
      doc.addPage();
      doc.text("Signature:", { align: "left" });
      doc.image(sigBuffer, { fit: [300, 100], align: "center" });
    }

    doc.end();
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
