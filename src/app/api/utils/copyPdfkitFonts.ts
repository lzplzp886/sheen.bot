// src/app/api/utils/copyPdfkitFonts.ts

import fs from "fs";
import path from "path";

export function copyPdfkitFonts() {
  // 源目录：node_modules/pdfkit/js/data
  const srcDir = path.resolve("node_modules/pdfkit/js/data");

  // 目标目录：.next/server/chunks/data
  const destDir = path.resolve(".next/server/chunks/data");

  // 如果目标目录不存在就递归创建
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log("[fonts] created", destDir);
  }

  // 把整个目录 cp 过去（Node ≥16.7.0 支持 fs.cp）
  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log("[fonts] copied pdfkit/js/data →", destDir);
}
