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

  // 当用户开始签名
  const handleSignatureBegin = () => {
    console.log("[Step9] handleSignatureBegin() -> User started signing");
    setIsSignatureEmpty(false);
  };

  // 当签名结束后，检测是否为空
  const handleSignatureEnd = () => {
    if (signatureRef.current) {
      const empty = signatureRef.current.isEmpty();
      console.log("[Step9] handleSignatureEnd() -> isSignatureEmpty:", empty);
      setIsSignatureEmpty(empty);
    }
  };

  // 清除签名
  const handleClear = () => {
    console.log("[Step9] handleClear() -> Clearing signature");
    signatureRef.current?.clear();
    setIsSignatureEmpty(true);
  };

  // 点击Back
  const handleBack = () => {
    console.log("[Step9] handleBack() -> Going back to step8");
    router.push("/enrollment/step8");
  };

  // 点击Submit
  const handleSubmit = async () => {
    console.log("[Step9] handleSubmit() -> Submit button clicked");

    // 0. 调试：打印当前 wizardContext.data
    console.log("[Step9] Current context data:", data);

    // 1. 强制检查签名是否为空
    if (signatureRef.current?.isEmpty()) {
      console.warn("[Step9] handleSubmit() -> Signature is empty, prompt user");
      alert("Please provide your signature before submitting.");
      return;
    }

    // 2. 获取签名 DataURL
    const signatureData =
      signatureRef.current?.getTrimmedCanvas().toDataURL("image/png") || "";
    console.log("[Step9] signatureData length:", signatureData?.length);

    // 3. 回写到全局 Context（如果 step10 需要展示签名）
    console.log("[Step9] Writing signatureData back to context...");
    setData((prev) => ({ ...prev, signatureData }));

    // 4. 电话号码最终正则化（只保留数字 + 去掉开头零 + 拼接 +号区号）
    const finalParentNumber = "+" + data.parentCountryCode + data.parentContactNumber.replace(/^0+/, "");
    const finalEmergencyNumber = "+" + data.emergencyCountryCode + data.emergencyContactNumber.replace(/^0+/, "");
    const finalPickup1Number = "+" + data.pickup1CountryCode + data.pickup1ContactNumber.replace(/^0+/, "");
    const finalPickup2Number = "+" + data.pickup2CountryCode + data.pickup2ContactNumber.replace(/^0+/, "");

    console.log("[Step9] finalParentNumber:", finalParentNumber);
    console.log("[Step9] finalEmergencyNumber:", finalEmergencyNumber);
    console.log("[Step9] finalPickup1Number:", finalPickup1Number);
    console.log("[Step9] finalPickup2Number:", finalPickup2Number);

    // 5. 构造最终 payload
    const payload = {
      ...data,
      signatureData,
      parentContactNumber: finalParentNumber,
      emergencyContactNumber: finalEmergencyNumber,
      pickup1ContactNumber: finalPickup1Number,
      pickup2ContactNumber: finalPickup2Number,
    };

    console.log("[Step9] Final payload to /api/enroll:", payload);

    try {
      console.log("[Step9] Sending fetch POST request to /api/enroll...");
      setIsLoading(true);
      setProgress(`Sending enrollment form to '${data.parentEmail}'...`);

      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("[Step9] fetch /api/enroll -> response.status:", res.status);
      console.log("[Step9] fetch /api/enroll -> response.ok:", res.ok);

      if (!res.ok) {
        console.error("[Step9] fetch /api/enroll -> not ok, throwing Error");
        throw new Error("Form submission failed");
      }

      // 后端返回的 JSON 结果
      const result = await res.json();
      console.log("[Step9] fetch /api/enroll -> response JSON:", result);

      setProgress("Sent");
      alert(result.message || "Enrollment form submitted successfully!");

      // 6. 跳转下一步
      console.log("[Step9] handleSubmit() -> Going to step10");
      router.push("/enrollment/step10");
    } catch (err) {
      console.error("[Step9] handleSubmit() -> Caught Error:", err);
      alert("Error occurred while submitting the form.");
    } finally {
      console.log("[Step9] handleSubmit() -> finally block, setIsLoading(false)");
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
      {isLoading && <p className="mb-4 text-center text-success">{progress}</p>}

      {/* 签名区域容器 */}
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
