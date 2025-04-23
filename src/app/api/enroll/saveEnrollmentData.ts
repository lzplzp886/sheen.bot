// src/app/api/enroll/saveEnrollmentData.ts

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import type { FormDataType } from "./type";

// 1. 初始化 DynamoDB 客户端
const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

// 2. 保存报名数据，并返回生成的 enrollmentID
export async function saveEnrollmentData(formData: FormDataType): Promise<string> {
  // 2.1 生成唯一 enrollmentID
  const enrollmentID = uuidv4();
  // 2.2 创建一个 ISO 格式的时间戳（UTC）
  const createdAt = new Date().toISOString();

  const params = {
    TableName: "sheen.bot-enrollment",   // 确保和 DynamoDB 表名完全一致
    Item: {
      enrollmentID,                     // **表的分区键**，必须和表定义中的 AttributeName 对应
      ...formData,                      // 用户提交的所有字段
      createdAt,                        // 记录创建时间
    },
  };

  try {
    await ddbDocClient.send(new PutCommand(params));
    console.log("Enrollment data saved with enrollmentID:", enrollmentID);
    return enrollmentID;
  } catch (error) {
    console.error("Error saving enrollment data:", error);
    throw error;
  }
}
