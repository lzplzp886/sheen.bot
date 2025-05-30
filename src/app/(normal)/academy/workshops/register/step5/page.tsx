// src/app/(normal)/academy/workshops/register/step5/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import CountryCodeSelect from "@/app/(normal)/registration/reg_CountryCodeSelect";
import Button from "@/components/Button";
import StepContainer from "../stepContainer";
import Modal from "../components/modal";
import { emailOK, phoneOK, nz } from "../utils/validate";

export default function Step5() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  /* local state for code & digits */
  const [countryCode,   setCountryCode] = useState(data.parentCountryCode || "27");
  const [parentNumber,  setParentNumber] = useState(data.parentContactNumber || "");

  /* error / modal */
  const [errors,    setErrors]    = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  /* helper to update plain string fields */
  const update = (field: keyof typeof data, value: string) =>
    setData(prev => ({ ...prev, [field]: value }));

  /* toggle preferred-contact check-box */
  const togglePreferred = (method: string) =>
    setData(prev => {
      const list = prev.preferredContactMethods || [];
      const next = list.includes(method)
        ? list.filter(m => m !== method)
        : [...list, method];
      return { ...prev, preferredContactMethods: next };
    });

  /* ───────────── validation ───────────── */
  const validate = (): string[] => {
    const e: string[] = [];
    if (!nz(data.parentFirstName) || !nz(data.parentSurname))
      e.push("First name & surname are required.");
    if (!nz(data.parentRelationship))
      e.push("Relationship to child is required.");
    if (!emailOK(data.parentEmail))
      e.push("Please enter a valid e-mail address.");
    if (!phoneOK(parentNumber))
      e.push("Phone number must contain 8–15 digits.");
    if (!data.preferredContactMethods?.length)
      e.push("Select at least one preferred contact method.");
    if (!nz(data.subscribeNewsletter))
      e.push("Please indicate newsletter preference.");
    return e;
  };

  /* nav buttons */
  const next = () => {
    const list = validate();
    if (list.length) { setErrors(list); setShowModal(true); return; }

    /* save phone parts */
    setData(p => ({
      ...p,
      parentCountryCode: countryCode,
      parentContactNumber: parentNumber,
    }));
    router.push("/academy/workshops/register/step6");
  };

  const back = () => router.push("/academy/workshops/register/step4");

  /* ───────────── UI ───────────── */
  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 5: Parent / Guardian Details
      </h1>

      {/* first + surname */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">First Name *</label>
        <input
          className="input-style w-full"
          value={data.parentFirstName}
          onChange={e => update("parentFirstName", e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Surname *</label>
        <input
          className="input-style w-full"
          value={data.parentSurname}
          onChange={e => update("parentSurname", e.target.value)}
          required
        />
      </div>

      {/* relationship */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Relationship to Child *</label>
        {["Mother","Father","Grandparent","Others"].map(r => (
          <label key={r} className="mr-4 inline-flex items-center">
            <input
              type="radio"
              name="parentRelationship"
              value={r}
              checked={data.parentRelationship === r}
              onChange={e => update("parentRelationship", e.target.value)}
              required
            />
            <span className="ml-1">{r}</span>
          </label>
        ))}
      </div>

      {/* contact number */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Contact Number *</label>
        <div className="mb-2">
          <CountryCodeSelect
            value={"+" + countryCode}
            onChange={v => setCountryCode(v.replace("+", ""))}
          />
        </div>
        <input
          type="tel"
          className="input-style w-full"
          placeholder="Enter digits only"
          value={parentNumber}
          onChange={e => setParentNumber(e.target.value.replace(/\D/g, ""))}
          required
        />
      </div>

      {/* e-mail */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Email Address *</label>
        <input
          type="email"
          className="input-style w-full"
          value={data.parentEmail}
          onChange={e => update("parentEmail", e.target.value)}
          required
        />
      </div>

      {/* preferred contact – multi-select */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Preferred contact method for general information *
        </label>
        {["Email","Phone","WhatsApp"].map(m => (
          <label key={m} className="mr-4 inline-flex items-center">
            <input
              type="checkbox"
              checked={data.preferredContactMethods?.includes(m) || false}
              onChange={() => togglePreferred(m)}
            />
            <span className="ml-1">{m}</span>
          </label>
        ))}
      </div>

      {/* newsletter yes / no */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Would you like to subscribe to our newsletter? *
        </label>
        {["Yes","No"].map(v => (
          <label key={v} className="mr-4 inline-flex items-center">
            <input
              type="radio"
              name="subscribeNewsletter"
              value={v}
              checked={data.subscribeNewsletter === v}
              onChange={e => update("subscribeNewsletter", e.target.value)}
              required
            />
            <span className="ml-1">{v}</span>
          </label>
        ))}
      </div>

      {/* inline errors */}
      {errors.length > 0 && (
        <div className="text-sm text-error mb-4 space-y-1">
          {errors.map((m,i)=><p key={i}>{m}</p>)}
        </div>
      )}

      <div className="flex justify-between gap-4">
        <Button onClick={back} className="btn">Back</Button>
        <Button onClick={next} className="btn">Next</Button>
      </div>

      {showModal && (
        <Modal title="Please fix the following" onClose={()=>setShowModal(false)}>
          <ul className="list-disc pl-5 text-error space-y-1">
            {errors.map((m,i)=><li key={i}>{m}</li>)}
          </ul>
        </Modal>
      )}
    </StepContainer>
  );
}
