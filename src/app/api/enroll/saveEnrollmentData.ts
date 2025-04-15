// src/app/api/enroll/saveEnrollmentData.ts

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import type { FormDataType } from "./type";

// 初始化 DynamoDB 客户端
const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export async function saveEnrollmentData(formData: FormDataType) {
  // 使用 uuid 为每条记录生成一个唯一 ID
  const recordId = uuidv4();
  const params = {
    TableName: "Enrollments", // 你在 AWS 上创建的表名
    Item: {
      id: recordId,
      ...formData,
      createdAt: new Date().toISOString(),
    },
  };

  try {
    await ddbDocClient.send(new PutCommand(params));
    console.log("Enrollment data saved with id:", recordId);
    return recordId;
  } catch (error) {
    console.error("Error saving enrollment data:", error);
    throw error;
  }
}
