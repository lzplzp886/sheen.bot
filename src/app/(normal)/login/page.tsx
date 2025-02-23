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

  // Global user context: if user is already logged in, skip the login page.
  const { username: globalUsername, role, loading, setUsername, setRole } = useUser();

  // Local state for the login form
  const [formUserInput, setFormUserInput] = useState("");
  const [formPassword, setFormPassword] = useState("");

  // Additional UI states
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReset, setShowReset] = useState(false);

  // 支持 Google 登录：构造托管 UI 登录 URL
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

  // 本地登录表单提交处理
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
      onSuccess: (session) => {
        console.log("Login success!", session);
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
    <div className="p-5 text-center">
      {!showReset ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Account Login</h1>
          {/* 本地登录模块 */}
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              marginBottom: "20px",
            }}
          >
            <form onSubmit={handleLogin} className="max-w-md mx-auto text-left" autoComplete="on">
              {/* 隐藏 username 字段，帮助密码管理器关联 */}
              <input type="hidden" name="username" value={formUserInput} autoComplete="username" />
              <div className="mb-3">
                <label>Username or Email:</label>
                <input
                  type="text"
                  value={formUserInput}
                  onChange={(e) => setFormUserInput(e.target.value)}
                  className="input-style"
                  autoComplete="username"
                />
              </div>
              <div className="mb-3">
                <label>Password:</label>
                <input
                  type="password"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  className="input-style"
                  autoComplete="current-password"
                />
              </div>
              {error && <p className="text-error mb-3">{error}</p>}
              <div className="space-x-2 inline-block">
                <Button type="submit" className="btn" isLoading={isProcessing} loadingText="Logging in...">
                  Log In
                </Button>
                <button type="button" onClick={() => setShowReset(true)}>
                  Forgot password?
                </button>
              </div>
            </form>
          </div>

          {/* 分隔文本 "or" */}
          <p className="my-4 text-center font-semibold text-body">or</p>

          {/* Google 登录模块 */}
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <Image
              src="/images/Google-Sign-in.png"
              alt="Sign in with Google"
              width={175}
              height={40}
              style={{ cursor: "pointer", maxWidth: "100%", height: "auto" }}
              onClick={handleGoogleSignIn}
            />
          </div>
        </>
      ) : (
        <>
          <h1>Reset Password</h1>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <ResetPassword onResetComplete={() => setShowReset(false)} />
          </div>
        </>
      )}
    </div>
  );
}
