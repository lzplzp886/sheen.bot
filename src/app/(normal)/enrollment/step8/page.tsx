// src/app/(normal)/enrollment/step8/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import Button from "@/components/Button";

export default function Step8() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  const handleChange = (field: "consentConfirmed" | "popiaConfirmed", value: boolean) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBack = () => {
    router.push("/enrollment/step7");
  };

  const handleNext = () => {
    // 只有当 popiaConfirmed=true 时才允许进入 step9
    if (!data.popiaConfirmed) {
      alert("Please consent to POPIA to proceed.");
      return;
    }
    router.push("/enrollment/step9");
  };

  return (
    <div className="p-5 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Section 8: Consent & Agreement
      </h1>

      {/* 8.1 */}
      <div className="mb-6">
        <p className="mb-2">
          I, the undersigned, confirm that all the information provided is
          accurate. I consent to my child participating in the coding and
          robotics course. I understand that the academy will take all
          reasonable precautions to ensure the safety of my child. In case of a
          medical emergency, I authorize the academy to seek medical assistance
          for my child if I am not immediately available.
        </p>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={data.consentConfirmed}
            onChange={(e) => handleChange("consentConfirmed", e.target.checked)}
          />
          <span className="ml-2">Confirm</span>
        </label>
      </div>

      {/* 8.2 只有当 consentConfirmed 时显示 */}
      {data.consentConfirmed && (
        <div className="mb-6">
          <h2 className="font-bold mb-2">PROTECTION OF PERSONAL INFORMATION ACT (POPIA) COMPLIANCE</h2>
          <p className="mb-2 text-sm">
            By completing this form, you acknowledge that you understand and
            agree to the collection and processing of personal information in
            accordance with the Protection of Personal Information Act (POPIA)
            of South Africa. Your personal data will be used solely for
            registration, communication, and safety purposes. We will not share
            your information with third parties without your consent.
          </p>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={data.popiaConfirmed}
              onChange={(e) => handleChange("popiaConfirmed", e.target.checked)}
            />
            <span className="ml-2">
              I consent to my personal information being collected and used as
              per the terms stated above.
            </span>
          </label>
        </div>
      )}

      <div className="flex justify-between">
        <Button onClick={handleBack} className="btn">
          Back
        </Button>
        {/* 当 consentConfirmed=false 时，也可以不显示Next */}
        {data.consentConfirmed && (
          <Button onClick={handleNext} className="btn">
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
