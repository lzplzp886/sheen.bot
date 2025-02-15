// src/app/dashboard/roleTiles.ts

export type UserRole = "student" | "teacher" | "parent" | "admin";

export interface RoleTile {
  title: string;
  path: string;
  icon: string; // Path to the icon file
}

export const roleTiles: Record<UserRole, RoleTile[]> = {
  student: [
    { title: "My Profile", path: "/profile", icon: "/images/dashboard/profile.svg" },
    { title: "Coding", path: "/onboarding", icon: "/images/dashboard/coding.svg" },
    { title: "Builder", path: "/builder", icon: "/images/dashboard/builder.svg" },
    { title: "IoT", path: "/iot", icon: "/images/dashboard/iot.svg" },
    { title: "Training", path: "/training", icon: "/images/dashboard/training.svg" },
  ],
  parent: [
    { title: "My Profile", path: "/profile", icon: "/images/dashboard/profile.svg" },
    { title: "Training", path: "/training", icon: "/images/dashboard/training.svg" },
    { title: "Progress", path: "/progress", icon: "/images/dashboard/progress.svg" },
    { title: "Subscription", path: "/subscription", icon: "/images/dashboard/subscription.svg" },
    { title: "Bookings", path: "/bookings", icon: "/images/dashboard/bookings.svg" },
  ],
  teacher: [
    { title: "My Profile", path: "/profile", icon: "/images/dashboard/profile.svg" },
    { title: "Training", path: "/training", icon: "/images/dashboard/training.svg" },
    { title: "Progress", path: "/progress", icon: "/images/dashboard/progress.svg" },
    { title: "Bookings", path: "/bookings", icon: "/images/dashboard/bookings.svg" },
  ],
  admin: [
    { title: "My Profile", path: "/profile", icon: "/images/dashboard/profile.svg" },
    { title: "Class", path: "/class", icon: "/images/dashboard/class.svg" },
    { title: "Bookings", path: "/bookings", icon: "/images/dashboard/bookings.svg" },
    { title: "Subscription", path: "/subscription", icon: "/images/dashboard/subscription.svg" },
  ],
};
