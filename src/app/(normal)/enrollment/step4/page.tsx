// src/app/(normal)/enrollment/step4/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardContext } from "../context";
import Button from "@/components/Button";
import StepContainer from "../stepContainer";
import Modal from "../components/modal";

const ALL_SLOTS = [
  { day: "Monday",    times: ["Academy Closed"] },
  { day: "Tuesday",   times: ["11:00-12:00 AM", "3:00-4:00 PM", "4:30-5:30 PM"] },
  { day: "Wednesday", times: ["11:00-12:00 AM", "3:00-4:00 PM", "4:30-5:30 PM"] },
  { day: "Thursday",  times: ["11:00-12:00 AM", "3:00-4:00 PM", "4:30-5:30 PM"] },
  { day: "Friday",    times: ["11:00-12:00 AM", "3:00-4:00 PM", "4:30-5:30 PM"] },
  { day: "Saturday",  times: ["9:30-10:30 AM", "11:00-12:00 AM"] },
  { day: "Sunday",    times: ["Academy Closed"] },
];

export default function Step4() {
  const router = useRouter();
  const { data, setData } = useWizardContext();

  const [errors, setErrors]     = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  /* toggle checkbox */
  const handleToggle = (label: string) => {
    setData(prev => {
      const selected = prev.selectedTimeslots.includes(label)
        ? prev.selectedTimeslots.filter(s => s !== label)
        : [...prev.selectedTimeslots, label];
      return { ...prev, selectedTimeslots: selected };
    });
  };

  /* validation – must pick ≥1 slot */
  const validate = () =>
    data.selectedTimeslots.length ? [] : ["Please choose at least one time slot."];

  const handleNext = () => {
    const list = validate();
    if (list.length) {
      setErrors(list);
      setShowModal(true);
      return;
    }
    router.push("/enrollment/step5");
  };

  const handleBack = () => router.push("/enrollment/step3");

  /* ──────────────────────────  UI  ────────────────────────── */
  return (
    <StepContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 4: Class Schedule
      </h1>
      <p className="mb-6 text-center max-w-2xl">
        Please choose your child&rsquo;s preferred day and time for class.
        <br />
        Note: You may indicate multiple possible slots, but we will communicate with you and fix one slot per week for your child.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border mb-6">
          <thead className="border-b">
            <tr>
              <th className="py-2 px-2 text-left">Day</th>
              <th className="py-2 px-2 text-left">Time Slots</th>
            </tr>
          </thead>
          <tbody>
            {ALL_SLOTS.map(slot => (
              <tr key={slot.day} className="border-b">
                <td className="py-2 px-2 font-semibold">{slot.day}</td>
                <td className="py-2 px-2">
                  {slot.times.map(t => {
                    if (t === "Academy Closed")
                      return (
                        <span key={t} className="text-sm text-gray-500">
                          {t}
                        </span>
                      );

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
      </div>

      {/* inline error list */}
      {errors.length > 0 && (
        <div className="text-sm text-red-600 mb-4">
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

      {/* modal popup */}
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
