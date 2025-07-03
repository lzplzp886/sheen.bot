// src/app/(normal)/academy/workshops/register/step4/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardContext } from '../context';
import StepContainer from '../stepContainer';
import Button from '@/components/Button';
import { WORKSHOPS } from '../constants';

export default function Step4() {
  const { data, setData } = useWizardContext();
  const router = useRouter();

  /* 当前已选 workshop 对象 */
  const ws = WORKSHOPS.find(w => w.code === data.selectedWorkshop) ?? WORKSHOPS[0];

  /* 本页 state，初始取 context */
  const [week, setWeek]           = useState(data.selectedDateRange);
  const [slot, setSlot]           = useState(data.selectedTimeslot);
  const [errors, setErrors]       = useState<string[]>([]);

  /* 验证并前往下一步 */
  const handleNext = () => {
    const err: string[] = [];
    if (!week) err.push('Please select a date range.');
    if (!slot) err.push('Please select a time slot.');
    if (err.length) return setErrors(err);

    setData(prev => ({
      ...prev,
      selectedDateRange: week,
      selectedTimeslot:  slot,
      selectedTimeslots: [`${week} ${slot}`], // 兼容旧字段
    }));
    router.push('/academy/workshops/register/step5');
  };

  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 4: Workshop Schedule
      </h1>

      {/* ───────────── Workshop recap ───────────── */}
      <p className="mb-6 text-center">
        <strong>Selected Workshop:</strong>&nbsp;{ws.name}
      </p>

      {/* ───────────── Date Range ───────────── */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Choose a Date Range</label>
        {ws.weeks.map(w => (
          <label key={w.value} className="flex items-center mb-2 cursor-pointer">
            <input
              type="radio"
              name="week"
              className="mr-2"
              checked={week === w.value}
              onChange={() => setWeek(w.value)}
            />
            {w.label}
          </label>
        ))}
      </div>

      {/* ───────────── Time Slot ───────────── */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Choose a Time Slot</label>
        {ws.timeslots.map(ts => (
          <label key={ts} className="flex items-center mb-2 cursor-pointer">
            <input
              type="radio"
              name="slot"
              className="mr-2"
              checked={slot === ts}
              onChange={() => setSlot(ts)}
            />
            {ts}
          </label>
        ))}
      </div>

      {/* ───────────── Error list ───────────── */}
      {errors.length > 0 && (
        <ul className="mb-4 text-error list-disc pl-6">
          {errors.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      {/* ───────────── Nav buttons ───────────── */}
      <div className="flex justify-between gap-4">
        <Button
          onClick={() => router.push('/academy/workshops/register/step3')}
          className="btn"
        >
          Back
        </Button>
        <Button onClick={handleNext} className="btn">
          Next
        </Button>
      </div>
    </StepContainer>
  );
}