// src/app/(normal)/academy/workshops/register/step2/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardContext, ChildInfo } from '../context';
import StepContainer from '../stepContainer';
import Modal from '../components/modal';
import Button from '@/components/Button';

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
  const childTitle = child.firstName
    ? `${child.firstName} ${child.surname || ''}`
    : `Child ${index + 1}`;

  const ageError = child.age !== null && child.age < 10;

  return (
    <div className="p-4 mb-4 bg-extralight border rounded shadow-sm">
      <h3 className="text-lg font-bold mb-2">{childTitle}</h3>

      {/* First Name */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">First Name</label>
        <input
          className="input-style w-full"
          value={child.firstName}
          onChange={(e) => onChange(index, 'firstName', e.target.value)}
          required
        />
      </div>

      {/* Last Name */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Last Name</label>
        <input
          className="input-style w-full"
          value={child.surname}
          onChange={(e) => onChange(index, 'surname', e.target.value)}
          required
        />
      </div>

      {/* Age */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Age (9+)</label>
        <input
          type="number"
          min={9}
          className={`input-style w-full ${ageError ? 'border-error' : ''}`}
          value={child.age ?? ''}
          onChange={(e) =>
            onChange(
              index,
              'age',
              e.target.value === '' ? null : Number(e.target.value),
            )
          }
          required
        />
        {ageError && (
          <p className="text-xs text-error mt-1">
            Participants must be 9 years or older.
          </p>
        )}
      </div>

      {/* Gender */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Gender</label>
        <select
          className="input-style w-full"
          value={child.gender}
          onChange={(e) => onChange(index, 'gender', e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      {/* Remove link */}
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

  const [children, setChildren] = useState<ChildInfo[]>(data.children);

  /* 错误与弹窗状态 */
  const [errors, setErrors] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  /* ---------- 操作函数 ---------- */
  const updateChild = (
    idx: number,
    field: keyof ChildInfo,
    value: string | number | null,
  ) => {
    setChildren((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const addChild = () =>
    setChildren((prev) => [
      ...prev,
      { firstName: '', surname: '', age: null, gender: '' },
    ]);

  const removeChild = (idx: number) =>
    setChildren((prev) => prev.filter((_, i) => i !== idx));

  /* 校验 */
  const validate = (): string[] => {
    const list: string[] = [];
    if (children.length === 0) list.push('Add at least one child.');

    children.forEach((c, i) => {
      const tag = `Child ${i + 1}:`;
      if (!c.firstName || !c.surname)
        list.push(`${tag} first name & surname are required.`);
      if (c.age === null) list.push(`${tag} age is required.`);
      else if (c.age < 10) list.push(`${tag} age must be 10 or older.`);
      if (!c.gender) list.push(`${tag} gender is required.`);
    });

    return list;
  };

  /* 下一步 */
  const handleNext = () => {
    const list = validate();
    if (list.length) {
      setErrors(list);
      setShowModal(true);
      return;
    }

    setData((prev) => ({
      ...prev,
      children,
    }));

    router.push('/academy/workshops/register/step4');
  };

  /* ---------- UI ---------- */
  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step&nbsp;2:&nbsp;Student&nbsp;Details
      </h1>

      {children.map((child, idx) => (
        <ChildForm
          key={idx}
          index={idx}
          child={child}
          totalCount={children.length}
          onChange={updateChild}
          onRemove={removeChild}
        />
      ))}

      <div
        className="mb-4 text-primary font-medium cursor-pointer select-none"
        onClick={addChild}
      >
        + Add Another Child
      </div>

      {/* 行内错误备用（可删） */}
      {errors.length > 0 && !showModal && (
        <div className="text-sm text-error mb-4">
          {errors.map((m, i) => (
            <p key={i}>{m}</p>
          ))}
        </div>
      )}

      <div className="flex justify-between gap-4">
        <Button onClick={() => router.back()} className="btn">
          Back
        </Button>
        <Button onClick={handleNext} className="btn">
          Continue
        </Button>
      </div>

      {/* 弹窗 */}
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
