"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import CountryCodeSelect from "@/app/(normal)/registration/reg_CountryCodeSelect";
import Button from "@/components/Button";
import StepContainer from "../stepContainer";
import Modal from "../components/modal";
import { phoneOK, nz } from "../utils/validate";

export default function Step6() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  /* local state */
  const [code, setCode]           = useState(data.emergencyCountryCode || "27");
  const [number, setNumber]       = useState(data.emergencyContactNumber || "");
  const [errors, setErrors]       = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  /* helper */
  const update = (field: keyof typeof data, v: string) =>
    setData(p => ({ ...p, [field]: v }));

  /* validation */
  const validate = (): string[] => {
    const e:string[] = [];
    if (!nz(data.emergencyFirstName) || !nz(data.emergencySurname))
      e.push("Emergency contact name is required.");
    if (!nz(data.emergencyRelationship))
      e.push("Relationship to child is required.");
    if (!phoneOK(number))
      e.push("Contact number must contain 8–15 digits.");
    return e;
  };

  /* navigation */
  const next = () => {
    const list = validate();
    if (list.length) { setErrors(list); setShowModal(true); return; }

    setData(p => ({
      ...p,
      emergencyCountryCode: code,
      emergencyContactNumber: number,
    }));
    router.push("/enrollment/step7");
  };
  const back = () => router.push("/enrollment/step5");

  /* UI */
  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 6: Emergency Contact
      </h1>
      <p className="mb-4 text-sm text-center">
        Please provide details of someone we can contact in case of an emergency
        if the parent/guardian is unavailable.
      </p>

      {/* first & surname */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">First Name *</label>
        <input
          className="input-style w-full"
          value={data.emergencyFirstName}
          onChange={e => update("emergencyFirstName", e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Surname *</label>
        <input
          className="input-style w-full"
          value={data.emergencySurname}
          onChange={e => update("emergencySurname", e.target.value)}
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
              name="emergencyRelationship"
              value={r}
              checked={data.emergencyRelationship === r}
              onChange={e => update("emergencyRelationship", e.target.value)}
              required
            />
            <span className="ml-1">{r}</span>
          </label>
        ))}
      </div>

      {/* phone */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Contact Number *</label>
        <div className="mb-2">
          <CountryCodeSelect
            value={"+" + code}
            onChange={v => setCode(v.replace("+", ""))}
          />
        </div>
        <input
          type="tel"
          className="input-style w-full"
          placeholder="Enter digits only"
          value={number}
          onChange={e => setNumber(e.target.value.replace(/\D/g, ""))}
          required
        />
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
