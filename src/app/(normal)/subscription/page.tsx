"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/context/ProtectedRoute";
import { routeRoles } from "@/config/routeRoles";

export default function SubscriptionPage() {
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [classType, setClassType] = useState("");
  const [paymentType, setPaymentType] = useState<"once_off" | "recurring">("once_off");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Send form data to our API route to generate a PayFast transaction
    const res = await fetch("/api/payfast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parentName,
        childName,
        classType,
        paymentType,
      }),
    });

    const { payfastUrl } = await res.json();

    // Redirect user to PayFast
    window.location.href = payfastUrl;
  };

  return (
    <ProtectedRoute allowedRoles={routeRoles.subscription}>
      <div className="p-5 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Enroll in Sheen Robotics Class</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Parent Name</label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              required
              className="input-style w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Child Name</label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              required
              className="input-style w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Class Type</label>
            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              required
              className="select-style w-full"
            >
              <option value="">Select Class</option>
              <option value="Beginner">Beginner</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Payment Type</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value as "once_off" | "recurring")}
              className="select-style w-full"
            >
              <option value="once_off">Once Off</option>
              <option value="recurring">Recurring</option>
            </select>
          </div>
          <button type="submit" className="btn mt-2">
            Proceed to PayFast
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
