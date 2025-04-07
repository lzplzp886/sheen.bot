// src/app/(normal)/profile/page.tsx

"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import getCurrentUser from "@/lib/getCurrentUser";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import BasicProfileInfo from "@/app/(normal)/profile/BasicProfileInfo";
import ChangePasswordForm from "@/app/(normal)/profile/ChangePasswordForm";
import AvatarUploader from "@/app/(normal)/profile/avatarUploader";
import Button from "@/components/Button";

export default function ProfilePage() {
  const router = useRouter();
  const { username: globalUsername, role, loading } = useUser();
  // 本页单独维护一个 attributes 状态，用于存储从 Cognito 获取的详细属性
  const [attributes, setAttributes] = useState<Record<string, string>>({});
  const [updateMsg, setUpdateMsg] = useState("");

  // For change password form
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePassMsg, setChangePassMsg] = useState("");

  // 控制头像上传弹窗的显示
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // 使用 useRef 保存防抖定时器 ID
  const updateDebounceTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!loading && !globalUsername) {
      router.replace("/");
    }
  }, [loading, globalUsername, router]);

  useEffect(() => {
    (async () => {
      try {
        const sessionResult = await getCurrentUser();
        if (!sessionResult) return;
        const { cognitoUser } = sessionResult;
        cognitoUser.getUserAttributes((err, attrs) => {
          if (err || !attrs) {
            console.error("Failed to get user attributes:", err);
            return;
          }
          const map: Record<string, string> = {};
          for (const a of attrs) {
            map[a.getName()] = a.getValue();
          }
          setAttributes(map);
        });
      } catch (error) {
        console.error("getCurrentUser error:", error);
      }
    })();
  }, []);

  // 当头像上传完成后更新 attributes 中的 picture 属性，并更新 Cognito（防抖处理）
  const onAvatarUploadComplete = (url: string) => {
    setAttributes(prev => ({ ...prev, picture: url }));
    if (updateDebounceTimer.current) {
      clearTimeout(updateDebounceTimer.current);
    }
    updateDebounceTimer.current = window.setTimeout(() => {
      handleUpdateProfile(url);
      setShowAvatarModal(false);
    }, 1000);
  };

  // 更新 Cognito 中的 picture 属性（传入新头像 URL）
  const handleUpdateProfile = async (newUrl?: string) => {
    setUpdateMsg("");
    try {
      const sessionResult = await getCurrentUser();
      if (!sessionResult) {
        setUpdateMsg("No logged in user found.");
        return;
      }
      const { cognitoUser } = sessionResult;
      const attrList = [
        new CognitoUserAttribute({
          Name: "picture",
          Value: newUrl || (attributes.picture || ""),
        }),
      ];
      cognitoUser.updateAttributes(attrList, (err, result) => {
        if (err) {
          console.error("updateAttributes error:", err);
          setUpdateMsg(err.message || "Update failed");
        } else {
          console.log("updateAttributes success:", result);
          setUpdateMsg("Profile updated successfully!");
        }
      });
    } catch (err) {
      console.error("Update failed:", err);
      setUpdateMsg("Update failed or user not found.");
    }
  };

  const handleChangePassword = async () => {
    setChangePassMsg("");
    if (!oldPassword || !newPassword) {
      setChangePassMsg("Please fill in both old and new password fields.");
      return;
    }
    try {
      const sessionResult = await getCurrentUser();
      if (!sessionResult) {
        setChangePassMsg("No logged in user found.");
        return;
      }
      const { cognitoUser } = sessionResult;
      cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
        if (err) {
          console.error("Change password error:", err);
          setChangePassMsg(err.message || "Failed to change password");
        } else {
          console.log("Change password success:", result);
          setChangePassMsg("Password changed successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      });
    } catch (err) {
      console.error("Change password failed:", err);
      setChangePassMsg("Change password failed. Possibly not logged in?");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading user session...</p>
      </div>
    );
  }
  
  if (!globalUsername) {
    return null;
  }

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <BasicProfileInfo
        attributes={attributes}
        globalUsername={globalUsername}
        role={role}
        updateMsg={updateMsg}
        onAvatarClick={() => setShowAvatarModal(true)}
      />
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl mb-4">Crop and Upload Avatar</h2>
            <AvatarUploader onUploadComplete={onAvatarUploadComplete} />
            <Button
              onClick={() => setShowAvatarModal(false)}
              className="mt-4 hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      <ChangePasswordForm
        oldPassword={oldPassword}
        newPassword={newPassword}
        changePassMsg={changePassMsg}
        isChangingPassword={false}
        setOldPassword={setOldPassword}
        setNewPassword={setNewPassword}
        onChangePassword={handleChangePassword}
        globalUsername={globalUsername}
      />
    </div>
  );
}
