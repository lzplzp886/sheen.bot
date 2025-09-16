// src/app/api/payfast/stash/route.ts
// 用于把体量较大的 meta 等数据先“临时入库”，避免通过 query 传巨量 JSON 导致 431

import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

interface StashPayload {
  value: unknown;
  ttlSeconds?: number; // 可选：设置一个失效时间（由你后台消费时自行判断）
}

interface StashRecord {
  stashId: string;
  value: unknown;
  ttlSeconds?: number;
  createdAt: number;
}

const ddb = new DynamoDBClient({});
const STASH_TABLE = process.env.DDB_PAYFAST_STASH_TABLE || "sheen.bot-payfast-stash";

export async function POST(req: Request) {
  try {
    const { value, ttlSeconds }: StashPayload = await req.json();
    const stashId = uuid();

    const record: StashRecord = {
      stashId,
      value,
      ttlSeconds,
      createdAt: Date.now(),
    };

    const input: PutCommandInput = {
      TableName: STASH_TABLE,
      Item: record as unknown as Record<string, unknown>,
    };

    await ddb.send(new PutCommand(input));
    return NextResponse.json({ stashId });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    console.error("[payfast/stash] error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
