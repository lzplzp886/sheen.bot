// src/app/profile/BasicProfileInfo.tsx

"use client";

import React from "react";

interface BasicProfileInfoProps {
  attributes: Record<string, string>;
  globalUsername: string;
  role: string | null;
  updateMsg: string;
  finalAvatarUrl: string;
  onAvatarClick: () => void;
}

const BasicProfileInfo: React.FC<BasicProfileInfoProps> = ({
  attributes,
  globalUsername,
  role,
  updateMsg,
  finalAvatarUrl,
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
      {/* 右侧：头像，悬停时高亮显示并显示编辑图标 */}
      <div
        className="relative cursor-pointer"
        onClick={onAvatarClick}
        title="Click to change avatar"
      >
        <img
          src={finalAvatarUrl}
          alt="Avatar Preview"
          className="w-24 h-24 rounded-full border transition-transform duration-200 ease-in-out hover:scale-105"
          width={96}
          height={96}
        />
        {/* 编辑图标，显示在头像右下角 */}
        <div className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536M4 13.5V20h6.5l9.586-9.586a2 2 0 00-2.828-2.828L4 13.5z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BasicProfileInfo;
