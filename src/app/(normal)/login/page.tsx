// src/app/(normal)/login/page.tsx

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import GoogleSignInForm from "@/app/(normal)/login/googleSignInForm";

export default function LoginPage() {
  const router = useRouter();

  // 全局用户上下文：如果用户已登录则重定向到 dashboard
  const { username: globalUsername, loading } = useUser();

  // 如果已登录，则重定向到 Dashboard
  useEffect(() => {
    if (!loading && globalUsername) {
      router.replace("/dashboard");
    }
  }, [loading, globalUsername, router]);

  // Google 登录处理
  const handleGoogleSignIn = () => {
    const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    // 回调地址配置为 /auth/callback 页面，后续该页面会解析 token 并更新全局状态
    const redirectUri = window.location.origin + "/auth/callback";
    window.location.href = `${domain}/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&identity_provider=Google`;
  };

  // 如果全局状态 loading
  if (loading) {
    return (
      <div className="p-5 text-center">
        <h2 className="text-base font-semibold">Checking session...</h2>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Account Login</h1>
      
      {/* 仅保留 Google 登录 */}
      <div className="border border-light rounded-lg p-5 shadow bg-white">
        <GoogleSignInForm onGoogleSignIn={handleGoogleSignIn} />
      </div>
    </div>
  );
}
