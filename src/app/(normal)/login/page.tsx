// src/app/(normal)/login/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import userPool from "@/lib/cognitoClient";
import { useUser } from "@/context/UserContext";
import LoginTabs from "@/app/(normal)/login/loginTabs";
import EmailSignInForm from "@/app/(normal)/login/emailSignInForm";
import GoogleSignInForm from "@/app/(normal)/login/googleSignInForm";

export default function LoginPage() {
  const router = useRouter();

  // 全局用户上下文：如果用户已登录则重定向到 dashboard
  const { username: globalUsername, role, loading, setUsername, setRole } = useUser();

  // Email 登录表单状态
  const [formUserInput, setFormUserInput] = useState("");
  const [formPassword, setFormPassword] = useState("");

  // 其他 UI 状态
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // 当前使用的登录方式：email 或 google
  const [activeTab, setActiveTab] = useState<"email" | "google">("email");

  // 如果已登录，则重定向到 Dashboard
  useEffect(() => {
    if (!loading && globalUsername) {
      router.replace("/dashboard");
    }
  }, [loading, globalUsername, role, router]);

  // Google 登录处理
  const handleGoogleSignIn = () => {
    const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    // 回调地址配置为 /auth/callback 页面，后续该页面会解析 token 并更新全局状态
    const redirectUri = window.location.origin + "/auth/callback";
    window.location.href = `${domain}/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&identity_provider=Google`;
  };

  // Email 登录提交处理
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formUserInput || !formPassword) {
      setError("Please enter username (or email) and password.");
      return;
    }

    setIsProcessing(true);

    const authDetails = new AuthenticationDetails({
      Username: formUserInput,
      Password: formPassword,
    });

    const cognitoUser = new CognitoUser({
      Username: formUserInput,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (_session) => {
        console.log("Login success!", _session);
        // 获取用户属性
        cognitoUser.getUserAttributes((attrErr, attrs: CognitoUserAttribute[] | undefined) => {
          setIsProcessing(false);
          if (attrErr || !attrs) {
            console.warn("No attributes found, using fallback username.");
            setUsername(cognitoUser.getUsername());
            setTimeout(() => {
              router.push("/dashboard");
            }, 500);
            return;
          }
          let finalName = cognitoUser.getUsername();
          let finalRole = "";
          for (const a of attrs) {
            if (a.getName() === "preferred_username") {
              finalName = a.getValue();
            }
            if (a.getName() === "custom:role") {
              finalRole = a.getValue();
            }
          }
          setUsername(finalName);
          setRole(finalRole);
          setTimeout(() => {
            router.push("/dashboard");
          }, 500);
        });
      },
      onFailure: (authErr) => {
        console.error("Login error:", authErr);
        setIsProcessing(false);
        setError(authErr.message || "Login failed. Please try again.");
      },
    });
  };

  // 跳转到注册页
  const handleRegister = () => {
    router.push("/registration");
  };

  // 跳转到忘记密码页
  const handleForgotPassword = () => {
    router.push("/login/forgot");
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

      {/* Tabs：选择 Email 或 Google 登录 */}
      <div className="w-full">
        <LoginTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* 表单区域（仅下部圆角） */}
        <div className="border border-light rounded-b-lg p-5 shadow">
          {/* Email 登录 */}
          <div className={activeTab === "email" ? "block" : "hidden"}>
            <EmailSignInForm
              formUserInput={formUserInput}
              setFormUserInput={setFormUserInput}
              formPassword={formPassword}
              setFormPassword={setFormPassword}
              error={error}
              isProcessing={isProcessing}
              onSubmit={handleEmailSubmit}
              onRegister={handleRegister}
              onForgotPassword={handleForgotPassword}
            />
          </div>

          {/* Google 登录 */}
          <div className={activeTab === "google" ? "block" : "hidden"}>
            <GoogleSignInForm onGoogleSignIn={handleGoogleSignIn} />
          </div>
        </div>
      </div>
    </div>
  );
}
