// src/app/(normal)/academy/workshops/register/step3/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardContext, ChildInfo } from '../context';
import StepContainer from '../stepContainer';
import Button from '@/components/Button';
import { WORKSHOPS } from '../constants';

/* ────────────────────────── Child Card ────────────────────────── */
function ChildForm({
  idx,
  total,
  child,
  minAge,
  maxAge,
  onChange,
  onRemove,
}: {
  idx: number;
  total: number;
  child: ChildInfo;
  minAge: number;
  maxAge: number | null;
  onChange: (
    index: number,
    field: keyof ChildInfo,
    value: string | number | null
  ) => void;
  onRemove: (index: number) => void;
}) {
  const title = child.firstName
    ? `${child.firstName} ${child.surname || ''}`
    : `Child ${idx + 1}`;

  const ageError =
    child.age !== null &&
    (child.age < minAge || (maxAge !== null && child.age > maxAge));

  return (
    <div className="p-4 mb-4 bg-extralight border rounded shadow-sm">
      <h3 className="text-lg font-bold mb-2">{title}</h3>

      {/* First Name */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">First Name</label>
        <input
          className="input-style w-full"
          value={child.firstName}
          onChange={e => onChange(idx, 'firstName', e.target.value)}
          required
        />
      </div>

      {/* Last Name */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Last Name</label>
        <input
          className="input-style w-full"
          value={child.surname}
          onChange={e => onChange(idx, 'surname', e.target.value)}
          required
        />
      </div>

      {/* Age */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">
          Age ({minAge}
          {maxAge ? ` – ${maxAge}` : '+'})
        </label>
        <input
          type="number"
          min={minAge}
          {...(maxAge !== null && { max: maxAge })}
          className={`input-style w-full ${ageError ? 'border-error' : ''}`}
          value={child.age ?? ''}
          onChange={e =>
            onChange(idx, 'age', e.target.value ? Number(e.target.value) : null)
          }
          required
        />
        {ageError && (
          <p className="text-xs text-error mt-1">
            Age must be {minAge}
            {maxAge ? ` – ${maxAge}` : '+'} years old.
          </p>
        )}
      </div>

      {/* Gender */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Gender</label>
        <select
          className="input-style w-full"
          value={child.gender}
          onChange={e => onChange(idx, 'gender', e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      {/* Remove link */}
      {total > 1 && (
        <div
          onClick={() => onRemove(idx)}
          className="text-error font-medium cursor-pointer select-none mt-2"
        >
          – Remove
        </div>
      )}
    </div>
  );
}

/* ────────────────────────── Step-3 Page ────────────────────────── */
export default function Step3() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  /* derive age limits from selected workshop */
  const { minAge, maxAge } = useMemo(() => {
    const ws =
      WORKSHOPS.find(w => w.code === data.selectedWorkshop) || WORKSHOPS[0];
    return { minAge: ws.minAge, maxAge: ws.maxAge };
  }, [data.selectedWorkshop]);

  const [children, setChildren] = useState<ChildInfo[]>(data.children);

  const updateChild = (
    index: number,
    field: keyof ChildInfo,
    value: string | number | null
  ) =>
    setChildren(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });

  const addChild = () =>
    setChildren(prev => [
      ...prev,
      { firstName: '', surname: '', age: null, gender: '' },
    ]);

  const removeChild = (index: number) =>
    setChildren(prev => prev.filter((_, i) => i !== index));

  /* validation & navigation */
  const handleNext = () => {
    for (const c of children) {
      if (
        !c.firstName ||
        !c.surname ||
        !c.age ||
        !c.gender ||
        c.age < minAge ||
        (maxAge !== null && c.age > maxAge)
      ) {
        alert(
          `Please complete all fields.\nAge must be between ${minAge}${
            maxAge ? ' and ' + maxAge : '+'
          }.`
        );
        return;
      }
    }
    setData(prev => ({ ...prev, children }));
    router.push('/academy/workshops/register/step4');
  };

  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 3: Student Details
      </h1>

      {children.map((child, idx) => (
        <ChildForm
          key={idx}
          idx={idx}
          total={children.length}
          child={child}
          minAge={minAge}
          maxAge={maxAge}
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

      <div className="flex justify-between gap-4">
        <Button
          onClick={() => router.push('/academy/workshops/register/step2')}
          className="btn"
        >
          Back
        </Button>
        <Button onClick={handleNext} className="btn">
          Continue
        </Button>
      </div>
    </StepContainer>
  );
}