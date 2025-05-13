// src/app/(normal)/enrollment/step2/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardContext, ChildInfo } from "../context";
import Button from "@/components/Button";
import Image from "next/image";
import StepContainer from "../stepContainer";
import Modal from "../components/modal";
import { nz } from "../utils/validate";

/* ──────────────────────────  Child Card  ────────────────────────── */
function ChildForm({
  index,
  child,
  totalCount,
  onChange,
  onRemove,
}: {
  index: number;
  child: ChildInfo;
  totalCount: number;
  onChange: (idx: number, field: keyof ChildInfo, value: string | number | null) => void;
  onRemove: (idx: number) => void;
}) {
  /* dynamic card title */
  const childTitle = child.firstName
    ? `${child.firstName} ${child.surname || ""}`
    : `Child ${index + 1}`;

  /* age → class visual (no error text anymore) */
  let classification = "";
  let classImage = "";
  if (child.age !== null && child.age >= 6 && child.age <= 15) {
    if (child.age <= 8) {
      classification = "Intro Class";
      classImage = "/images/enrollment/intro-class.png";
    } else if (child.age <= 11) {
      classification = "Junior Class";
      classImage = "/images/enrollment/junior-class.png";
    } else {
      classification = "Explorer Class";
      classImage = "/images/enrollment/explorer-class.png";
    }
  }

  return (
    <div className="p-4 mb-4 bg-extralight border rounded shadow-sm">
      <h3 className="text-lg font-bold mb-2">{childTitle}</h3>

      {/* first name */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">First Name</label>
        <input
          className="input-style w-full"
          value={child.firstName}
          onChange={(e) => onChange(index, "firstName", e.target.value)}
          required
        />
      </div>

      {/* surname */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Surname</label>
        <input
          className="input-style w-full"
          value={child.surname}
          onChange={(e) => onChange(index, "surname", e.target.value)}
          required
        />
      </div>

      {/* age – allows blank (null) */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Age (6 – 15)</label>
        <input
          type="number"
          min={6}
          max={15}
          className="input-style w-full"
          value={child.age ?? ""}
          onChange={(e) =>
            onChange(index, "age", e.target.value === "" ? null : Number(e.target.value))
          }
          required
        />
      </div>

      {/* gender */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Gender</label>
        <select
          className="input-style w-full"
          value={child.gender}
          onChange={(e) => onChange(index, "gender", e.target.value)}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Rather not say</option>
        </select>
      </div>

      {/* school */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">School Name</label>
        <input
          className="input-style w-full"
          value={child.schoolName}
          onChange={(e) => onChange(index, "schoolName", e.target.value)}
        />
      </div>

      {/* grade */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Grade</label>
        <select
          className="input-style w-full"
          value={child.grade}
          onChange={(e) => onChange(index, "grade", e.target.value)}
        >
          <option value="">Select Grade</option>
          {[
            "Grade R","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5",
            "Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12","Out of School",
          ].map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* medical + allergies */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Medical Conditions</label>
        <input
          className="input-style w-full"
          value={child.medicalConditions}
          onChange={(e) => onChange(index, "medicalConditions", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Allergies</label>
        <input
          className="input-style w-full"
          value={child.allergies}
          onChange={(e) => onChange(index, "allergies", e.target.value)}
        />
      </div>

      {/* class preview */}
      {classification && (
        <div className="mb-3">
          <p className="text-sm font-medium">Class: {classification}</p>
          <Image
            src={classImage}
            alt={classification}
            className="w-32 h-32 mt-1 rounded-lg border shadow-sm"
          />
        </div>
      )}

      {/* remove link */}
      {totalCount > 1 && (
        <div
          onClick={() => onRemove(index)}
          className="text-error font-medium cursor-pointer select-none mt-2"
        >
          – Remove
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────  Step-2 Page  ────────────────────────── */
export default function Step2() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  /* add error + modal state */
  const [errors, setErrors] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  /* ensure at least one child exists */
  React.useEffect(() => {
    if (data.children.length === 0) {
      setData((prev) => ({
        ...prev,
        children: [
          {
            firstName: "",
            surname: "",
            age: null,
            gender: "",
            schoolName: "",
            grade: "",
            medicalConditions: "",
            allergies: "",
          },
        ],
      }));
    }
  }, [data.children.length, setData]);

  /* field updater */
  const handleChange = (
    index: number,
    field: keyof ChildInfo,
    value: string | number | null
  ) => {
    setData((prev) => {
      const children = [...prev.children];
      // @ts-expect-error deliberate
      children[index][field] = value;
      return { ...prev, children };
    });
  };

  /* add & remove child */
  const handleAddChild = () => {
    setData((p) => ({
      ...p,
      children: [
        ...p.children,
        {
          firstName: "",
          surname: "",
          age: null,
          gender: "",
          schoolName: "",
          grade: "",
          medicalConditions: "",
          allergies: "",
        },
      ],
    }));
  };

  const handleRemoveChild = (idx: number) =>
    setData((p) => {
      const children = [...p.children];
      children.splice(idx, 1);
      return { ...p, children };
    });

  /* ------------- VALIDATION ------------- */
  const validate = (): string[] => {
    const e: string[] = [];
    if (data.children.length === 0) e.push("Add at least one child.");

    data.children.forEach((c, i) => {
      const tag = `Child ${i + 1}:`;
      if (!nz(c.firstName) || !nz(c.surname))
        e.push(`${tag} first name & surname are required.`);
      if (c.age === null)
        e.push(`${tag} age is required.`);
      else if (c.age < 6 || c.age > 15)
        e.push(`${tag} age must be between 6 and 15.`);
      if (!nz(c.grade)) e.push(`${tag} grade is required.`);
    });
    return e;
  };

  /* nav buttons */
  const handleNext = () => {
    const list = validate();
    if (list.length) {
      setErrors(list);
      setShowModal(true);
      return;
    }
    router.push("/enrollment/step3");
  };

  const handleBack = () => router.push("/enrollment/step1");

  /* ──────────────────────────  UI  ────────────────────────── */
  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 2: Child&rsquo;s Details
      </h1>

      {data.children.map((child, idx) => (
        <ChildForm
          key={idx}
          index={idx}
          child={child}
          totalCount={data.children.length}
          onChange={handleChange}
          onRemove={handleRemoveChild}
        />
      ))}

      <div
        className="mb-4 text-primary font-medium cursor-pointer select-none"
        onClick={handleAddChild}
      >
        + Add Another Child
      </div>

      {/* bottom inline errors */}
      {errors.length > 0 && (
        <div className="space-y-1 text-sm text-red-600 mb-4">
          {errors.map((m, i) => (
            <p key={i}>{m}</p>
          ))}
        </div>
      )}

      <div className="flex justify-between gap-4">
        <Button onClick={handleBack} className="btn">
          Back
        </Button>
        <Button onClick={handleNext} className="btn">
          Next
        </Button>
      </div>

      {showModal && (
        <Modal title="Please fix the following" onClose={() => setShowModal(false)}>
          <ul className="list-disc pl-5 text-red-600 space-y-1">
            {errors.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </Modal>
      )}
    </StepContainer>
  );
}
