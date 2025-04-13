// src/app/(normal)/enrollment/step2/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useWizardContext, ChildInfo } from "../context";
import Button from "@/components/Button";

/**
 * 用于显示单个 Child 的表单
 */
function ChildForm({
  index,
  child,
  onChange,
  onRemove,
}: {
  index: number;
  child: ChildInfo;
  onChange: (idx: number, field: string, value: string | number) => void;
  onRemove: (idx: number) => void;
}) {
  // 当用户更新 firstName、surname后，如果有值，就在 title显示
  const childTitle = child.firstName
    ? `${child.firstName} ${child.surname || ""}`
    : `Child ${index + 1}`;

  return (
    <div className="p-4 mb-4 bg-gray-50 border rounded shadow-sm">
      <h3 className="text-lg font-bold mb-2">{childTitle}</h3>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">First Name</label>
        <input
          type="text"
          className="input-style w-full"
          value={child.firstName}
          onChange={(e) => onChange(index, "firstName", e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Surname</label>
        <input
          type="text"
          className="input-style w-full"
          value={child.surname}
          onChange={(e) => onChange(index, "surname", e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Age</label>
        <input
          type="number"
          className="input-style w-full"
          value={child.age ?? ""}
          onChange={(e) => onChange(index, "age", Number(e.target.value))}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Gender</label>
        <select
          className="input-style w-full"
          value={child.gender}
          onChange={(e) => onChange(index, "gender", e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other / Non-binary</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">School Name</label>
        <input
          type="text"
          className="input-style w-full"
          value={child.schoolName}
          onChange={(e) => onChange(index, "schoolName", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Grade</label>
        <select
          className="input-style w-full"
          value={child.grade}
          onChange={(e) => onChange(index, "grade", e.target.value)}
        >
          <option value="">Select Grade</option>
          {[
            "Grade R",
            "Grade 1",
            "Grade 2",
            "Grade 3",
            "Grade 4",
            "Grade 5",
            "Grade 6",
            "Grade 7",
            "Grade 8",
            "Grade 9",
            "Grade 10",
            "Grade 11",
            "Grade 12",
            "Out of School",
          ].map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Medical Conditions</label>
        <input
          type="text"
          className="input-style w-full"
          value={child.medicalConditions}
          onChange={(e) => onChange(index, "medicalConditions", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Allergies</label>
        <input
          type="text"
          className="input-style w-full"
          value={child.allergies}
          onChange={(e) => onChange(index, "allergies", e.target.value)}
        />
      </div>

      {/** 仅当有2个或以上孩子时，才显示删除按钮 */}
      <Button
        type="button"
        className="btn bg-red-500 mt-2"
        onClick={() => onRemove(index)}
      >
        Remove
      </Button>
    </div>
  );
}

export default function Step2() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  // 如果没孩子，就初始化至少 1 个
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

  const handleChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setData((prev) => {
      const newChildren = [...prev.children];
      // @ts-expect-error: test purpose
      newChildren[index][field] = value;
      return { ...prev, children: newChildren };
    });
  };

  const handleAddChild = () => {
    setData((prev) => ({
      ...prev,
      children: [
        ...prev.children,
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

  const handleRemoveChild = (index: number) => {
    setData((prev) => {
      const newChildren = [...prev.children];
      newChildren.splice(index, 1);
      return { ...prev, children: newChildren };
    });
  };

  // 简单校验：必须至少有1个孩子且必填项都有
  const isFormValid = data.children.every(
    (c) => c.firstName && c.surname && c.age !== null
  );

  const handleNext = () => {
    if (!isFormValid) {
      alert("Please fill all required child info fields before proceeding.");
      return;
    }
    router.push("/enrollment/step3");
  };

  const handleBack = () => {
    router.push("/enrollment/step1");
  };

  return (
    <div className="p-5 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Section 2: Child&rsquo;s Details
      </h1>

      {data.children.map((child, index) => (
        <ChildForm
          key={index}
          index={index}
          child={child}
          onChange={handleChange}
          onRemove={handleRemoveChild}
        />
      ))}

      <Button type="button" className="btn mb-4" onClick={handleAddChild}>
        Add Another Child
      </Button>

      <div className="flex justify-between">
        <Button onClick={handleBack} className="btn">
          Back
        </Button>
        <Button onClick={handleNext} className="btn">
          Next
        </Button>
      </div>
    </div>
  );
}
