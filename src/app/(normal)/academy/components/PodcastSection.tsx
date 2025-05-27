// src/app/(normal)/academy/components/PodcastSection.tsx

'use client';

import React from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';

export default function PodcastSection() {
  return (
    <section className="max-w-5xl mx-auto pt-8 px-4">
      <div className="rounded-md shadow-md p-6 md:p-8 space-y-6">
        {/* Header: Image + Title */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src="/images/academy/Podcast/Radio786.png"
            alt="Sheenbot Radio Interview"
            width={160}
            height={160}
            className="rounded-lg object-contain w-[120px] h-[120px] md:w-[160px] md:h-[160px]"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">
              radio 786: Education Beyond 94 with Bafo
            </h2>
            <p className="text-darklight text-sm leading-relaxed">
              Join Bafo Nathan Yoti, educator at Sheen Academy, live in studio on Radio 786. In this enlightening segment of “Education Beyond 94,” Bafo discusses the vital role of coding and robotics in South Africa’s 4IR transformation—how these disciplines foster computational thinking, drive career opportunities across diverse fields, and empower youth to become creators rather than mere end users.
            </p>
          </div>
        </div>

        {/* Audio Player */}
        <div className="overflow-hidden">
          <ReactPlayer
            url="/content/media/060525-Education-beyond-94-Sheen-Academy-Bafo-Nathan-Coding-and-Robotics-Part-2.mp3"
            controls
            width="100%"
            height="50px"
            config={{
              file: { attributes: { controlsList: 'nodownload' } },
            }}
          />
        </div>
      </div>
    </section>
  );
}