// src/app/api/payfast/_utils/sign.ts

import crypto from "crypto";

/** PayFast 要求的表单编码：
 * - 先 URL encode
 * - 把空格编码成 '+'
 * - 同时把 ~ 编成 %7E（与浏览器 form 行为对齐）
 */
export function pfEncode(v: string): string {
  return encodeURIComponent(v)
    .replace(/%20/g, "+")
    .replace(/~/g, "%7E");
}

/** 构造签名。会：
 *  - 过滤空值与 signature 字段
 *  - 按键名字典序排序
 *  - 对 key 用 encodeURIComponent，对 value 用 pfEncode
 *  - 若有 passphrase，追加 &passphrase=...（同样 pfEncode）
 */
export function buildSignatureBase(
  fields: Record<string, string>,
  passphrase?: string
) {
  const pairs = Object.keys(fields)
    .filter((k) => k && k !== "signature" && fields[k] !== undefined && fields[k] !== null && fields[k] !== "")
    .sort()
    .map((k) => `${encodeURIComponent(k)}=${pfEncode(String(fields[k]))}`);

  let base = pairs.join("&");
  if (passphrase && passphrase.trim().length > 0) {
    base += `&passphrase=${pfEncode(passphrase.trim())}`;
  }
  const signature = crypto.createHash("md5").update(base).digest("hex");
  return { base, signature };
}
