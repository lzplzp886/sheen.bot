// src/app/(normal)/enrollment/step5/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import CountryCodeSelect from "@/app/(normal)/registration/reg_CountryCodeSelect";
import Button from "@/components/Button";

export default function Step5() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  // 从全局 context 取初始值
  const [countryCode, setCountryCode] = useState(data.parentCountryCode || "27");
  const [parentNumber, setParentNumber] = useState(data.parentContactNumber || "");

  // 其他字段直接从 data 读写
  const handleChange = (field: keyof typeof data, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 点击下一步：做必填校验 & 只允许数字
  const handleNext = () => {
    if (!data.parentFirstName || !data.parentSurname || !data.parentRelationship || !data.parentEmail) {
      alert("Please fill in all required fields (first name, surname, relationship, email).");
      return;
    }

    // 简单数值校验
    if (!/^\d+$/.test(parentNumber)) {
      alert("Please enter digits only for phone number.");
      return;
    }

    // 将选择的区号和用户输入的原始数字分别保存
    setData((prev) => ({
      ...prev,
      parentCountryCode: countryCode,
      parentContactNumber: parentNumber,
    }));

    router.push("/enrollment/step6");
  };

  const handleBack = () => {
    router.push("/enrollment/step4");
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Step 5: Parent / Guardian Details</h1>

      {/* First Name */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">First Name *</label>
        <input
          type="text"
          className="input-style w-full"
          value={data.parentFirstName}
          onChange={(e) => handleChange("parentFirstName", e.target.value)}
          required
        />
      </div>

      {/* Surname */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Surname *</label>
        <input
          type="text"
          className="input-style w-full"
          value={data.parentSurname}
          onChange={(e) => handleChange("parentSurname", e.target.value)}
          required
        />
      </div>

      {/* Relationship to Child：单选 */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Relationship to Child *</label>
        <div>
          {["Mother", "Father", "Grandparent", "Others"].map((option) => (
            <label key={option} className="mr-4 inline-flex items-center">
              <input
                type="radio"
                name="parentRelationship"
                value={option}
                checked={data.parentRelationship === option}
                onChange={(e) => handleChange("parentRelationship", e.target.value)}
                required
              />
              <span className="ml-1">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Contact Number: 分两行（区号 + 纯数字） */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Contact Number *</label>
        <div className="mb-2">
          <CountryCodeSelect
            value={"+" + countryCode}
            onChange={(val) => {
              // val 形如 "+27"
              setCountryCode(val.replace("+", "")); 
            }}
          />
        </div>
        <input
          type="tel"
          className="input-style w-full"
          placeholder="Enter your phone number"
          value={parentNumber}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, "");
            setParentNumber(numericValue);
          }}
          required
        />
      </div>

      {/* Email Address */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Email Address *</label>
        <input
          type="email"
          className="input-style w-full"
          value={data.parentEmail}
          onChange={(e) => handleChange("parentEmail", e.target.value)}
          required
        />
      </div>

      {/* Preferred Contact Method */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Preferred contact method for general information *
        </label>
        <div>
          {["Email", "Phone", "WhatsApp"].map((method) => (
            <label key={method} className="mr-4 inline-flex items-center">
              <input
                type="radio"
                name="preferredContactMethod"
                value={method}
                checked={data.preferredContactMethod === method}
                onChange={(e) => handleChange("preferredContactMethod", e.target.value)}
                required
              />
              <span className="ml-1">{method}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Subscribe Newsletter */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Would you like to subscribe to our newsletter? *
        </label>
        <div>
          {["Yes", "No"].map((val) => (
            <label key={val} className="mr-4 inline-flex items-center">
              <input
                type="radio"
                name="subscribeNewsletter"
                value={val}
                checked={data.subscribeNewsletter === val}
                onChange={(e) => handleChange("subscribeNewsletter", e.target.value)}
                required
              />
              <span className="ml-1">{val}</span>
            </label>
          ))}
        </div>
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
