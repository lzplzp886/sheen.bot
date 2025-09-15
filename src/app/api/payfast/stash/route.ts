import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

const ddb = new DynamoDBClient({});
// 建议启用 TTL（expiresAt）：
const STASH_TABLE = process.env.DDB_PAYFAST_STASH_TABLE || "sheen.bot-payfast-stash";

interface StashPostBody {
  payload: unknown;
  ttlSeconds?: number;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as StashPostBody;
    const stashId = uuid();
    const ttlSeconds = Number.isFinite(body.ttlSeconds) ? Number(body.ttlSeconds) : 60 * 60 * 24;
    const expiresAt = Math.floor(Date.now() / 1000) + ttlSeconds;

    await ddb.send(
      new PutCommand({
        TableName: STASH_TABLE,
        Item: {
          stashId,
          payload: body.payload ?? null,
          createdAt: Date.now(),
          expiresAt,
        },
      })
    );

    return NextResponse.json({ stashId });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
