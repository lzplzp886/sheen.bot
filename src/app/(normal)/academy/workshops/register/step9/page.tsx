// src/app/(normal)/academy/workshops/register/step9/page.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SignatureCanvas from "react-signature-canvas";
import { useWizardContext } from "../context";
import Button from "@/components/Button";
import Image from "next/image";
import StepContainer from "../stepContainer";
import Modal from "../components/modal";
import { nz, emailOK, phoneOK } from "../utils/validate";

export default function Step9() {
  const router = useRouter();
  const { data, setData } = useWizardContext();
  const sigRef = useRef<SignatureCanvas | null>(null);

  /* ───────── responsive width ───────── */
  const [sigW, setSigW] = useState(400);
  useEffect(() => {
    const f = () =>
      setSigW(Math.min(400, document.documentElement.clientWidth - 32));
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);

  const [isEmpty,    setIsEmpty]    = useState(true);
  const [isLoading,  setLoading]    = useState(false);
  const [progress,   setProgress]   = useState("");
  const [errors,     setErrors]     = useState<string[]>([]);
  const [showModal,  setShowModal]  = useState(false);

  /* ───────── validateAll – simplified for Workshop ───────── */
  const validateAll = (): string[] => {
  const e: string[] = [];

  /* step2 – children */
  if (!data.children.length) e.push('Add at least one child.');
  data.children.forEach((c, i) => {
    const tag = `Child ${i + 1}:`;
    if (!nz(c.firstName) || !nz(c.surname))
      e.push(`${tag} first name & surname are required.`);
    if (c.age === null) e.push(`${tag} age is required.`);
    else if (c.age < 10)
      e.push(`${tag} age must be 10 or older.`);
    if (!nz(c.gender))
      e.push(`${tag} gender is required.`);
  });

  /* step4 – workshop schedule (single choice) */
  if (!nz(data.selectedDateRange))
    e.push('Choose a week (Step 4).');
  if (!nz(data.selectedTimeslot))
    e.push('Choose a time slot (Step 4).');

  /* step5 – parent / guardian */
  if (!nz(data.parentFirstName) || !nz(data.parentSurname))
    e.push('Parent first name & surname are required (Step 5).');
  if (!nz(data.parentRelationship))
    e.push('Relationship to child is required (Step 5).');
  if (!emailOK(data.parentEmail))
    e.push('Enter a valid e-mail address (Step 5).');
  if (!phoneOK(data.parentContactNumber))
    e.push('Parent phone must contain 8–15 digits (Step 5).');
  if (!data.preferredContactMethods.length)
    e.push('Select at least one preferred contact method (Step 5).');
  /* newsletter preference 留作可选，故不再校验 */

  /* step6 – emergency contact */
  if (!nz(data.emergencyFirstName) || !nz(data.emergencySurname))
    e.push('Emergency contact name is required (Step 6).');
  if (!nz(data.emergencyRelationship))
    e.push('Emergency contact relationship is required (Step 6).');
  if (!phoneOK(data.emergencyContactNumber))
    e.push('Emergency contact phone must contain 8–15 digits (Step 6).');

  /* step7 – authorised pickups */
  if (!nz(data.pickup1FirstName) || !nz(data.pickup1Surname))
    e.push('First authorised person name is required (Step 7).');
  if (!nz(data.pickup1Relationship))
    e.push('First authorised person relationship is required (Step 7).');
  if (!phoneOK(data.pickup1ContactNumber))
    e.push('First authorised person phone must contain 8–15 digits (Step 7).');

  const any2 =
    nz(data.pickup2FirstName) ||
    nz(data.pickup2Surname) ||
    nz(data.pickup2Relationship) ||
    nz(data.pickup2ContactNumber);
  if (any2) {
    if (!nz(data.pickup2FirstName) || !nz(data.pickup2Surname))
      e.push('Second authorised person name is incomplete (Step 7).');
    if (!nz(data.pickup2Relationship))
      e.push('Second authorised person relationship is missing (Step 7).');
    if (!phoneOK(data.pickup2ContactNumber))
      e.push('Second authorised person phone must contain 8–15 digits (Step 7).');
  }

  /* step8 – consents */
  if (!data.consentConfirmed)
    e.push('General consent must be checked (Step 8).');
  if (!data.popiaConfirmed)
    e.push('POPIA consent must be checked (Step 8).');

  /* this step – signature */
  if (sigRef.current?.isEmpty()) e.push('Signature is required.');

  return e;
};

  /* ───────── handlers ───────── */
  const clearSig = () => {
    sigRef.current?.clear();
    setIsEmpty(true);
  };
  const back = () => router.push("/academy/workshops/register/step8");

  const submit = async () => {
    const allErrs = validateAll();
    if (allErrs.length) {
      setErrors(allErrs);
      setShowModal(true);
      return;
    }

    /* save signature */
    const sigData =
      sigRef.current?.getTrimmedCanvas().toDataURL("image/png") || "";
    setData(p => ({ ...p, signatureData: sigData }));

    /* normalise phone numbers */
    const fmt = (cc: string, num: string) => "+" + cc + num.replace(/^0+/, "");
    const payload = {
      ...data,
      signatureData: sigData,
      parentContactNumber:   fmt(data.parentCountryCode,   data.parentContactNumber),
      emergencyContactNumber:fmt(data.emergencyCountryCode,data.emergencyContactNumber),
      pickup1ContactNumber:  fmt(data.pickup1CountryCode,  data.pickup1ContactNumber),
      pickup2ContactNumber:  fmt(data.pickup2CountryCode,  data.pickup2ContactNumber),
    };

    try {
      setLoading(true);
      setProgress(`Sending registration form to '${data.parentEmail}' ...`);

      const res = await fetch("/api/workshop-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      await res.json();
      setProgress("Sent");
      router.push("/academy/workshops/register/step10");
    } catch (err) {
      setErrors([err instanceof Error ? err.message : "Unknown server error"]);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  /* ───────── UI ───────── */
  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 9: Parent / Guardian Signature
      </h1>
      <p className="mb-4 text-sm text-center">
        Please provide your signature below to confirm your registration.
      </p>

      {isLoading && (
        <p className="mb-4 text-center text-success">{progress}</p>
      )}

      {/* signature pad */}
      <div
        className="w-full border border-darklight hover:border-primary rounded mb-3 transition"
        style={{
          maxWidth: "400px",
          height: 180,
          backgroundImage: isEmpty
            ? 'url("/images/academy/Workshops/registration/sign-here.png")'
            : "none",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "50% 37%",
          margin: "0 auto",
        }}
      >
        <SignatureCanvas
          ref={sigRef}
          penColor="#4790FC"
          onBegin={() => setIsEmpty(false)}
          onEnd={() => setIsEmpty(sigRef.current?.isEmpty() ?? true)}
          canvasProps={{
            width:  sigW,
            height: 180,
            className: "rounded w-full",
          }}
        />
      </div>

      {/* clear btn */}
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={clearSig}
          className="flex items-center text-darklight hover:text-light focus:outline-none"
        >
          <Image
            src="/images/academy/Workshops/registration/eraser.svg"
            alt="Clear signature"
            style={{ width: 20, height: 20, marginRight: 5 }}
          />
          <span>Clear</span>
        </button>
      </div>

      <div className="flex justify-between gap-4">
        <Button onClick={back} className="btn">
          Back
        </Button>
        <Button
          onClick={submit}
          className="btn"
          isLoading={isLoading}
          loadingText="Sending..."
        >
          Submit
        </Button>
      </div>

      {showModal && (
        <Modal
          title="Please fix the following"
          onClose={() => setShowModal(false)}
        >
          <ul className="list-disc pl-5 text-error space-y-1">
            {errors.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </Modal>
      )}
    </StepContainer>
  );
}
