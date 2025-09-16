// src/app/api/payfast/env.ts

export const PAYFAST = {
  MERCHANT_ID : process.env.NEXT_PAYFAST_MERCHANT_ID ?? "",
  MERCHANT_KEY: process.env.NEXT_PAYFAST_MERCHANT_KEY ?? "",
  PASSPHRASE  : process.env.NEXT_PAYFAST_PASSPHRASE ?? "",
  PROCESS_URL : process.env.NEXT_PAYFAST_PROCESS_URL ?? "",
  BASE_URL    : process.env.NEXT_PAYFAST_BASE_URL ?? "",
};

// 是否打印调试日志（签名字段、签名值等；不会打印 passphrase）
export const PAYFAST_DEBUG =
  process.env.NEXT_PAYFAST_DEBUG === "1";
