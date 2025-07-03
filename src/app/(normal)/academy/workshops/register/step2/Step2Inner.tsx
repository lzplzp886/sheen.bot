// src/app/(normal)/academy/workshops/register/step2/Step2Inner.tsx

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWizardContext } from '../context';
import StepContainer from '../stepContainer';
import Button from '@/components/Button';
import { WORKSHOPS } from '../constants';

export default function Step2Inner() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { data, setData } = useWizardContext();

  const qsId = searchParams.get('id');

  /* 1️⃣ 只显示命中的 workshop，否则显示全部 */
  const visibleWS = useMemo(() => {
    const hit = WORKSHOPS.find(w => w.code === qsId);
    return hit ? [hit] : WORKSHOPS;
  }, [qsId]);

  /* 2️⃣ 当前选中的 code */
  const [selected, setSelected] = useState(() => {
    // 优先：URL → context → 列表首项
    return qsId && WORKSHOPS.some(w => w.code === qsId)
      ? qsId
      : data.selectedWorkshop || visibleWS[0].code;
  });

  /* 若搜索串改变且合法，自动同步选中 */
  useEffect(() => {
    if (qsId && WORKSHOPS.some(w => w.code === qsId)) setSelected(qsId);
  }, [qsId]);

  /* 3️⃣ 保存并前往 Step 3 */
  const handleNext = () => {
    setData(prev => ({
      ...prev,
      selectedWorkshop: selected,
      selectedDateRange: '',
      selectedTimeslot: '',
      selectedTimeslots: [],
    }));
    router.push('/academy/workshops/register/step3');
  };

  /* ───────────── UI ───────────── */
  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Step&nbsp;2&nbsp;:&nbsp;Choose a Workshop
      </h1>

      <div className="space-y-4 mb-8 text-center">
        {visibleWS.map(ws => (
          <label key={ws.code} className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="ws"
              className="accent-primary"
              checked={selected === ws.code}
              onChange={() => setSelected(ws.code)}
            />
            {ws.name}
          </label>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext} className="btn">
          Next
        </Button>
      </div>
    </StepContainer>
  );
}