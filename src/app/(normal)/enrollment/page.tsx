// src/app/(normal)/enrollment/page.tsx

"use client";

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import Button from "@/components/Button"; // 假设你在此路径下有一个 Button 组件

export default function EnrollmentPage() {
  // 表单字段定义（可根据实际需要增补）
  const [childName, setChildName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  // 提交状态 & 错误信息
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 签名画布
  const signatureRef = useRef<SignatureCanvas | null>(null);

  /**
   * 提交表单
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // 校验必填字段
    if (!childName || !dateOfBirth || !parentName || !parentEmail) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    // 获取签名的 Base64 字符串
    const signatureData = signatureRef.current
      ? signatureRef.current.getTrimmedCanvas().toDataURL("image/png")
      : "";

    // 构造请求体
    const payload = {
      childName,
      dateOfBirth,
      parentName,
      parentEmail,
      phoneNumber,
      address,
      signature: signatureData,
    };

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
      alert(result.message || "Form submitted successfully!");

      // 提交成功后可清空或跳转
      setChildName("");
      setDateOfBirth("");
      setParentName("");
      setParentEmail("");
      setPhoneNumber("");
      setAddress("");
      signatureRef.current?.clear();
    } catch (err: unknown) {
        if (err instanceof Error) {
        setErrorMsg(err.message);
        } else {
          setErrorMsg("An unknown error occurred.");
        }
    }
  };

  /**
   * 清空签名画布
   */
  const handleClearSignature = () => {
    signatureRef.current?.clear();
  };

  return (
    <div className="p-5 text-center">
      <h1 className="text-2xl font-bold mb-4">Enrollment Form</h1>
      <p className="mb-6 max-w-2xl text-center">
        Please complete the form below to register your child for our coding and robotics course. All information will be kept confidential and used solely for registration purposes.
      </p>

      <form
        onSubmit={handleSubmit}
        className="p-5 max-w-md mx-auto text-left rounded-lg shadow-md"
      >

        {/* REFERRAL CODE */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Referral Code</label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="input-style w-full"
            required
          />
          <p className="mb-6">
            If you were referred to us by some please enter their name
          </p>
        </div>

        {/* CHILD NAME */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Child&rsquo;s Name *</label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="input-style w-full"
            required
          />
        </div>

        {/* DATE OF BIRTH */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Date of Birth *</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="input-style w-full"
            required
          />
        </div>

        {/* PARENT NAME */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Parent / Guardian Name *</label>
          <input
            type="text"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            className="input-style w-full"
            required
          />
        </div>

        {/* PARENT EMAIL */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Parent Email *</label>
          <input
            type="email"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            className="input-style w-full"
            required
          />
        </div>

        {/* PHONE NUMBER */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="input-style w-full"
            placeholder="Optional"
          />
        </div>

        {/* ADDRESS */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input-style w-full"
            rows={3}
            placeholder="Optional"
          />
        </div>

        {/* SIGNATURE */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Signature *</label>
          <SignatureCanvas
            ref={signatureRef}
            penColor="blue"
            canvasProps={{
              width: 500,
              height: 150,
              className: "border border-gray-300 rounded",
            }}
          />
          <Button
            type="button"
            onClick={handleClearSignature}
            className="mt-2 btn"
          >
            Clear Signature
          </Button>
        </div>

        {/* 错误提示 */}
        {errorMsg && <p className="text-error mb-3">{errorMsg}</p>}

        {/* 提交按钮 */}
        <Button
          type="submit"
          className="btn w-full"
          isLoading={isSubmitting}
          loadingText="Submitting..."
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
