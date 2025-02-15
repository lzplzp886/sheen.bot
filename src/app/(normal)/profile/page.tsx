// src/app/profile/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import getCurrentUser from "@/lib/getCurrentUser";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import Image from "next/image";
import Button from "@/components/Button";

/**
 * A simple Profile page.
 * - Shows user info from context (username, role).
 * - Fetches extra attributes (avatar / email / first name / last name) from Cognito if needed.
 * - Lets the user change password (requires oldPass + newPass).
 * - Lets the user update user attributes (e.g., avatar URL).
 */
export default function ProfilePage() {
  const router = useRouter();
  const { username: globalUsername, role, loading } = useUser();
  const [attributes, setAttributes] = useState<Record<string, string>>({});
  const [avatarUrl, setAvatarUrl] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");

  // For change password form
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePassMsg, setChangePassMsg] = useState("");

  // Loading states for buttons
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // If user not logged in, or still loading
  useEffect(() => {
    if (!loading && !globalUsername) {
      router.replace("/");
    }
  }, [loading, globalUsername, router]);

  // Once mounted, fetch user attributes from Cognito
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
          // Convert attributes into a key-value object
          const map: Record<string, string> = {};
          for (const a of attrs) {
            map[a.getName()] = a.getValue();
          }
          setAttributes(map);

          // If the user has a custom "picture" attribute, use it; otherwise, remain blank
          if (map["picture"]) {
            setAvatarUrl(map["picture"]);
          }
        });
      } catch (error) {
        console.error("getCurrentUser error:", error);
      }
    })();
  }, []);

  // Update user attributes, e.g. avatar URL
  const handleUpdateProfile = async () => {
    setUpdateMsg("");
    setIsUpdatingProfile(true);
    try {
      const sessionResult = await getCurrentUser();
      if (!sessionResult) {
        setUpdateMsg("No logged in user found.");
        setIsUpdatingProfile(false);
        return;
      }
      const { cognitoUser } = sessionResult;
      const attrList = [
        new CognitoUserAttribute({
          Name: "picture",
          Value: avatarUrl,
        }),
      ];
      cognitoUser.updateAttributes(attrList, (err, result) => {
        setIsUpdatingProfile(false);
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
      setIsUpdatingProfile(false);
    }
  };

  // Change password for a logged-in user
  const handleChangePassword = async () => {
    setChangePassMsg("");

    // Pre-check if fields are empty
    if (!oldPassword || !newPassword) {
      setChangePassMsg("Please fill in both old and new password fields.");
      return;
    }

    setIsChangingPassword(true);
    try {
      const sessionResult = await getCurrentUser();
      if (!sessionResult) {
        setChangePassMsg("No logged in user found.");
        setIsChangingPassword(false);
        return;
      }
      const { cognitoUser } = sessionResult;
      // Change password using provided old and new passwords
      cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
        setIsChangingPassword(false);
        if (err) {
          console.error("Change password error:", err);
          setChangePassMsg(err.message || "Failed to change password");
        } else {
          console.log("Change password success:", result);
          setChangePassMsg("Password changed successfully!");
          // Delay a bit so Chrome can catch the new credentials and then reload the page
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      });
    } catch (err) {
      console.error("Change password failed:", err);
      setChangePassMsg("Change password failed. Possibly not logged in?");
      setIsChangingPassword(false);
    }
  };

  if (loading) {
    return <div className="p-5 text-center">Loading user session...</div>;
  }
  if (!globalUsername) {
    return null;
  }

  // Use the default avatar if none is set
  const finalAvatarUrl = avatarUrl || "/images/profile/avatar.svg";

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      {/* BASIC INFO */}
      <div className="mb-4 p-5 rounded-lg shadow-md">
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
        <div className="mt-2">
          <label className="block mb-1">Avatar URL:</label>
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="input-style w-full"
          />

          {/* Always display an avatar image. If no URL is provided, default to /profile/avatar.svg */}
          <div className="mt-2">
            <Image
              src={finalAvatarUrl}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full border"
              width={96}
              height={96}
            />
          </div>

          <Button
            onClick={handleUpdateProfile}
            className="mt-2 hover:scale-105 transition-transform duration-200 ease-in-out"
            isLoading={isUpdatingProfile}
            loadingText="Updating..."
          >
            Update Profile
          </Button>
          {updateMsg && <p className="mt-1 text-sm">{updateMsg}</p>}
        </div>
      </div>

      {/* CHANGE PASSWORD */}
      <div className="mb-4 p-5 rounded-lg shadow-md">
        <h2 className="font-semibold mb-2">Change Password</h2>
        <form
          autoComplete="on"
          onSubmit={(e) => {
            e.preventDefault();
            handleChangePassword();
          }}
        >
          {/* Hidden username field to help browsers associate the new password */}
          <input
            type="hidden"
            name="username"
            value={globalUsername}
            autoComplete="username"
          />
          <label className="block">Old Password:</label>
          <input
            type="password"
            className="input-style w-full mb-2"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="current-password"
          />
          <label className="block">New Password:</label>
          <input
            type="password"
            className="input-style w-full mb-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <Button
            type="submit"
            className="hover:scale-105 transition-transform duration-200 ease-in-out"
            isLoading={isChangingPassword}
            loadingText="Changing..."
          >
            Change Password
          </Button>
        </form>
        {changePassMsg && <p className="mt-1 text-sm">{changePassMsg}</p>}
      </div>
    </div>
  );
}
