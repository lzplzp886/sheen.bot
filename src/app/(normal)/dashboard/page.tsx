// src/app/dashboard/page.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/context/ProtectedRoute';
import { useUser } from '@/context/UserContext';
import { roleTiles, UserRole } from '@/app/(normal)/dashboard/roleTiles';
import Tile from '@/components/Tile';

export default function Dashboard() {
  const router = useRouter();
  const { role } = useUser();

  // Cast role to UserRole if needed (or adjust your context type accordingly)
  const currentRole = role as UserRole | undefined;
  const tiles = currentRole ? roleTiles[currentRole] : [];

  const handleTileClick = (path: string) => {
    router.push(path);
  };

  return (
    <ProtectedRoute allowedRoles={['student', 'teacher', 'parent', 'admin']}>
      <div className="p-5 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {currentRole
            ? `${currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Dashboard`
            : 'Dashboard'}
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
