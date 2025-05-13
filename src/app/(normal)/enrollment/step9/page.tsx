// src/app/(normal)/enrollment/step9/page.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SignatureCanvas from "react-signature-canvas";
import { useWizardContext } from "../context";
import Button from "@/components/Button";
import Image from "next/image";
import StepContainer from "../stepContainer";
import Modal from "../components/modal";

export default function Step9() {
  const router = useRouter();
  const { data, setData } = useWizardContext();
  const signatureRef = useRef<SignatureCanvas | null>(null);

  /* ───────── responsive width ───────── */
  const [sigWidth, setSigWidth] = useState(400);
  useEffect(() => {
    const handleResize = () =>
      setSigWidth(Math.min(400, document.documentElement.clientWidth - 32)); // 32=左右安全间距
    handleResize();               // 首次执行
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);
  const [isLoading,        setIsLoading]        = useState(false);
  const [progress,         setProgress]         = useState("");

  const [errors,    setErrors]    = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  /* ───────── handlers ───────── */
  const handleSignatureBegin = () => setIsSignatureEmpty(false);
  const handleSignatureEnd   = () =>
    setIsSignatureEmpty(signatureRef.current?.isEmpty() ?? true);
  const handleClear          = () => {
    signatureRef.current?.clear();
    setIsSignatureEmpty(true);
  };

  const back = () => router.push("/enrollment/step8");

  const submit = async () => {
    setErrors([]);

    /* 本地校验 */
    if (signatureRef.current?.isEmpty()) {
      setErrors(["Please provide your signature before submitting."]);
      setShowModal(true);
      return;
    }

    /* 生成签名 dataURL */
    const signatureData =
      signatureRef.current?.getTrimmedCanvas().toDataURL("image/png") || "";
    setData(p => ({ ...p, signatureData }));

    /* 规范化电话号码 */
    const fmt = (cc: string, num: string) => "+" + cc + num.replace(/^0+/, "");
    const payload = {
      ...data,
      signatureData,
      parentContactNumber:   fmt(data.parentCountryCode,   data.parentContactNumber),
      emergencyContactNumber:fmt(data.emergencyCountryCode,data.emergencyContactNumber),
      pickup1ContactNumber:  fmt(data.pickup1CountryCode,  data.pickup1ContactNumber),
      pickup2ContactNumber:  fmt(data.pickup2CountryCode,  data.pickup2ContactNumber),
    };

    try {
      setIsLoading(true);
      setProgress(`Sending enrollment form to '${data.parentEmail}' ...`);

      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok)
        throw new Error(`Server responded ${res.status}`);

      await res.json();               // 解析但不保存（避免 eslint unused-var）
      setProgress("Sent");
      router.push("/enrollment/step10");
    } catch (err) {
      setErrors([err instanceof Error ? err.message : "Unknown server error"]);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  /* ───────── UI ───────── */
  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 9: Parent / Guardian Signature
      </h1>
      <p className="mb-4 text-sm text-center">
        Please provide your signature below to confirm your enrollment.
      </p>

      {isLoading && (
        <p className="mb-4 text-center text-success">{progress}</p>
      )}

      {/* 签名板容器：全宽，自适应，最大 400 */}
      <div
        className="w-full border border-darklight hover:border-primary rounded mb-3 transition"
        style={{
          maxWidth: "400px",
          height: "180px",
          backgroundImage: isSignatureEmpty
            ? 'url("/images/enrollment/sign-here.png")'
            : "none",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "50% 37%",
          margin: "0 auto",
        }}
      >
        <SignatureCanvas
          ref={signatureRef}
          penColor="#4790FC"
          onBegin={handleSignatureBegin}
          onEnd={handleSignatureEnd}
          canvasProps={{
            width:  sigWidth,
            height: 180,
            className: "rounded w-full",
          }}
        />
      </div>

      {/* 清除按钮 */}
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

      {/* inline 错误 */}
      {errors.length > 0 && (
        <div className="text-sm text-red-600 mb-4 space-y-1">
          {errors.map((m,i)=><p key={i}>{m}</p>)}
        </div>
      )}

      <div className="flex justify-between gap-4">
        <Button onClick={back}   className="btn">Back</Button>
        <Button onClick={submit} className="btn">Submit</Button>
      </div>

      {/* 弹窗 */}
      {showModal && (
        <Modal title="Please fix the following" onClose={()=>setShowModal(false)}>
          <ul className="list-disc pl-5 text-red-600 space-y-1">
            {errors.map((m,i)=><li key={i}>{m}</li>)}
          </ul>
        </Modal>
      )}
    </StepContainer>
  );
}
