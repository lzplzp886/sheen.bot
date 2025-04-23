// src/app/(normal)/enrollment/step3/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import Button from "@/components/Button";
import Image from "next/image";

// 根据 age 返回班级信息和对应图标
const getClassInfo = (age: number) => {
  if (age >= 6 && age <= 8) {
    return {
      group: "6-8 yrs (Intro Class)",
      image: "/images/enrollment/intro-class.png",
    };
  }
  if (age >= 9 && age <= 11) {
    return {
      group: "9-11 yrs (Junior Class)",
      image: "/images/enrollment/junior-class.png",
    };
  }
  if (age >= 12 && age < 18) {
    return {
      group: "12+ yrs (Explorer Class)",
      image: "/images/enrollment/explorer-class.png",
    };
  }
  return {
    group: "Below 6 or above 15, consult us for class schedule",
    image: "", // 没有对应图标
  };
};

export default function Step3() {
  const router = useRouter();
  const { data } = useWizardContext();

  // 生成表格行
  const rows = data.children.map((child, idx) => {
    const age = child.age ?? 0;
    const { group, image } = getClassInfo(age);
    return (
      <tr key={idx} className="border-b">
        <td className="py-2 px-2 text-sm">
          {child.firstName} {child.surname}
        </td>
        <td className="py-2 px-2 text-sm">{child.age ?? ""}</td>
        <td className="py-2 px-2 text-sm">{group}</td>
        <td className="py-2 px-2 text-sm">
          {image && (
            <Image
              src={image}
              alt={group}
              className="w-16 h-16 rounded-lg border shadow-sm"
            />
          )}
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
        Step 3: Age Group Confirmation
      </h1>
      <p className="mb-6 text-center">
        Please reconfirm your child&rsquo;s age range for course identification.
      </p>

      <table className="w-full mb-4">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-2 text-left">Child</th>
            <th className="py-2 px-2 text-left">Age</th>
            <th className="py-2 px-2 text-left">Age Group</th>
            <th className="py-2 px-2 text-left">Class</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>

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
