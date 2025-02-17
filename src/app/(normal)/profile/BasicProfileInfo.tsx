// src/app/profile/BasicProfileInfo.tsx

"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/Button";

interface BasicProfileInfoProps {
  attributes: Record<string, string>;
  globalUsername: string;
  role: string | null;
  updateMsg: string;
  finalAvatarUrl: string;
  isUpdatingProfile: boolean;
  onUpdateProfile: () => void;
}

const BasicProfileInfo: React.FC<BasicProfileInfoProps> = ({
  attributes,
  globalUsername,
  role,
  updateMsg,
  finalAvatarUrl,
  isUpdatingProfile,
  onUpdateProfile,
}) => {
  return (
    <div className="mb-4 p-5 rounded-lg shadow-md flex items-start justify-between">
      
      {/* Basic User Info */}
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
        <Button
          onClick={onUpdateProfile}
          className="mt-2 hover:scale-105 transition-transform duration-200 ease-in-out"
          isLoading={isUpdatingProfile}
          loadingText="Updating..."
        >
          Update Profile
        </Button>
        {updateMsg && <p className="mt-1 text-sm">{updateMsg}</p>}
      </div>
      
      {/* Avatar */}
      <div>
        <Image
          src={finalAvatarUrl}
          alt="Avatar Preview"
          className="w-24 h-24 rounded-full border"
          width={96}
          height={96}
        />
      </div>
    </div>
  );
};

export default BasicProfileInfo;
