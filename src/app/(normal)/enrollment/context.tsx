// src/app/(normal)/enrollment/context.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// 定义每个孩子的信息结构
export interface ChildInfo {
  firstName: string;
  surname: string;
  age: number | null;
  gender: string; // "Male"/"Female"/"Other"...
  schoolName: string;
  grade: string; // "Grade R"~"Grade 12" or "Out of School"
  medicalConditions: string;
  allergies: string;
}

// 定义整个表单数据结构
interface EnrollmentData {
  referralCode: string;         // Section 1
  children: ChildInfo[];        // Section 2
  confirmedAgeGroups: string[]; // Section 3
  selectedTimeslots: string[];  // Section 4

  // (以下是家长信息) Section 5
  parentCountryCode: string;    // 新增：家长的国家区号，如 "27"
  parentContactNumber: string;  // 原始数字，不含区号
  parentFirstName: string;
  parentSurname: string;
  parentRelationship: string;
  parentEmail: string;
  preferredContactMethod: string;
  subscribeNewsletter: string;

  // (以下是紧急联系人) Section 6
  emergencyCountryCode: string;    // 新增：紧急联系人区号
  emergencyContactNumber: string;  // 原始数字
  emergencyFirstName: string;
  emergencySurname: string;
  emergencyRelationship: string;

  // (以下是授权联系人1) Section 7
  pickup1CountryCode: string;    // 新增
  pickup1ContactNumber: string;  // 原始数字
  pickup1FirstName: string;
  pickup1Surname: string;
  pickup1Relationship: string;

  // (以下是授权联系人2) Section 7
  pickup2CountryCode: string;    // 新增
  pickup2ContactNumber: string;  // 原始数字
  pickup2FirstName: string;
  pickup2Surname: string;
  pickup2Relationship: string;

  // Step8
  consentConfirmed: boolean;    // 8.1
  popiaConfirmed: boolean;      // 8.2

  // Step9
  signatureData: string;
}

// 初始值
const initialData: EnrollmentData = {
  referralCode: "",
  children: [],
  confirmedAgeGroups: [],
  selectedTimeslots: [],

  // 家长信息（step5）
  parentCountryCode: "27",   // 默认南非区号
  parentContactNumber: "",
  parentFirstName: "",
  parentSurname: "",
  parentRelationship: "",
  parentEmail: "",
  preferredContactMethod: "",
  subscribeNewsletter: "",

  // 紧急联系人（step6）
  emergencyCountryCode: "27",
  emergencyContactNumber: "",
  emergencyFirstName: "",
  emergencySurname: "",
  emergencyRelationship: "",

  // 授权联系人1（step7）
  pickup1CountryCode: "27",
  pickup1ContactNumber: "",
  pickup1FirstName: "",
  pickup1Surname: "",
  pickup1Relationship: "",

  // 授权联系人2（step7）
  pickup2CountryCode: "27",
  pickup2ContactNumber: "",
  pickup2FirstName: "",
  pickup2Surname: "",
  pickup2Relationship: "",

  // step8
  consentConfirmed: false,
  popiaConfirmed: false,

  // step9
  signatureData: "",
};

interface WizardContextProps {
  data: EnrollmentData;
  setData: React.Dispatch<React.SetStateAction<EnrollmentData>>;
}

const WizardContext = createContext<WizardContextProps | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<EnrollmentData>(initialData);

  return (
    <WizardContext.Provider value={{ data, setData }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizardContext() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizardContext must be used within WizardProvider");
  }
  return context;
}
