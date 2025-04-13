// src/app/(normal)/enrollment/step1/step1Client.tsx

"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWizardContext } from "../context";
import Button from "@/components/Button";

/**
 * Client Component: 包含 useSearchParams()、useEffect() 等纯前端逻辑
 */
export default function Step1Client() {
  const { data, setData } = useWizardContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const referral = searchParams.get("referral");
    if (referral) {
      // 如果链接带有 referral，就自动填入并禁用编辑
      setData((prev) => ({
        ...prev,
        referralCode: referral,
      }));
    }
  }, [searchParams, setData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      referralCode: e.target.value,
    }));
  };

  const handleNext = () => {
    router.push("/enrollment/step2");
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Section 1: Referral Code
      </h1>

      <label className="block mb-1 font-semibold">Referral Code</label>
      <input
        type="text"
        value={data.referralCode}
        onChange={handleChange}
        className="input-style w-full mb-3"
        disabled={!!searchParams.get("referral")}
      />
      <p className="text-sm mb-6">
        If you were referred by someone, you can see their code here. Otherwise,
        feel free to edit.
      </p>

      <div className="flex justify-end">
        <Button onClick={handleNext} className="btn">
          Next
        </Button>
      </div>
    </div>
  );
}

