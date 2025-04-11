"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import SignatureCanvas from "react-signature-canvas";
import { useWizardContext } from "../context";
import Button from "@/components/Button";

export default function Step9() {
  const router = useRouter();
  const { data, setData } = useWizardContext();
  const signatureRef = useRef<SignatureCanvas | null>(null);

  const handleClear = () => {
    signatureRef.current?.clear();
  };

  const handleBack = () => {
    router.push("/enrollment/step8");
  };

  const handleSubmit = async () => {
    // 收集签名
    const signatureData = signatureRef.current?.getTrimmedCanvas().toDataURL("image/png") || "";
    setData((prev) => ({ ...prev, signatureData }));

    // 这里提交到后端
    const payload = { ...data, signatureData };
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Form submission failed");
      }
      const result = await res.json();
      alert(result.message || "Enrollment form submitted successfully!");
      // 提交成功，可跳转或清空
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error occurred while submitting the form.");
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Section 9: Parent / Guardian Signature
      </h1>
      <p className="mb-4 text-sm text-center">
        Please provide your signature below to confirm your enrollment.
      </p>

      {/* 在 canvas 外层用一个DIV，带背景图 */}
      <div
        className="border border-gray-300 rounded p-2 mb-3"
        style={{
          backgroundImage: 'url("/images/sign-here.png")', // 这里放你想要的“Sign Here + 钢笔”背景
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          width: "500px",
          height: "180px",
          margin: "0 auto",
        }}
      >
        <SignatureCanvas
          ref={signatureRef}
          penColor="blue"
          canvasProps={{
            // 让 canvas 100% 撑满这个容器
            width: 500,
            height: 180,
            className: "rounded",
          }}
        />
      </div>

      <div className="flex justify-center mb-6">
        <Button onClick={handleClear} className="btn mr-3">
          Clear
        </Button>
      </div>

      <div className="flex justify-between">
        <Button onClick={handleBack} className="btn">
          Back
        </Button>
        <Button onClick={handleSubmit} className="btn">
          Submit
        </Button>
      </div>
    </div>
  );
}
