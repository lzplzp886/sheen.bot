// src/app/(normal)/login/forgot/page.tsx

"use client";

import React, { useState } from "react";
import ResetPassword from "@/app/(normal)/login/forgot/login_ResetPassword"

export default function ForgotPasswordPage() {
  const [done, setDone] = useState(false);

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>
      {!done ? (
        <ResetPassword onResetComplete={() => setDone(true)} />
      ) : (
        <p className="text-green-600 text-center mt-4">
          Your password has been reset successfully.
        </p>
      )}
    </div>
  );
}
