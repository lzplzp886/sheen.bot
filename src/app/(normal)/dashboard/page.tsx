// src/app/dashboard/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/context/ProtectedRoute";
import { routeRoles } from "@/config/routeRoles";
import { useUser } from "@/context/UserContext";
// 从统一的 dashboardTileConfig 中读取根页面 tile 信息
import { dashboardTileConfig, RoleTile } from "@/config/dashboardTileConfig";
import Tile from "@/components/Tile";

export default function Dashboard() {
  const router = useRouter();
  const { role } = useUser();

  // 假设角色为 "student" | "teacher" | "parent" | "admin"
  const currentRole = role as "student" | "teacher" | "parent" | "admin" | undefined;

  // 根据 dashboardTileConfig 与 routeRoles 过滤出当前角色允许访问的 tile
  const tiles: RoleTile[] = currentRole
    ? Object.keys(dashboardTileConfig)
        .filter((routeKey) => {
          const allowedRoles = routeRoles[routeKey];
          return allowedRoles && allowedRoles.includes(currentRole);
        })
        .map((routeKey) => dashboardTileConfig[routeKey])
    : [];

  const handleTileClick = (path: string) => {
    router.push(path);
  };

  return (
    <ProtectedRoute allowedRoles={routeRoles.dashboard}>
      <div className="p-5 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {currentRole
            ? `${currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Dashboard`
            : "Dashboard"}
        </h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tiles.map((tile) => (
            <Tile
              key={tile.title}
              title={tile.title}
              icon={tile.icon}
              onClick={() => handleTileClick(tile.path)}
            />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
