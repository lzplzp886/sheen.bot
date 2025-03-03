// src/app/profile/BasicProfileInfo.tsx

"use client";

import React from "react";
import Avatar from "@/components/Avatar";

interface BasicProfileInfoProps {
  attributes: Record<string, string>;
  globalUsername: string;
  role: string | null;
  updateMsg: string;
  onAvatarClick: () => void;
}

const BasicProfileInfo: React.FC<BasicProfileInfoProps> = ({
  attributes,
  globalUsername,
  role,
  updateMsg,
  onAvatarClick,
}) => {
  return (
    <div className="mb-4 p-5 rounded-lg shadow-md flex items-start justify-between">
      {/* 左侧：基本信息 */}
      <div className="mr-4">
        <p>
          <strong>First Name:</strong> {attributes["given_name"] || "Loading"}
        </p>
        <p>
          <strong>Last Name:</strong> {attributes["family_name"] || "Loading"}
        </p>
        <p>
          <strong>Username:</strong> {globalUsername || "Loading"}
        </p>
        <p>
          <strong>Role:</strong> {role || "Loading"}
        </p>
        <p>
          <strong>Email:</strong> {attributes["email"] || "Loading"}
        </p>
        {updateMsg && <p className="mt-1 text-sm">{updateMsg}</p>}
      </div>
      {/* 右侧：头像，点击头像触发 onAvatarClick */}
      <div
        className="cursor-pointer"
        onClick={onAvatarClick}
        title="Click to change avatar"
      >
        <Avatar size={96} edit onClick={onAvatarClick} />
      </div>
    </div>
  );
};

export default BasicProfileInfo;
