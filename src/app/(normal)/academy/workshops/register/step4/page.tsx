// src/app/(normal)/academy/workshops/register/step4/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardContext } from '../context';
import StepContainer from '../stepContainer';
import Button from '@/components/Button';
import { WORKSHOPS } from '../constants';

export default function Step4() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  /* 当前已选 Workshop 对象（找不到则默认第一条） */
  const ws =
    WORKSHOPS.find(w => w.code === data.selectedWorkshop) ?? WORKSHOPS[0];

  /* 🔹Hooks 必须放顶层，始终调用 */
  const [week, setWeek]     = useState(data.selectedDateRange);
  const [slot, setSlot]     = useState(data.selectedTimeslot);
  const [errors, setErrors] = useState<string[]>([]);

  /* ───── 如果已售罄，直接提示并禁止继续 ───── */
  if (ws.soldOut) {
    return (
      <StepContainer>
        <h1 className="text-2xl font-bold mb-6 text-center">
          Step&nbsp;4&nbsp;:&nbsp;Workshop Schedule
        </h1>

        <p className="text-center mb-8">
          Sorry, <strong>{ws.name}</strong> is fully booked.
        </p>

        <div className="flex justify-center">
          <Button
            onClick={() => router.push('/academy/workshops/register/step2')}
            className="btn"
          >
            Choose Another Workshop
          </Button>
        </div>
      </StepContainer>
    );
  }

  /* ───── 正常可选流程 ───── */
  const handleNext = () => {
    const err: string[] = [];
    if (!week) err.push('Please select a date range.');
    if (!slot) err.push('Please select a time slot.');
    if (err.length) return setErrors(err);

    setData(prev => ({
      ...prev,
      selectedDateRange: week,
      selectedTimeslot:  slot,
      selectedTimeslots: [`${week} ${slot}`],
    }));
    router.push('/academy/workshops/register/step5');
  };

  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 4: Workshop Schedule
      </h1>

      {/* recap */}
      <p className="mb-6 text-center">
        <strong>Selected Workshop:</strong>&nbsp;{ws.name}
      </p>

      {/* date range */}
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

      {/* time slot */}
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

      {/* errors */}
      {errors.length > 0 && (
        <ul className="mb-4 text-error list-disc pl-6">
          {errors.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      {/* nav */}
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
