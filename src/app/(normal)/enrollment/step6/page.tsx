// src/app/(normal)/enrollment/step6/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import Button from "@/components/Button";

export default function Step6() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    // 必填校验
    if (
      !data.emergencyFirstName ||
      !data.emergencySurname ||
      !data.emergencyRelationship ||
      !data.emergencyContactNumber
    ) {
      alert("Please fill emergency contact info.");
      return;
    }
    router.push("/enrollment/step7");
  };

  const handleBack = () => {
    router.push("/enrollment/step5");
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Section 6: Emergency Contact
      </h1>
      <p className="mb-4 text-sm">
        Please provide details of someone we can contact in case of an emergency
        if the parent/guardian is unavailable.
      </p>

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

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Relationship to Child *</label>
        <input
          type="text"
          className="input-style w-full"
          value={data.emergencyRelationship}
          onChange={(e) =>
            handleChange("emergencyRelationship", e.target.value)
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Contact Number *</label>
        <input
          type="tel"
          className="input-style w-full"
          value={data.emergencyContactNumber}
          onChange={(e) =>
            handleChange("emergencyContactNumber", e.target.value)
          }
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
