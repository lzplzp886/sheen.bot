// src/app/(normal)/enrollment/step6/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import CountryCodeSelect from "@/app/(normal)/registration/reg_CountryCodeSelect";
import Button from "@/components/Button";

export default function Step6() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  // 初始区号 & 电话
  const [emergencyCode, setEmergencyCode] = useState(data.emergencyCountryCode || "27");
  const [emergencyNumber, setEmergencyNumber] = useState(data.emergencyContactNumber || "");

  const handleChange = (field: keyof typeof data, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    // 检查必填项
    if (!data.emergencyFirstName || !data.emergencySurname || !data.emergencyRelationship) {
      alert("Please fill in all required emergency contact fields.");
      return;
    }

    // 数字校验
    if (!/^\d+$/.test(emergencyNumber)) {
      alert("Emergency contact number must contain digits only.");
      return;
    }

    // 将最新输入保存到 Context
    setData((prev) => ({
      ...prev,
      emergencyCountryCode: emergencyCode,
      emergencyContactNumber: emergencyNumber,
    }));

    router.push("/enrollment/step7");
  };

  const handleBack = () => {
    router.push("/enrollment/step5");
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Step 6: Emergency Contact</h1>
      <p className="mb-4 text-sm text-center">
        Please provide details of someone we can contact in case of an emergency
        if the parent/guardian is unavailable.
      </p>

      {/* Emergency Contact First Name */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">First Name *</label>
        <input
          type="text"
          className="input-style w-full"
          value={data.emergencyFirstName}
          onChange={(e) => handleChange("emergencyFirstName", e.target.value)}
          required
        />
      </div>

      {/* Emergency Contact Surname */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Surname *</label>
        <input
          type="text"
          className="input-style w-full"
          value={data.emergencySurname}
          onChange={(e) => handleChange("emergencySurname", e.target.value)}
          required
        />
      </div>

      {/* Emergency Relationship：单选/或输入框，根据需求 */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Relationship to Child *</label>
        <div>
          {["Mother", "Father", "Grandparent", "Others"].map((option) => (
            <label key={option} className="mr-4 inline-flex items-center">
              <input
                type="radio"
                name="emergencyRelationship"
                value={option}
                checked={data.emergencyRelationship === option}
                onChange={(e) => handleChange("emergencyRelationship", e.target.value)}
                required
              />
              <span className="ml-1">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Emergency Contact Number */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Contact Number *</label>
        <div className="mb-2">
          <CountryCodeSelect
            value={"+" + emergencyCode}
            onChange={(val) => {
              setEmergencyCode(val.replace("+", ""));
            }}
          />
        </div>
        <input
          type="tel"
          className="input-style w-full"
          placeholder="Enter phone number"
          value={emergencyNumber}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, "");
            setEmergencyNumber(numericValue);
          }}
          required
        />
      </div>

      <div className="flex justify-between gap-4">
        <Button onClick={handleBack} className="btn">
          Back
        </Button>
        <Button onClick={handleNext} className="btn">
          Next
        </Button>
      </div>
    </div>
  );
}
