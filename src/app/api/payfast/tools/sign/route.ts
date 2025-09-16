// src/app/api/payfast/tools/sign/route.ts

import { NextResponse } from "next/server";
import { PAYFAST } from "../../env";
import { buildSignatureBase } from "../../_utils/sign";

export async function POST(req: Request) {
  const fields = (await req.json()) as Record<string, string>;

  // 用统一规则复算（含可选 passphrase）
  const { base, signature: serverSig } = buildSignatureBase(fields, PAYFAST.PASSPHRASE);
  const submittedSig = fields.signature || "";

  return NextResponse.json({
    submittedSig,
    serverSig,
    same: submittedSig === serverSig,
    base,
    baseWithPass_obfuscated: base.replace(/(passphrase=)[^&]+/, "$1***"),
  });
}
