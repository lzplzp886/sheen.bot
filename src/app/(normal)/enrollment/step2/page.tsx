// src/app/(normal)/enrollment/step2/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useWizardContext, ChildInfo } from "../context";
import Button from "@/components/Button";
import Image from "next/image";

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
  onChange: (idx: number, field: string, value: string | number) => void;
  onRemove: (idx: number) => void;
}) {
  // 当用户更新 firstName、surname 后，如果有值，就在标题显示
  const childTitle = child.firstName
    ? `${child.firstName} ${child.surname || ""}`
    : `Child ${index + 1}`;

  // 根据年龄计算班级及对应图片
  let classification = "";
  let classImage = "";
  if (child.age !== null && child.age >= 6 && child.age <= 15) {
    if (child.age >=6 && child.age <= 8) {
      classification = "Intro Class";
      classImage = "/images/enrollment/intro-class.png";
    } else if (child.age >= 9 && child.age <= 11) {
      classification = "Junior Class";
      classImage = "/images/enrollment/junior-class.png";
    } else if (child.age >= 12 && child.age <=15 ) {
      classification = "Explorer Class";
      classImage = "/images/enrollment/explorer-class.png";
    }
  } else if (child.age !== null) {
    classification = "Invalid age (must be between 6-15)";
  }

  return (
    <div className="p-4 mb-4 bg-extralight border border-extralight rounded shadow-sm">
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
          <option value="Rather not say">Rather not say</option>
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

      {/* 显示班级信息及对应图片（如果年龄有效） */}
      {child.age !== null && child.age >= 0 && child.age < 18 && (
        <div className="mb-3">
          <p className="text-sm font-medium">{`Class: ${classification}`}</p>
          {classImage && (
            <Image
              src={classImage}
              alt={classification}
              className="w-32 h-32 mt-1 rounded-lg border shadow-sm"
            />
          )}
        </div>
      )}
      {child.age !== null && (child.age < 0 || child.age >= 18) && (
        <p className="text-sm text-error">
          Age needs to be between 6 and 15.
        </p>
      )}

      {/* 删除链接：如果总孩子数大于1，则显示删除链接 */}
      {onRemove && totalCount > 1 && (
        <div
          onClick={() => onRemove(index)}
          className="text-error font-medium cursor-pointer select-none mt-2"
        >
          - Remove
        </div>
      )}
    </div>
  );
}

export default function Step2() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  // 如果没有孩子，则初始化至少 1 个
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
      // @ts-expect-error: for test purpose
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

  // 验证所有孩子信息：确保至少有 1 个孩子且必填项均填写，同时年龄必须在 0 ~ 17 之间
  const isFormValid = data.children.every(
    (c) =>
      c.firstName &&
      c.surname &&
      c.age !== null &&
      c.age >= 0 &&
      c.age < 18
  );

  const handleNext = () => {
    if (!isFormValid) {
      alert(
        "Please fill all required child info fields (age must be between 0 and 17) before proceeding."
      );
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
        Step2: Child&rsquo;s Details
      </h1>

      {data.children.map((child, index) => (
        <ChildForm
          key={index}
          index={index}
          child={child}
          totalCount={data.children.length}
          onChange={handleChange}
          onRemove={handleRemoveChild}
        />
      ))}

      {/* 普通文字链接，前面添加 "+" 符号 */}
      <div
        className="mb-4 text-primary font-medium cursor-pointer select-none"
        onClick={handleAddChild}
      >
        + Add Another Child
      </div>

      <div className="flex justify-between gap-4">
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
