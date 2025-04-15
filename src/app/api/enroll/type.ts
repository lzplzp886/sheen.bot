// src/app/api/enroll/types.ts

export interface ChildInfo {
    firstName?: string;
    surname?: string;
    age?: number;
    grade?: string;
    schoolName?: string; // 学校名称
    medicalConditions?: string;
    allergies?: string;
    gender?: string;
  }
  
  export interface FormDataType {
    referralCode?: string;
    children?: ChildInfo[];
    parentFirstName?: string;
    parentSurname?: string;
    parentContactNumber?: string;
    parentEmail?: string;
    parentRelationship?: string;
    emergencyFirstName?: string;
    emergencySurname?: string;
    emergencyContactNumber?: string;
    emergencyRelationship?: string;
    pickup1FirstName?: string;
    pickup1Surname?: string;
    pickup1ContactNumber?: string;
    pickup1Relationship?: string;
    pickup2FirstName?: string;
    pickup2Surname?: string;
    pickup2ContactNumber?: string;
    pickup2Relationship?: string;
    consentConfirmed?: boolean;
    popiaConfirmed?: boolean;
    signatureData?: string;
    selectedTimeslots?: string[];
    preferredContactMethod?: string;
    subscribeNewsletter?: string;
  }
  