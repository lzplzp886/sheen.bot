// src/app/api/payfast/notify/debug/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, type GetCommandOutput } from "@aws-sdk/lib-dynamodb";

const ddb = new DynamoDBClient({});
const PAY_TABLE = process.env.DDB_PAYMENTS_TABLE!;

function isObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object";
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const paymentId = url.searchParams.get("paymentId");

  if (!paymentId) {
    return NextResponse.json({ error: "paymentId required" }, { status: 400 });
  }

  const out: GetCommandOutput = await ddb.send(
    new GetCommand({
      TableName: PAY_TABLE,
      Key: { paymentId },
    })
  );

  const item: unknown = out.Item ?? null;
  const debug = isObject(item) && "notifyDebug" in item ? (item as Record<string, unknown>)["notifyDebug"] : null;

  return NextResponse.json(
    { paymentId, notifyDebug: debug ?? null },
    { headers: { "Cache-Control": "no-store" } }
  );
}
