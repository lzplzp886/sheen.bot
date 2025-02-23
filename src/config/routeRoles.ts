// src/config/routeRoles.ts

/** 
 * 定义一个记录路由 => 角色数组 的映射。
 * Key 可以是路由名（如 builder, bookings, subscription），
 * Value 则是该路由允许访问的角色列表。
 */
export const routeRoles: Record<string, string[]> = {
    // General access for everyone
    dashboard: ["student", "teacher", "parent", "admin"],
    profile: ["student", "teacher", "parent", "admin"],

    // Coding & learning related functions
    builder: ["student", "teacher"],
    coding: ["student", "teacher"],
      // Sub page for Coding
      canvas: ["student", "teacher"],
      onboarding: ["student", "teacher"],
    iot: ["student", "teacher"],
    training: ["student", "teacher"],
    
    // Management related functions
    subscription: ["parent", "admin"],
    class: ["student", "teacher", "parent", "admin"],
    bookings: ["student", "teacher", "parent", "admin"],
  };
  