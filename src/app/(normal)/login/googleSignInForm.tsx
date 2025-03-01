// src/app/login/googleSignInForm.tsx

import React from 'react'
import Image from 'next/image'

interface GoogleSignInFormProps {
  onGoogleSignIn: () => void
}

export default function GoogleSignInForm({ onGoogleSignIn }: GoogleSignInFormProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-4">Click the button below to sign in with Google.</p>
      <button onClick={onGoogleSignIn} className="flex justify-center items-center">
        <Image
          src="/images/login/Google-Sign-in.png"
          alt="Sign in with Google"
          width={175}
          height={40}
          className="cursor-pointer"
        />
      </button>
    </div>
  )
}
