// src/app/profile/ChangePasswordForm.tsx

"use client";

import React from "react";
import Button from "@/components/Button";

interface ChangePasswordFormProps {
  oldPassword: string;
  newPassword: string;
  changePassMsg: string;
  isChangingPassword: boolean;
  setOldPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  onChangePassword: () => void;
  globalUsername: string;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  oldPassword,
  newPassword,
  changePassMsg,
  isChangingPassword,
  setOldPassword,
  setNewPassword,
  onChangePassword,
  globalUsername,
}) => {
  return (
    <div className="mb-4 p-5 rounded-lg shadow-md">
      <h2 className="font-semibold mb-2">Change Password</h2>
      <form
        autoComplete="on"
        onSubmit={(e) => {
          e.preventDefault();
          onChangePassword();
        }}
      >
        {/* Let browser to capture updated password */}
        <input
          type="hidden"
          name="username"
          value={globalUsername}
          autoComplete="username"
        />
        <label className="block">Old Password:</label>
        <input
          type="password"
          className="input-style w-full mb-2"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label className="block">New Password:</label>
        <input
          type="password"
          className="input-style w-full mb-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
        />
        <Button
          type="submit"
          className="hover:scale-105 transition-transform duration-200 ease-in-out"
          isLoading={isChangingPassword}
          loadingText="Changing..."
        >
          Change Password
        </Button>
      </form>
      {changePassMsg && <p className="mt-1 text-sm">{changePassMsg}</p>}
    </div>
  );
};

export default ChangePasswordForm;
