// src/app/(normal)/profile/avatarUploader.tsx

"use client";

import React, { useState, useCallback } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "@/components/Button";
import getCurrentUser from "@/lib/getCurrentUser";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

interface AvatarUploaderProps {
  // Callback to inform parent that uploading is done, with the final avatar URL
  onUploadComplete: (avatarUrl: string) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ onUploadComplete }) => {
  // Store the uploaded image’s data URL
  const [upImg, setUpImg] = useState<string | null>(null);

  // Store the current crop settings
  const [crop, setCrop] = useState<Crop & { aspect: number }>({
    unit: "%",
    width: 50,
    aspect: 1,
    x: 0,
    y: 0,
    height: 0,
  });

  // Store the final crop after user finishes adjusting
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  // Whether we’re in the middle of uploading
  const [isUploading, setIsUploading] = useState(false);

  // A success/failure message to show
  const [uploadMsg, setUploadMsg] = useState("");

  // Handle file selection
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result as string));
      reader.readAsDataURL(file);
    }
  };

  // Called once the <img> itself has finished loading
  const onImageLoad = useCallback(() => {
    // 这里如果需要在图片加载完成后做额外处理，可以在这里添加逻辑
    return true;
  }, []);

  // Called whenever the user finishes a crop gesture (drag end)
  const onCropComplete = useCallback((newCrop: Crop) => {
    setCompletedCrop(newCrop);
  }, []);

  // Called whenever the crop is changing (drag in progress)
  const onCropChange = (newCrop: Crop) => {
    // 保留之前的 aspect 值，确保裁剪比例保持一致
    setCrop((prevCrop) => ({ ...newCrop, aspect: prevCrop.aspect }));
  };

  // Convert the cropped image area to a PNG Blob
  const getCroppedImg = async (): Promise<Blob | null> => {
    if (!upImg || !completedCrop?.width || !completedCrop?.height) return null;
    const image = new Image();
    image.src = upImg;
    await new Promise<void>((resolve) => {
      image.onload = () => resolve();
    });

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(
      image,
      completedCrop.x! * scaleX,
      completedCrop.y! * scaleY,
      completedCrop.width! * scaleX,
      completedCrop.height! * scaleY,
      0,
      0,
      completedCrop.width!,
      completedCrop.height!
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          resolve(blob);
        },
        "image/png"
      );
    });
  };

  const handleUpload = async () => {
    setUploadMsg("");
    setIsUploading(true);

    try {
      const croppedBlob = await getCroppedImg();
      if (!croppedBlob) {
        setUploadMsg("Failed to crop image.");
        setIsUploading(false);
        return;
      }

      // 请求预签名 URL
      const res = await fetch("/api/profile/upload-avatar");
      if (!res.ok) {
        throw new Error("Failed to get presigned URL");
      }
      const data = await res.json();
      const { url, key } = data;

      // 通过预签名 URL 上传文件到 S3
      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "image/png",
        },
        body: croppedBlob,
      });
      if (!uploadRes.ok) {
        throw new Error("Failed to upload file to S3");
      }

      // 构造最终头像 URL（假设 S3 桶为公开访问或有 CloudFront 分发）
      const finalAvatarUrl = `https://${process.env.NEXT_PUBLIC_AWS_AVATAR_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;

      setUploadMsg("Upload successful!");

      // 自动更新 Cognito 中的 "picture" 属性
      try {
        const sessionResult = await getCurrentUser();
        if (sessionResult) {
          const { cognitoUser } = sessionResult;
          cognitoUser.updateAttributes(
            [new CognitoUserAttribute({ Name: "picture", Value: finalAvatarUrl })],
            (err, result) => {
              if (err) {
                console.error("Update picture attribute error:", err);
              } else {
                console.log("Update picture attribute success:", result);
              }
            }
          );
        }
      } catch (updateError) {
        console.error("Error updating picture attribute:", updateError);
      }

      onUploadComplete(finalAvatarUrl);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadMsg("Upload error.");
    }
    setIsUploading(false);
  };

  return (
    <div className="my-4">
      <input type="file" accept="image/*" onChange={onSelectFile} />

      {upImg && (
        <ReactCrop
          crop={crop}
          onChange={onCropChange}
          onComplete={onCropComplete}
          circularCrop
        >
          <img 
            src={upImg} 
            alt="Avatar to crop" 
            onLoad={onImageLoad} 
          />
        </ReactCrop>
      )}

      {completedCrop && (
        <div className="mt-2">
          <Button
            onClick={handleUpload}
            isLoading={isUploading}
            loadingText="Uploading..."
            className="hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Upload Avatar
          </Button>
        </div>
      )}

      {uploadMsg && <p className="mt-2 text-sm">{uploadMsg}</p>}
    </div>
  );
};

export default AvatarUploader;