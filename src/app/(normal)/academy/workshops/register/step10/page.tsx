// src/app/(normal)/academy/workshops/register/step10/page.tsx
// Keep the page server-rendered and prevent static HTML caching
export const dynamic = "force-dynamic";

import React from "react";
import StepContainer from "../stepContainer";
import Button from "@/components/Button";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, GetCommandOutput } from "@aws-sdk/lib-dynamodb";

const ddb = new DynamoDBClient({});
const PAY_TABLE = process.env.DDB_PAYMENTS_TABLE!;
const STASH_TABLE = process.env.DDB_PAYFAST_STASH_TABLE!;

/** Type guards (no `any`) */
function isObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object";
}

/** Extract `payment.meta.stashId` safely */
function extractStashId(out: GetCommandOutput): string | null {
  const item: unknown = out.Item ?? null;
  if (!isObject(item)) return null;

  const meta = item["meta"];
  if (!isObject(meta)) return null;

  const stashId = meta["stashId"];
  return typeof stashId === "string" && stashId.length > 0 ? stashId : null;
}

/** Extract children names from stash.value.children safely */
function extractChildrenNames(out: GetCommandOutput): string[] {
  const item: unknown = out.Item ?? null;
  if (!isObject(item)) return [];

  const value = item["value"];
  if (!isObject(value)) return [];

  const childrenUnknown = value["children"];
  if (!Array.isArray(childrenUnknown)) return [];

  const names: string[] = [];
  for (let i = 0; i < childrenUnknown.length; i++) {
    const child: unknown = childrenUnknown[i];
    if (!isObject(child)) {
      names.push(`Child ${i + 1}`);
      continue;
    }
    const first = typeof child["firstName"] === "string" ? child["firstName"].trim() : "";
    const last = typeof child["surname"] === "string" ? child["surname"].trim() : "";
    const full = `${first} ${last}`.trim();
    names.push(full || `Child ${i + 1}`);
  }
  return names;
}

/** Helper: pick `paymentId` from search params (supports string | string[]) */
function pickPaymentId(
  sp: Record<string, string | string[] | undefined> | undefined
): string | undefined {
  if (!sp) return undefined;
  const v = sp["paymentId"] ?? sp["pid"];
  if (typeof v === "string") return v;
  if (Array.isArray(v) && v.length > 0 && typeof v[0] === "string") return v[0];
  return undefined;
}

/** Server-side loader: paymentId -> payments.meta.stashId -> stash.value.children */
async function loadChildNames(paymentId?: string): Promise<string | null> {
  try {
    if (!paymentId || !PAY_TABLE || !STASH_TABLE) return null;

    // 1) payment -> meta.stashId
    const payRes = await ddb.send(
      new GetCommand({
        TableName: PAY_TABLE,
        Key: { paymentId },
      })
    );

    const stashId = extractStashId(payRes);
    if (!stashId) return null;

    // 2) stash -> value.children
    const stashRes = await ddb.send(
      new GetCommand({
        TableName: STASH_TABLE,
        Key: { stashId },
      })
    );

    const names = extractChildrenNames(stashRes);
    return names.length ? names.join(", ") : null;
  } catch (err) {
    console.error("[step10] loadChildNames error:", err);
    return null;
  }
}

/**
 * NOTE: In your codebase, `PageProps` expects `searchParams` to be a Promise.
 * So we accept `searchParams` as a Promise and `await` it.
 */
export default async function Step10Page(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await props.searchParams) ?? {};
  const paymentId = pickPaymentId(sp);

  // SSR: compute enrolledChildren on the server
  const enrolledChildren = await loadChildNames(paymentId);

  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Workshop Registration Successful!
      </h1>

      <p className="mb-6 text-center">
        You have successfully registered {enrolledChildren || "Child 1"} with Sheen Academy!
        <br />
        Our team will contact you for workshop schedule.
      </p>

      {/* Keep original look & feel; use a simple GET form for navigation */}
      <div className="flex justify-center items-center">
        <form action="/academy" method="get">
          <Button type="submit" className="btn">
            Go to Homepage
          </Button>
        </form>
      </div>
    </StepContainer>
  );
}
