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
  // 记录在Section 3里选择/确认的年龄段之类...
  confirmedAgeGroups: string[]; // e.g. ["6-8", "9-11", "12+"]
  selectedTimeslots: string[];  // Section 4
  parentFirstName: string;      // Section 5
  parentSurname: string;
  parentRelationship: string;
  parentContactNumber: string;  // 需结合 reg_CountryCodeSelect.tsx
  parentEmail: string;
  preferredContactMethod: string;
  subscribeNewsletter: string;  // "Yes" / "No"
  emergencyFirstName: string;   // Section 6
  emergencySurname: string;
  emergencyRelationship: string;
  emergencyContactNumber: string;
  pickup1FirstName: string;     // Section 7
  pickup1Surname: string;
  pickup1ContactNumber: string;
  pickup1Relationship: string;
  pickup2FirstName: string;
  pickup2Surname: string;
  pickup2ContactNumber: string;
  pickup2Relationship: string;
  consentConfirmed: boolean;    // Section 8.1
  popiaConfirmed: boolean;      // Section 8.2
  signatureData: string;        // Section 9
}

// 初始值
const initialData: EnrollmentData = {
  referralCode: "",
  children: [],
  confirmedAgeGroups: [],
  selectedTimeslots: [],
  parentFirstName: "",
  parentSurname: "",
  parentRelationship: "",
  parentContactNumber: "",
  parentEmail: "",
  preferredContactMethod: "",
  subscribeNewsletter: "",
  emergencyFirstName: "",
  emergencySurname: "",
  emergencyRelationship: "",
  emergencyContactNumber: "",
  pickup1FirstName: "",
  pickup1Surname: "",
  pickup1ContactNumber: "",
  pickup1Relationship: "",
  pickup2FirstName: "",
  pickup2Surname: "",
  pickup2ContactNumber: "",
  pickup2Relationship: "",
  consentConfirmed: false,
  popiaConfirmed: false,
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
