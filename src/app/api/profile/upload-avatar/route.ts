// app/api/profile/upload-avatar/route.ts

import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const REGION = process.env.AWS_REGION;
const BUCKET_NAME = process.env.AWS_AVATAR_BUCKET;

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  const fileName = `avatars/${Date.now()}-${Math.random().toString(36).substring(2)}.png`;
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    ContentType: "image/png",
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return NextResponse.json({ url, key: fileName });
  } catch (err) {
    console.error("Error generating signed URL:", err);
    return NextResponse.json({ message: "Error generating signed URL" }, { status: 500 });
  }
}
