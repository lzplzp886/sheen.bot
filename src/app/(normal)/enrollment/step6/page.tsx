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
  // 新增一个 state 用于存储 emergency contact 的国家码，默认以 "+27" 为例
  const [emergencyCountryCode, setEmergencyCountryCode] = useState("+27");

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    // 检查必填项
    if (
      !data.emergencyFirstName ||
      !data.emergencySurname ||
      !data.emergencyRelationship ||
      !data.emergencyContactNumber
    ) {
      alert("Please fill emergency contact info.");
      return;
    }
    // 在提交前，组合国家码和号码（移除号码开头的 "0"）
    setData((prev) => ({
      ...prev,
      emergencyContactNumber:
        emergencyCountryCode + prev.emergencyContactNumber.replace(/^0/, ""),
    }));

    router.push("/enrollment/step7");
  };

  const handleBack = () => {
    router.push("/enrollment/step5");
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 6: Emergency Contact
      </h1>
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

      {/* Emergency Relationship：单选 */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Relationship to Child *
        </label>
        <div>
          {["Mother", "Father", "Grandparent", "Others"].map((option) => (
            <label key={option} className="mr-4 inline-flex items-center">
              <input
                type="radio"
                name="emergencyRelationship"
                value={option}
                checked={data.emergencyRelationship === option}
                onChange={(e) =>
                  handleChange("emergencyRelationship", e.target.value)
                }
                required
              />
              <span className="ml-1">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Emergency Contact Number：分两行显示 */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Contact Number *</label>
        {/* 第一行：国家码选择 */}
        <div className="mb-2">
          <CountryCodeSelect
            value={emergencyCountryCode}
            onChange={setEmergencyCountryCode}
          />
        </div>
        {/* 第二行：电话号码输入 */}
        <input
          type="tel"
          className="input-style w-full"
          placeholder="Enter your phone number"
          // 去掉已存在的国家码（假设 data.emergencyContactNumber 只存号码部分）
          value={data.emergencyContactNumber.replace(/^\+\d+/, "")}
          onChange={(e) =>
            handleChange("emergencyContactNumber", e.target.value)
          }
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
