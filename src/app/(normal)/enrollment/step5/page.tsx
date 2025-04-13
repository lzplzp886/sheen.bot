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

  const [countryCode, setCountryCode] = useState("+27"); // 示例: South Africa

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    // 验证必填
    if (
      !data.parentFirstName ||
      !data.parentSurname ||
      !data.parentRelationship ||
      !data.parentEmail
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    // 将 phone 拼上 countryCode
    setData((prev) => ({
      ...prev,
      parentContactNumber: countryCode + prev.parentContactNumber.replace(/^0/, ""),
    }));

    router.push("/enrollment/step6");
  };

  const handleBack = () => {
    router.push("/enrollment/step4");
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Section 5: Parent / Guardian Details
      </h1>

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

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Relationship to Child *</label>
        <input
          type="text"
          className="input-style w-full"
          value={data.parentRelationship}
          onChange={(e) => handleChange("parentRelationship", e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Contact Number *</label>
        <div className="flex items-center">
          <CountryCodeSelect value={countryCode} onChange={setCountryCode} />
          <input
            type="tel"
            className="input-style flex-1"
            value={data.parentContactNumber.replace(/^\+\d+/, "")} // 去掉之前拼的区号
            onChange={(e) => handleChange("parentContactNumber", e.target.value)}
            required
          />
        </div>
      </div>

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

      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Preferred Contact Method *
        </label>
        <div>
          {["EMAIL", "PHONE", "WHATSAPP"].map((method) => (
            <label key={method} className="mr-4">
              <input
                type="radio"
                name="contactMethod"
                value={method}
                checked={data.preferredContactMethod === method}
                onChange={(e) =>
                  handleChange("preferredContactMethod", e.target.value)
                }
                required
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Would you like to subscribe to our newsletter? *
        </label>
        <div>
          {["Yes", "No"].map((val) => (
            <label key={val} className="mr-4">
              <input
                type="radio"
                name="subscribeNewsletter"
                value={val}
                checked={data.subscribeNewsletter === val}
                onChange={(e) =>
                  handleChange("subscribeNewsletter", e.target.value)
                }
                required
              />
              {val}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-5">
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
