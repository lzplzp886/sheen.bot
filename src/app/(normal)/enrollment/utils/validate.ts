// src/app/(normal)/enrollment/utils/validate.ts

export const emailOK  = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const phoneOK  = (v: string) => /^\d{8,15}$/.test(v);
export const nz       = (v: unknown) => {
  if (v === null || v === undefined) return false;
  return Array.isArray(v) ? v.length > 0 : `${v}`.trim() !== "";
};