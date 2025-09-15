// src/app/api/payfast/env.ts
function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`[payfast/env] Missing env: ${name}`);
  return v;
}

const PROCESS_URL = required("NEXT_PAYFAST_PROCESS_URL");
const BASE_URL    = required("NEXT_PAYFAST_BASE_URL");

export const PAYFAST = {
  // 基础配置（全部为 string，避免 TS 报错）
  PROCESS_URL: required("NEXT_PAYFAST_PROCESS_URL"),
  BASE_URL: required("NEXT_PAYFAST_BASE_URL"),
  MERCHANT_ID: required("NEXT_PAYFAST_MERCHANT_ID"),
  MERCHANT_KEY: required("NEXT_PAYFAST_MERCHANT_KEY"),
  PASSPHRASE: required("NEXT_PAYFAST_PASSPHRASE"),

  // 派生信息
  MODE: /sandbox/.test(PROCESS_URL) ? "sandbox" : "live",

  // 默认回调地址（也可以让前端覆盖传入）
  DEFAULT_RETURN_URL: `${BASE_URL}/payment/success`,
  DEFAULT_CANCEL_URL: `${BASE_URL}/payment/payment-failure`,
  DEFAULT_NOTIFY_URL: `${BASE_URL}/api/payfast/notify`,
} as const;
