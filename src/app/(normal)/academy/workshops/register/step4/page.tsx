// src/app/(normal)/academy/workshops/register/step4/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardContext } from '../context';
import Button from '@/components/Button';
import StepContainer from '../stepContainer';
import Modal from '../components/modal';

/* ──────────────────────────  数据源 ────────────────────────── */
const WORKSHOPS = [
  {
    name: 'Spark Curiosity This School Holiday!',
    weeks: [
      { label: 'Week 3: 15 – 17 July 2025', value: 'Week 3: 15 - 17 July 2025' },
    ],
    timeslots: [
      {
        label: 'Morning: 10:00 AM – 1:30 PM',
        value: 'Morning: 10:00 AM - 1:30 PM',
      },
    ],
  },
];

export default function Step4() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  const [selectedWorkshop, setSelectedWorkshop] = useState(
    data.selectedWorkshop || WORKSHOPS[0].name,
  );
  const [selectedWeek, setSelectedWeek] = useState(data.selectedDateRange || '');
  const [selectedTimeslot, setSelectedTimeslot] = useState(
    data.selectedTimeslot || '',
  );

  /* 错误与 Modal 控制 */
  const [errors, setErrors] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  /* —— 校验 —— */
  const validate = (): string[] => {
    const e: string[] = [];
    if (!selectedWeek) e.push('Please choose a date range.');
    if (!selectedTimeslot) e.push('Please choose a time slot.');
    return e;
  };

  /* —— 导航 —— */
  const handleNext = () => {
    const list = validate();
    if (list.length) {
      setErrors(list);
      setShowModal(true);
      return;
    }

    setData((prev) => ({
      ...prev,
      selectedWorkshop,
      selectedDateRange: selectedWeek,
      selectedTimeslot,
      selectedTimeslots: [`${selectedWeek} ${selectedTimeslot}`], // legacy array
    }));

    router.push('/academy/workshops/register/step5');
  };

  const handleBack = () => router.back();

  /* ──────────────────────────  UI ────────────────────────── */
  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step&nbsp;4:&nbsp;Workshop&nbsp;Schedule
      </h1>

      <p className="mb-6 text-center max-w-2xl">
        Select the week and time that suit you best. <br />
        One workshop runs for <strong>3 consecutive mornings</strong>. Only one
        slot may be chosen.
      </p>

      {/* Workshop 下拉——预留可扩展性 */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Workshop</label>
        <select
          className="input-style w-full"
          value={selectedWorkshop}
          onChange={(e) => {
            setSelectedWorkshop(e.target.value);
            setSelectedWeek(''); // 重新选择 Workshop 时重置日期
          }}
        >
          {WORKSHOPS.map((ws) => (
            <option key={ws.name}>{ws.name}</option>
          ))}
        </select>
      </div>

      {/* 日期单选（radio） */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Date&nbsp;Range</label>
        {WORKSHOPS.find((w) => w.name === selectedWorkshop)!.weeks.map((wk) => (
          <label key={wk.value} className="mr-6 inline-flex items-center">
            <input
              type="radio"
              name="week"
              className="mr-2"
              checked={selectedWeek === wk.value}
              onChange={() => setSelectedWeek(wk.value)}
            />
            {wk.label}
          </label>
        ))}
      </div>

      {/* 时间单选（radio） */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Time&nbsp;Slot</label>
        {WORKSHOPS[0].timeslots.map((ts) => (
          <label key={ts.value} className="mr-6 inline-flex items-center">
            <input
              type="radio"
              name="slot"
              className="mr-2"
              checked={selectedTimeslot === ts.value}
              onChange={() => setSelectedTimeslot(ts.value)}
            />
            {ts.label}
          </label>
        ))}
      </div>

      {/* 行内错误（若不弹弹窗时备用） */}
      {errors.length > 0 && (
        <div className="text-sm text-error mb-4">
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

      {/* modal 弹窗错误列表 */}
      {showModal && (
        <Modal title="Please fix the following" onClose={() => setShowModal(false)}>
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
