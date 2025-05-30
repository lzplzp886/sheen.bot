// src/app/(normal)/login/emailSignInForm.tsx

import React from 'react';
import Button from '@/components/Button';

interface EmailSignInFormProps {
  formUserInput: string
  setFormUserInput: (val: string) => void
  formPassword: string
  setFormPassword: (val: string) => void
  error: string
  isProcessing: boolean
  onSubmit: (e: React.FormEvent) => void
  onRegister: () => void
  onForgotPassword: () => void
}

export default function EmailSignInForm({
  formUserInput,
  setFormUserInput,
  formPassword,
  setFormPassword,
  error,
  isProcessing,
  onSubmit,
  onRegister,
  onForgotPassword,
}: EmailSignInFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4" autoComplete="on">
      <input type="hidden" name="username" value={formUserInput} autoComplete="username" />
      <div>
        <label className="block mb-1">Username or Email:</label>
        <input
          type="text"
          value={formUserInput}
          onChange={(e) => setFormUserInput(e.target.value)}
          className="w-full border border-light rounded p-2"
          autoComplete="username"
        />
      </div>
      <div>
        <label className="block mb-1">Password:</label>
        <input
          type="password"
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
          className="w-full border border-light rounded p-2"
          autoComplete="current-password"
        />
      </div>
      {error && <p className="text-error">{error}</p>}
      <div className="flex space-x-2">
        <Button type="submit" className="flex-1" isLoading={isProcessing} loadingText="Logging in...">
          Log In
        </Button>
        <button
          type="button"
          onClick={onRegister}
          className="flex-1 bg-primary text-background font-semibold shadow-md px-3 py-2 rounded-lg transition duration-300 hover:bg-secondary hover:text-background ease-in-out"
        >
          Register
        </button>
      </div>
      <div className="mt-2 text-center">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-body underline"
        >
          Forgot password?
        </button>
      </div>
    </form>
  )
}
