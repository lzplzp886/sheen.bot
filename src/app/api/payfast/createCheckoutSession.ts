// src/app/api/payfast/createCheckoutSession.ts

import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import querystring from "querystring";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // 移除了未使用的 productId，只保留 quantity
  const { quantity } = req.body;

  // 根据实际产品信息设置价格（示例中每个产品定价为 100）
  const productPrice = 100.00;
  const totalAmount = (productPrice * quantity).toFixed(2);

  // Payfast 配置（建议通过环境变量进行配置）
  const merchantId = process.env.PAYFAST_MERCHANT_ID || "";
  const merchantKey = process.env.PAYFAST_MERCHANT_KEY || "";
  const returnUrl = process.env.PAYFAST_RETURN_URL || "";
  const cancelUrl = process.env.PAYFAST_CANCEL_URL || "";
  const notifyUrl = process.env.PAYFAST_NOTIFY_URL || "";

  // 生成唯一订单 ID
  const m_payment_id = `order-${Date.now()}`;

  // 设置支付参数，并指定类型为 Record<string, string | number>
  const params: Record<string, string | number> = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    m_payment_id,
    amount: totalAmount,
    item_name: "sheenbot∞",
    item_description: "sheenbot∞ AI Board Order",
    // 以下参数可根据实际业务设置，示例中使用占位信息
    email_address: "customer@example.com",
    name_first: "FirstName",
    name_last: "LastName",
    email_confirmation: 1,
    confirmation_address: "customer@example.com",
  };

  // 构造签名
  // 1. 按字母顺序排序参数
  const keys = Object.keys(params).sort();
  let dataString = "";
  keys.forEach((key) => {
    const value = params[key];
    if (value !== null && value !== undefined && value !== "") {
      dataString += key + "=" + value + "&";
    }
  });
  dataString = dataString.slice(0, -1); // 去除最后的 '&'

  // 2. 使用 MD5 生成签名
  const signature = crypto.createHash("md5").update(dataString).digest("hex");

  // 将签名添加到参数中
  params.signature = signature;

  // 构建跳转 URL
  const baseUrl =
    process.env.PAYFAST_BASE_URL ||
    "https://sandbox.payfast.co.za/eng/process"; // 根据环境使用沙箱或正式环境
  const queryString = querystring.stringify(params);
  const redirectUrl = `${baseUrl}?${queryString}`;

  res.status(200).json({ url: redirectUrl });
}
