// src/app/(normal)/enrollment/step10/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import Button from "@/components/Button";
import StepContainer from "../stepContainer";

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
    router.push("/academy");
  };

  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">Enrollment Successful!</h1>
      <p className="mb-6 text-center">
        You have successfully enrolled {enrolledChildren} with Sheen Academy!<br />
        Our team will contact you for class schedule.
      </p>
      <div className="flex justify-center items-center">
        <Button onClick={handleNext} className="btn">
          Go to Homepage
        </Button>
      </div>
    </StepContainer>
  );
}
