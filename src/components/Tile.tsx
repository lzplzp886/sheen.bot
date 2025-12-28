// src/components/Tile.tsx

'use client';
import React from 'react';
import Image from 'next/image';

interface TileProps {
  title: string;
  onClick: () => void;
  icon: string;
}

const Tile: React.FC<TileProps> = ({ title, onClick, icon }) => {
  return (
    <div
      onClick={onClick}
      className="large-button-style cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out flex flex-col items-center justify-center"
    >
      <Image 
        src={icon} 
        alt={title} 
        width={48} 
        height={48} 
        className="w-12 h-12 mb-4" 
      />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
};

export default Tile;
