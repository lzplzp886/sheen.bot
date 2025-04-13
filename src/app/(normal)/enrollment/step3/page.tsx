// src/app/(normal)/enrollment/step3/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import Button from "@/components/Button";
import Image from "next/image";

export default function Step3() {
  const router = useRouter();
  const { data } = useWizardContext();

  // 根据 age 判断自动分组
  const getAgeGroup = (age: number) => {
    if (age >= 6 && age <= 8) return "6-8 yrs (Intro Class)";
    if (age >= 9 && age <= 11) return "9-11 yrs (Junior Class)";
    if (age >= 12) return "12+ yrs (Explorer Class)";
    return "Below 6? or Invalid Age?";
  };

  // 生成简易表格
  // 这里假设children都已填好年龄
  const rows = data.children.map((child, idx) => {
    const group = child.age ? getAgeGroup(child.age) : "N/A";
    // 也可存储在 data.confirmedAgeGroups 里，暂时只读
    return (
      <tr key={idx} className="border-b">
        <td className="py-2 px-2 text-sm">
          {child.firstName} {child.surname}
        </td>
        <td className="py-2 px-2 text-sm">{child.age ?? ""}</td>
        <td className="py-2 px-2 text-sm">{group}</td>
        <td className="py-2 px-2 text-sm">
          {/* 可以放置一张相关课程图片 */}
          <Image
            src="/images/default-class.jpg"
            alt="class info"
            className="h-12 w-auto"
          />
        </td>
      </tr>
    );
  });

  const handleBack = () => {
    router.push("/enrollment/step2");
  };
  const handleNext = () => {
    router.push("/enrollment/step4");
  };

  return (
    <div className="p-5 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 3: Age Confirmation
      </h1>
      <p className="mb-6 text-center">
        Please reconfirm your child&rsquo;s age range for course identification
      </p>

      <table className="w-full mb-4">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-2 text-left">Child</th>
            <th className="py-2 px-2 text-left">Age</th>
            <th className="py-2 px-2 text-left">Confirmed Age Group</th>
            <th className="py-2 px-2 text-left">Class Level / Image</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>

      <div className="flex justify-between">
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
