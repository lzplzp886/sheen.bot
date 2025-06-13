// src/app/(normal)/academy/enrollment/step7/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import CountryCodeSelect from "@/app/(normal)/registration/reg_CountryCodeSelect";
import Button from "@/components/Button";
import StepContainer from "../stepContainer";

export default function Step7() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  // 本地 state 用于回显
  const [pickup1Code, setPickup1Code] = useState(data.pickup1CountryCode || "27");
  const [pickup1Num, setPickup1Num] = useState(data.pickup1ContactNumber || "");
  const [pickup2Code, setPickup2Code] = useState(data.pickup2CountryCode || "27");
  const [pickup2Num, setPickup2Num] = useState(data.pickup2ContactNumber || "");

  // 复制选项
  const [pickup1Copy, setPickup1Copy] = useState(false);
  const [pickup2Copy, setPickup2Copy] = useState(false);

  const handleChange = (field: keyof typeof data, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 复制父母信息到Pickup1
  const handleTogglePickup1Copy = (checked: boolean) => {
    setPickup1Copy(checked);
    if (checked) {
      setData((prev) => ({
        ...prev,
        pickup1FirstName: prev.parentFirstName,
        pickup1Surname: prev.parentSurname,
        pickup1Relationship: prev.parentRelationship,
        pickup1ContactNumber: prev.parentContactNumber,
      }));
      setPickup1Num(data.parentContactNumber);   // 同步本地输入框
      setPickup1Code(data.parentCountryCode);
    }
  };

  // 复制紧急联系人信息到Pickup2
  const handleTogglePickup2Copy = (checked: boolean) => {
    setPickup2Copy(checked);
    if (checked) {
      setData((prev) => ({
        ...prev,
        pickup2FirstName: prev.emergencyFirstName,
        pickup2Surname: prev.emergencySurname,
        pickup2Relationship: prev.emergencyRelationship,
        pickup2ContactNumber: prev.emergencyContactNumber,
      }));
      setPickup2Num(data.emergencyContactNumber);
      setPickup2Code(data.emergencyCountryCode);
    }
  };

  const handleNext = () => {
    // 校验：至少第一授权联系人必填
    if (
      !data.pickup1FirstName ||
      !data.pickup1Surname ||
      !data.pickup1Relationship
    ) {
      alert("Please provide details for at least the first authorized person.");
      return;
    }
    // 校验数字
    if (!/^\d+$/.test(pickup1Num)) {
      alert("First authorized person's contact number must be digits only.");
      return;
    }
    // 第二个可以为空, 如果有值就校验
    if (data.pickup2FirstName || data.pickup2Surname || data.pickup2Relationship || pickup2Num) {
      if (!/^\d+$/.test(pickup2Num)) {
        alert("Second authorized person's contact number must be digits only.");
        return;
      }
    }

    // 保存到 Context
    setData((prev) => ({
      ...prev,
      pickup1CountryCode: pickup1Code,
      pickup1ContactNumber: pickup1Num,
      pickup2CountryCode: pickup2Code,
      pickup2ContactNumber: pickup2Num,
    }));

    router.push("/enrollment/step8");
  };

  const handleBack = () => {
    router.push("/enrollment/step6");
  };

  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 7: Authorized Persons for Child Pick-up
      </h1>
      <p className="mb-4 text-sm">
        Please provide the names of at least two people authorized to collect your child.
      </p>

      {/* First Person */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">First Person</h3>
          <label className="inline-flex items-center cursor-pointer select-none text-primary">
            <input
              type="checkbox"
              className="mr-1"
              checked={pickup1Copy}
              onChange={(e) => handleTogglePickup1Copy(e.target.checked)}
            />
            <span>Copy from Parent/Guardian Details</span>
          </label>
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">First Name *</label>
          <input
            type="text"
            className="input-style w-full"
            value={data.pickup1FirstName}
            onChange={(e) => handleChange("pickup1FirstName", e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Surname *</label>
          <input
            type="text"
            className="input-style w-full"
            value={data.pickup1Surname}
            onChange={(e) => handleChange("pickup1Surname", e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Relationship to Child *</label>
          <input
            type="text"
            className="input-style w-full"
            value={data.pickup1Relationship}
            onChange={(e) => handleChange("pickup1Relationship", e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Contact Number *</label>
          <div className="mb-2">
            <CountryCodeSelect
              value={"+" + pickup1Code}
              onChange={(val) => setPickup1Code(val.replace("+", ""))}
            />
          </div>
          <input
            type="tel"
            className="input-style w-full"
            placeholder="Enter your phone number"
            value={pickup1Num}
            onChange={(e) => {
              const numericVal = e.target.value.replace(/\D/g, "");
              setPickup1Num(numericVal);
            }}
            required
          />
        </div>
      </div>

      {/* Second Person */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Second Person</h3>
          <label className="inline-flex items-center cursor-pointer select-none text-primary">
            <input
              type="checkbox"
              className="mr-1"
              checked={pickup2Copy}
              onChange={(e) => handleTogglePickup2Copy(e.target.checked)}
            />
            <span>Copy from Emergency Contact Details</span>
          </label>
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">First Name</label>
          <input
            type="text"
            className="input-style w-full"
            value={data.pickup2FirstName}
            onChange={(e) => handleChange("pickup2FirstName", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Surname</label>
          <input
            type="text"
            className="input-style w-full"
            value={data.pickup2Surname}
            onChange={(e) => handleChange("pickup2Surname", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Relationship to Child</label>
          <input
            type="text"
            className="input-style w-full"
            value={data.pickup2Relationship}
            onChange={(e) => handleChange("pickup2Relationship", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Contact Number</label>
          <div className="mb-2">
            <CountryCodeSelect
              value={"+" + pickup2Code}
              onChange={(val) => setPickup2Code(val.replace("+", ""))}
            />
          </div>
          <input
            type="tel"
            className="input-style w-full"
            placeholder="Enter phone number"
            value={pickup2Num}
            onChange={(e) => {
              const numericVal = e.target.value.replace(/\D/g, "");
              setPickup2Num(numericVal);
            }}
          />
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
    </StepContainer>
  );
}
