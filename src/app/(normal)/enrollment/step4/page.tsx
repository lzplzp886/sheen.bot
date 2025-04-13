// src/app/(normal)/enrollment/step4/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import Button from "@/components/Button";

const ALL_SLOTS = [
  { day: "Tuesday", times: ["11:00-12:00 AM", "3:00-4:00 PM", "4:30-5:30 PM"] },
  { day: "Wednesday", times: ["11:00-12:00 AM", "3:00-4:00 PM", "4:30-5:30 PM"] },
  { day: "Thursday", times: ["11:00-12:00 AM", "3:00-4:00 PM", "4:30-5:30 PM"] },
  { day: "Friday", times: ["11:00-12:00 AM", "3:00-4:00 PM", "4:30-5:30 PM"] },
  { day: "Saturday", times: ["9:30-10:30 AM", "11:00-12:00 AM"] },
];

export default function Step4() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  const handleToggle = (slotLabel: string) => {
    setData((prev) => {
      let selected = [...prev.selectedTimeslots];
      if (selected.includes(slotLabel)) {
        selected = selected.filter((s) => s !== slotLabel);
      } else {
        selected.push(slotLabel);
      }
      return { ...prev, selectedTimeslots: selected };
    });
  };

  const handleNext = () => {
    // 没有限制多选上限，但至少选1个？
    if (data.selectedTimeslots.length === 0) {
      alert("Please choose at least one timeslot.");
      return;
    }
    router.push("/enrollment/step5");
  };
  const handleBack = () => {
    router.push("/enrollment/step3");
  };

  return (
    <div className="p-5 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Section 4: Class Schedule
      </h1>
      <p className="mb-6 text-center">
        Please choose your child&rsquo;s preferred day and time for class.
        <br />
        Note: one class per week, but you may indicate multiple possible slots.
      </p>

      <table className="w-full border mb-6">
        <thead className="border-b">
          <tr>
            <th className="py-2 px-2 text-left">Day</th>
            <th className="py-2 px-2 text-left">Time Slots</th>
          </tr>
        </thead>
        <tbody>
          {ALL_SLOTS.map((slot) => (
            <tr key={slot.day} className="border-b">
              <td className="py-2 px-2 font-semibold">{slot.day}</td>
              <td className="py-2 px-2">
                {slot.times.map((t) => {
                  const label = `${slot.day} ${t}`;
                  const checked = data.selectedTimeslots.includes(label);
                  return (
                    <label key={t} className="mr-4 inline-flex items-center">
                      <input
                        type="checkbox"
                        className="mr-1"
                        checked={checked}
                        onChange={() => handleToggle(label)}
                      />
                      {t}
                    </label>
                  );
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
