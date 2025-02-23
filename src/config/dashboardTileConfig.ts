export interface RoleTile {
    title: string;
    path: string;
    icon: string; // 图标文件路径
  }
  
  // 这里定义的只包括根页面（不包括子页面如 canvas、onboarding 等）
  export const dashboardTileConfig: Record<string, RoleTile> = {
    coding: { title: "Coding", path: "/onboarding", icon: "/images/dashboard/coding.svg" },
    iot: { title: "IoT", path: "/iot", icon: "/images/dashboard/iot.svg" },
    builder: { title: "Builder", path: "/builder", icon: "/images/dashboard/builder.svg" },
    training: { title: "Training", path: "/training", icon: "/images/dashboard/training.svg" },
    subscription: { title: "Subscription", path: "/subscription", icon: "/images/dashboard/subscription.svg" },
    bookings: { title: "Bookings", path: "/bookings", icon: "/images/dashboard/bookings.svg" },
    class: { title: "Class", path: "/class", icon: "/images/dashboard/class.svg" },
    profile: { title: "My Profile", path: "/profile", icon: "/images/dashboard/profile.svg" },
  };
  