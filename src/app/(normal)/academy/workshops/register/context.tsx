// src/app/(normal)/academy/workshops/register/context.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

/** ---------- Types (unchanged) ---------- */
export interface ChildInfo {
  firstName: string;
  surname: string;
  age: number | null;
  gender: string;
  schoolName?: string;
  grade?: string;
  medicalConditions?: string;
  allergies?: string;
}

export interface EnrollmentData {
  referralCode: string;
  children: ChildInfo[];
  confirmedAgeGroups: string[];
  selectedTimeslots: string[];
  selectedWorkshop: string;
  selectedDateRange: string;
  selectedTimeslot: string;

  // Section 5
  parentCountryCode: string;
  parentContactNumber: string;
  parentFirstName: string;
  parentSurname: string;
  parentRelationship: string;
  parentEmail: string;
  preferredContactMethods: string[];
  subscribeNewsletter: string;

  // Section 6
  emergencyCountryCode: string;
  emergencyContactNumber: string;
  emergencyFirstName: string;
  emergencySurname: string;
  emergencyRelationship: string;

  // Section 7 (pickup 1)
  pickup1CountryCode: string;
  pickup1ContactNumber: string;
  pickup1FirstName: string;
  pickup1Surname: string;
  pickup1Relationship: string;

  // Section 7 (pickup 2)
  pickup2CountryCode: string;
  pickup2ContactNumber: string;
  pickup2FirstName: string;
  pickup2Surname: string;
  pickup2Relationship: string;

  // Step8
  consentConfirmed: boolean;
  popiaConfirmed: boolean;

  // Step9
  signatureData: string;
}

/** ---------- Initial data (unchanged) ---------- */
const initialData: EnrollmentData = {
  referralCode: "",
  children: [{ firstName: "", surname: "", age: null, gender: "" }],
  confirmedAgeGroups: [],
  selectedTimeslots: [],
  selectedWorkshop: "",
  selectedDateRange: "",
  selectedTimeslot: "",

  parentCountryCode: "27",
  parentContactNumber: "",
  parentFirstName: "",
  parentSurname: "",
  parentRelationship: "",
  parentEmail: "",
  preferredContactMethods: [],
  subscribeNewsletter: "",

  emergencyCountryCode: "27",
  emergencyContactNumber: "",
  emergencyFirstName: "",
  emergencySurname: "",
  emergencyRelationship: "",

  pickup1CountryCode: "27",
  pickup1ContactNumber: "",
  pickup1FirstName: "",
  pickup1Surname: "",
  pickup1Relationship: "",

  pickup2CountryCode: "27",
  pickup2ContactNumber: "",
  pickup2FirstName: "",
  pickup2Surname: "",
  pickup2Relationship: "",

  consentConfirmed: false,
  popiaConfirmed: false,

  signatureData: "",
};

/** ---------- Session snapshot bridge (new) ---------- */
// Namespaced, versioned key to avoid collisions with other payment modules
export const WIZARD_SNAPSHOT_KEY = "wsr.enrollment.v1";

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isEnrollmentDataLike(v: unknown): v is EnrollmentData {
  if (!isObject(v)) return false;

  const r = v as Record<string, unknown>;

  const childrenOk =
    Array.isArray(r["children"]) &&
    r["children"].every((c) => {
      if (!isObject(c)) return false;
      const rc = c as Record<string, unknown>;
      const firstOk = typeof rc["firstName"] === "string";
      const lastOk = typeof rc["surname"] === "string";
      // age/gender 等字段就算缺失也不影响快照判定
      return firstOk && lastOk;
    });

  const parentFirstOk = typeof r["parentFirstName"] === "string";
  const signatureOk = typeof r["signatureData"] === "string";

  return childrenOk && parentFirstOk && signatureOk;
}

export function readWizardSnapshot(): EnrollmentData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(WIZARD_SNAPSHOT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isEnrollmentDataLike(parsed) ? (parsed as EnrollmentData) : null;
  } catch {
    return null;
  }
}

export function writeWizardSnapshot(data: EnrollmentData) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(WIZARD_SNAPSHOT_KEY, JSON.stringify(data));
  } catch {
    // ignore quota errors etc.
  }
}

export function clearWizardSnapshot() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(WIZARD_SNAPSHOT_KEY);
  } catch {
    // ignore
  }
}

/** ---------- Context API (unchanged) ---------- */
interface WizardContextProps {
  data: EnrollmentData;
  setData: React.Dispatch<React.SetStateAction<EnrollmentData>>;
}

const WizardContext = createContext<WizardContextProps | undefined>(undefined);

/**
 * WizardProvider now:
 * 1) lazily initializes from session snapshot if present;
 * 2) auto-persists to sessionStorage on every change.
 */
export function WizardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<EnrollmentData>(() => {
    // Lazy init so it runs once on first client render
    if (typeof window !== "undefined") {
      const snap = readWizardSnapshot();
      if (snap) return snap;
    }
    return initialData;
  });

  // Auto-persist on change
  useEffect(() => {
    writeWizardSnapshot(data);
  }, [data]);

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
