"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import Button from "@/components/Button";

export default function Step7() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    // 至少第一人必填
    if (
      !data.pickup1FirstName ||
      !data.pickup1Surname ||
      !data.pickup1ContactNumber ||
      !data.pickup1Relationship
    ) {
      alert("Please provide details for at least the first authorized person.");
      return;
    }
    router.push("/enrollment/step8");
  };

  const handleBack = () => {
    router.push("/enrollment/step6");
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Section 7: Authorized Persons for Child Pick-up
      </h1>
      <p className="mb-4 text-sm">
        Please provide the names of at least two people authorized to collect
        your child.
      </p>

      {/* First Person */}
      <h3 className="font-bold mb-2">First Person</h3>
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
        <label className="block mb-1 font-semibold">Contact Number *</label>
        <input
          type="tel"
          className="input-style w-full"
          value={data.pickup1ContactNumber}
          onChange={(e) =>
            handleChange("pickup1ContactNumber", e.target.value)
          }
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-semibold">Relationship to Child *</label>
        <input
          type="text"
          className="input-style w-full"
          value={data.pickup1Relationship}
          onChange={(e) => handleChange("pickup1Relationship", e.target.value)}
          required
        />
      </div>

      {/* Second Person */}
      <h3 className="font-bold mb-2">Second Person</h3>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">First Name *</label>
        <input
          type="text"
          className="input-style w-full"
          value={data.pickup2FirstName}
          onChange={(e) => handleChange("pickup2FirstName", e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Surname *</label>
        <input
          type="text"
          className="input-style w-full"
          value={data.pickup2Surname}
          onChange={(e) => handleChange("pickup2Surname", e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Contact Number *</label>
        <input
          type="tel"
          className="input-style w-full"
          value={data.pickup2ContactNumber}
          onChange={(e) =>
            handleChange("pickup2ContactNumber", e.target.value)
          }
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-semibold">Relationship to Child *</label>
        <input
          type="text"
          className="input-style w-full"
          value={data.pickup2Relationship}
          onChange={(e) => handleChange("pickup2Relationship", e.target.value)}
          required
        />
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
