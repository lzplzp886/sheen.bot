// src/app/(normal)/enrollment/step9/page.tsx

"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SignatureCanvas from "react-signature-canvas";
import { useWizardContext } from "../context";
import Button from "@/components/Button";
import Image from "next/image";

export default function Step9() {
  const router = useRouter();
  const { data, setData } = useWizardContext();
  const signatureRef = useRef<SignatureCanvas | null>(null);
  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState("");

  // 当用户开始签字时立即隐藏背景
  const handleSignatureBegin = () => {
    setIsSignatureEmpty(false);
  };

  // 当签名结束后，检测是否为空（用于后续判断，如果需要可以保留）
  const handleSignatureEnd = () => {
    if (signatureRef.current) {
      const empty = signatureRef.current.isEmpty();
      setIsSignatureEmpty(empty);
    }
  };

  // 清除签名，并重新显示背景
  const handleClear = () => {
    signatureRef.current?.clear();
    setIsSignatureEmpty(true);
  };

  const handleBack = () => {
    router.push("/enrollment/step8");
  };

  const handleSubmit = async () => {
    console.log("[Step10] Submit button clicked!");
    console.log("signatureRef.current =", signatureRef.current);
    const signatureData =
      signatureRef.current?.getTrimmedCanvas().toDataURL("image/png") || "";
    setData((prev) => ({ ...prev, signatureData }));
    const payload = { ...data, signatureData };
    try {
      setIsLoading(true);
      setProgress(`Sending enrollment form to '${data.parentEmail}'...`);
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Form submission failed");
      }
      const result = await res.json();
      setProgress("Sent");
      alert(result.message || "Enrollment form submitted successfully!");
      router.push("/enrollment/step10");
    } catch (err) {
      console.error(err);
      alert("Error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-background rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 9: Parent / Guardian Signature
      </h1>
      <p className="mb-4 text-sm text-center">
        Please provide your signature below to confirm your enrollment.
      </p>

      {/* 显示加载提示 */}
      {isLoading && (
        <p className="mb-4 text-center text-success">{progress}</p>
      )}

      {/* 签名区域容器：hover 时边框显示 primary 颜色，且背景图片仅在 isSignatureEmpty 为 true 时显示 */}
      <div
        className="border border-darklight hover:border-primary rounded mb-3 transition"
        style={{
          backgroundImage: isSignatureEmpty
            ? 'url("/images/enrollment/sign-here.png")'
            : "none",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "50% 37%",
          width: "400px",
          height: "180px",
          margin: "0 auto",
        }}
      >
        <SignatureCanvas
          ref={signatureRef}
          penColor="#4790FC"
          onBegin={handleSignatureBegin}
          onEnd={handleSignatureEnd}
          canvasProps={{
            width: 400,
            height: 180,
            className: "rounded",
          }}
        />
      </div>

      {/* 橡皮擦图标及 Clear 文字，靠右对齐 */}
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={handleClear}
          className="flex items-center text-darklight hover:text-light focus:outline-none"
        >
          <Image
            src="/images/enrollment/eraser.svg"
            alt="Clear signature"
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
          />
          <span>Clear</span>
        </button>
      </div>

      <div className="flex justify-between gap-4">
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
