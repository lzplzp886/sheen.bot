// src/app/login/page.tsx

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
import ResetPassword from "@/app/(normal)/login/login_ResetPassword";
import Button from "@/components/Button";
import Image from "next/image";

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
  const [showReset, setShowReset] = useState(false);

  // 当前使用的登录方式：email 或 google，默认使用 email
  const [activeTab, setActiveTab] = useState<"email" | "google">("email");

  // Google 登录处理：构造托管 UI 登录 URL
  const handleGoogleSignIn = () => {
    const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    // 回调地址配置为 /auth/callback 页面，后续该页面会解析 token 并更新全局状态
    const redirectUri = window.location.origin + "/auth/callback";
    window.location.href = `${domain}/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&identity_provider=Google`;
  };

  // 如果已登录，则重定向到 Dashboard
  useEffect(() => {
    if (!loading && globalUsername) {
      router.replace("/dashboard");
    }
  }, [loading, globalUsername, role, router]);

  // Email 登录表单提交处理
  const handleLogin = (e: React.FormEvent) => {
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

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Account Login</h1>

      {/* Tab 区域 */}
      <div className="w-full">
        <div className="flex">
          <button
            className={`flex-1 px-4 py-2 rounded-tl-lg border border-light border-b-0 transition-colors duration-300 ${
              activeTab === "email" ? "bg-body" : "bg-light"
            }`}
            onClick={() => setActiveTab("email")}
          >
            <div className="flex justify-center items-center">
              <Image src="/images/login/email-sign-in.svg" alt="Email" width={24} height={24} />
            </div>
          </button>
          <button
            className={`flex-1 px-4 py-2 rounded-tr-lg border border-light border-b-0 transition-colors duration-300 ${
              activeTab === "google" ? "bg-body" : "bg-light"
            }`}
            onClick={() => setActiveTab("google")}
          >
            <div className="flex justify-center items-center">
              <Image src="/images/login/google-sign-in.svg" alt="Google" width={24} height={24} />
            </div>
          </button>
        </div>

        {/* 表单区域（仅下部圆角） */}
        <div className="border border-light rounded-b-lg p-5 shadow">
          {activeTab === "email" && (
            <form onSubmit={handleLogin} className="space-y-4" autoComplete="on">
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
                  onClick={() => router.push("/registration")}
                  className="flex-1 bg-primary text-background font-semibold shadow-md px-3 py-2 rounded-lg transition duration-300 hover:bg-secondary hover:text-background ease-in-out"
                >
                  Register
                </button>
              </div>
              <div className="mt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="text-body underline"
                >
                  Forgot password?
                </button>
              </div>
            </form>
          )}

          {activeTab === "google" && (
            <div className="flex flex-col items-center">
              <p className="mb-4">Click the button below to sign in with Google.</p>
              <button onClick={handleGoogleSignIn} className="flex justify-center items-center">
                <Image
                  src="/images/login/Google-Sign-in.png"
                  alt="Sign in with Google"
                  width={175}
                  height={40}
                  className="cursor-pointer"
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 重置密码区域 */}
      {showReset && (
        <div className="mt-4 border border-light rounded-lg p-5 shadow">
          <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>
          <ResetPassword onResetComplete={() => setShowReset(false)} />
        </div>
      )}
    </div>
  );
}
