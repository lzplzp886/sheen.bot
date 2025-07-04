// src/app/(normal)/academy/enrollment/step8/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import Button from "@/components/Button";
import StepContainer from "../stepContainer";

export default function Step8() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  const handleChange = (
    field: "consentConfirmed" | "popiaConfirmed",
    value: boolean
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBack = () => {
    router.push("/enrollment/step7");
  };

  const handleNext = () => {
    // 只有 popiaConfirmed=true 时，才能进入 step9
    if (!data.popiaConfirmed) {
      alert("Please consent to POPIA to proceed.");
      return;
    }
    router.push("/enrollment/step9");
  };

  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 8: Consent & Agreement
      </h1>

      {/* 8.1：consentConfirmed */}
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
            onChange={(e) =>
              handleChange("consentConfirmed", e.target.checked)
            }
          />
          <span className="ml-2">I agree to all mentioned above</span>
        </label>
      </div>

      {/* 8.2：只有当 consentConfirmed 为 true 时才显示下方 POPIA */}
      {data.consentConfirmed && (
        <div className="mb-6">
          <h2 className="font-bold mb-2">
            PROTECTION OF PERSONAL INFORMATION ACT (POPIA) COMPLIANCE
          </h2>
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
              onChange={(e) =>
                handleChange("popiaConfirmed", e.target.checked)
              }
            />
            <span className="ml-2">
              I consent to my personal information being collected and used as
              per the terms stated above.
            </span>
          </label>
        </div>
      )}

      <div className="flex justify-between gap-4">
        <Button onClick={handleBack} className="btn">
          Back
        </Button>
        {/* 只有当 consentConfirmed && popiaConfirmed 都为true 时，才显示 Next。 */}
        {data.consentConfirmed && data.popiaConfirmed && (
          <Button onClick={handleNext} className="btn">
            Next
          </Button>
        )}
      </div>
    </StepContainer>
  );
}
