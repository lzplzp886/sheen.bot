// src/app/(normal)/academy/enrollment/utils/validate.ts

export const emailOK = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const phoneOK = (v: string) => /^\d{8,15}$/.test(v);

/** non-zero: 既判断字符串/数组非空，也判数字等基本类型 */
export const nz = (v: unknown): boolean => {
  if (v === null || v === undefined) return false;
  if (Array.isArray(v)) return v.length > 0;
  return String(v).trim() !== "";        // ← 关键修正
};
