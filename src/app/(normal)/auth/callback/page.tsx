// src/app/(normal)/auth/callback/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import {
  CognitoUser,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUserSession,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import userPool from "@/lib/cognitoClient";
import Button from "@/components/Button";
// 更新引用路径
import CountryCodeSelect from "@/app/(normal)/login/components/CountryCodeSelect";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { setRole, setFirstName, setUsername } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 当 custom:role 或 phone_number缺失时，需要用户补全信息
  const [needsSupplement, setNeedsSupplement] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<"student" | "parent" | "teacher" | "admin">("student");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // 新增电话号码相关状态
  const [countryCode, setCountryCode] = useState<string>("+27");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // 保存当前 CognitoUser 对象
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);

  // 电话号码归一化函数：去除首位 0 后添加国家码
  const normalizePhoneNumber = (number: string, code: string): string => {
    const normalized = number.startsWith("0") ? number.substring(1) : number;
    return `${code}${normalized}`;
  };

  useEffect(() => {
    console.log("Current URL hash:", window.location.hash);
    const processAuth = async () => {
      const hash = window.location.hash;
      if (hash && hash.includes("id_token") && hash.includes("access_token")) {
        console.log("Token info from URL:", hash);
        const parsedData = queryString.parse(hash);
        const idTokenStr = parsedData.id_token as string;
        const accessTokenStr = parsedData.access_token as string;
        const refreshTokenStr = (parsedData.refresh_token as string) || "";
        if (!idTokenStr || !accessTokenStr) {
          console.error("Missing tokens in URL hash");
          router.replace("/login");
          return;
        }
        const idToken = new CognitoIdToken({ IdToken: idTokenStr });
        const accessToken = new CognitoAccessToken({ AccessToken: accessTokenStr });
        const refreshToken = new CognitoRefreshToken({ RefreshToken: refreshTokenStr });
        const session = new CognitoUserSession({
          IdToken: idToken,
          AccessToken: accessToken,
          RefreshToken: refreshToken,
        });
        // 初始使用 token 中的 sub 作为用户名
        const username = (idToken.payload["sub"] as string) || "GoogleUser";
        const user = new CognitoUser({
          Username: username,
          Pool: userPool,
          Storage: window.localStorage,
        });
        user.setSignInUserSession(session);
        setCognitoUser(user);
        user.getUserAttributes(
          (err: Error | null | undefined, attrs: CognitoUserAttribute[] | undefined) => {
            if (err || !attrs) {
              console.error("Error retrieving user attributes:", err);
              router.replace("/login");
              return;
            }
            console.log("AuthCallback - Retrieved attributes:", attrs);
            const roleAttr = attrs.find((attr) => attr.getName() === "custom:role");
            const givenNameAttr = attrs.find((attr) => attr.getName() === "given_name");
            const phoneAttr = attrs.find((attr) => attr.getName() === "phone_number");
            if (givenNameAttr && givenNameAttr.getValue()) {
              setFirstName(givenNameAttr.getValue());
              setUsername(givenNameAttr.getValue());
            } else {
              setFirstName(null);
              setUsername(username);
            }
            // 如果 custom:role 或 phone_number 缺失，则要求用户补充
            if (!roleAttr?.getValue() || !phoneAttr?.getValue()) {
              setNeedsSupplement(true);
            } else {
              setRole(roleAttr.getValue());
              router.replace("/dashboard");
            }
            setIsLoading(false);
          }
        );
      } else {
        // 处理从 localStorage 中获取用户会话的情况
        const user = userPool.getCurrentUser();
        if (user) {
          user.getSession((err: Error | null, session: CognitoUserSession | null) => {
            if (err || !session) {
              router.replace("/login");
              return;
            }
            user.getUserAttributes(
              (err: Error | null | undefined, attrs: CognitoUserAttribute[] | undefined) => {
                if (err || !attrs) {
                  router.replace("/login");
                  return;
                }
                const roleAttr = attrs.find((attr) => attr.getName() === "custom:role");
                const givenNameAttr = attrs.find((attr) => attr.getName() === "given_name");
                const phoneAttr = attrs.find((attr) => attr.getName() === "phone_number");
                if (givenNameAttr && givenNameAttr.getValue()) {
                  setFirstName(givenNameAttr.getValue());
                  setUsername(givenNameAttr.getValue());
                }
                if (!roleAttr?.getValue() || !phoneAttr?.getValue()) {
                  setNeedsSupplement(true);
                } else {
                  setRole(roleAttr.getValue());
                  router.replace("/dashboard");
                }
                setIsLoading(false);
              }
            );
          });
          setCognitoUser(user);
        } else {
          router.replace("/login");
        }
      }
    };

    processAuth();
  }, [router, setRole, setFirstName, setUsername]);

  const handleSupplementSubmit = () => {
    if (!selectedRole) {
      setErrorMsg("Please select your role.");
      return;
    }
    if (!phoneNumber) {
      setErrorMsg("Please enter your phone number.");
      return;
    }
    if (!cognitoUser) {
      setErrorMsg("User session not found. Please log in again.");
      router.replace("/login");
      return;
    }
    const normalizedPhone = normalizePhoneNumber(phoneNumber, countryCode);
    const attributes = [
      { Name: "custom:role", Value: selectedRole },
      { Name: "phone_number", Value: normalizedPhone },
    ];
    cognitoUser.updateAttributes(
      attributes,
      (err: Error | null | undefined, result: string | undefined) => {
        if (err) {
          console.error("Failed to update attributes:", err);
          setErrorMsg(err.message || "Update failed. Please try again.");
        } else {
          console.log("Attributes updated successfully:", result);
          setRole(selectedRole);
          router.replace("/dashboard");
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Processing login...</p>
      </div>
    );
  }

  if (needsSupplement) {
    return (
      <div className="mt-4 p-4 max-w-md mx-auto text-left rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
        <p className="mb-4">Please select your role and enter your phone number to complete registration.</p>
        <div className="mb-3">
          <label className="block mb-1">I am a:</label>
          <select
            value={selectedRole}
            onChange={(e) =>
              setSelectedRole(e.target.value as "student" | "parent" | "teacher" | "admin")
            }
            className="select-style"
          >
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1">Phone Number:</label>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <CountryCodeSelect value={countryCode} onChange={setCountryCode} />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="input-style"
            />
          </div>
        </div>
        {errorMsg && <p className="text-error mb-3">{errorMsg}</p>}
        <Button type="button" onClick={handleSupplementSubmit} className="btn">
          Submit
        </Button>
      </div>
    );
  }

  return null;
}
