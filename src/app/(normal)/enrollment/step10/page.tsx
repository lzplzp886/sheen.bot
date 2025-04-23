// src/app/(normal)/enrollment/step10/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import Button from "@/components/Button";

export default function Step10() {
  const router = useRouter();
  const { data } = useWizardContext();

  // 合并所有孩子姓名，如果未填写则用默认值
  const enrolledChildren = data.children
    .map((child, index) =>
      child.firstName && child.surname
        ? `${child.firstName} ${child.surname}`
        : `Child ${index + 1}`
    )
    .join(", ");

  // 点击按钮后可跳转到 Dashboard 或其他页面
  const handleNext = () => {
    router.push("/dashboard");
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Enrollment Successful!</h1>
      <p className="mb-6">
        You have successfully enrolled {enrolledChildren} with Sheen Academy!<br />
        Our team will contact you for class schedule.
      </p>
      <Button onClick={handleNext} className="btn">
        Go to Dashboard
      </Button>
    </div>
  );
}
