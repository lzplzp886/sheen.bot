// src/app/(normal)/sheenbotInfinity/components/tileExpand.tsx

import React, { useState } from "react";
import Image from "next/image";

interface TileExpandProps {
  icon: string;
  alt: string;
  title: string;
  description: string;
  videoSrc: string;
}

export default function TileExpand({
  icon,
  alt,
  title,
  description,
  videoSrc,
}: TileExpandProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition"
      >
        <Image src={icon} alt={alt} width={50} height={50} className="mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      {isOpen && (
        <div className="mt-4">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-lg shadow"
          />
        </div>
      )}
    </div>
  );
}
