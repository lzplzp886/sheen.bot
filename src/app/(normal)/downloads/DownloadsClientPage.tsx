// src/app/(normal)/downloads/DownloadsClientPage.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DownloadsClientPage() {
  const downloads = [
    {
      title: 'Mind+',
      description: 'Mind+ provides an intuitive visual programming interface, allowing beginners and experts alike to build complex workflows with drag-and-drop components and advanced scripting modes. ',
      link: 'https://mindplus.cc/download-en.html',
      fileName: 'MindPlusInstaller.exe',
      iconSrc: '/images/downloads/mindplus-icon.png',
    },
    {
      title: 'User Extension',
      description: 'sheenbot∞ User Extension for Mind+, enhance functionality with our tailor-made extensions to connect diverse sensors and actuators built for sheenbot∞. ',
      link: '/content/downloads/sheenbot-extension.zip',
      fileName: 'sheenbot-extension.zip',
      iconSrc: '/images/downloads/sheenbot-extension.png',
    },
    {
      title: 'Mobile App',
      description: 'sheenbot∞ Mobile App for Android (.apk), break free from computer dependency with mobile block-based coding, perfectly suited for dynamic classroom and outdoor coding sessions. ',
      link: '/content/downloads/sheenbot-infinity.apk',
      fileName: 'sheenbot-infinity.apk',
      iconSrc: '/images/downloads/sheenbot-icon.png',
    },
  ];

  const [selected, setSelected] = useState(0);

  const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 12l5 5m0 0l5-5m-5 5V4" />
    </svg>
  );

  // 根据链接类型渲染下载按钮
  const renderDownloadButton = (url: string) => {
    const isExternal = /^https?:\/\//.test(url);
    const CommonProps = {
      className: 'btn inline-flex items-center justify-center mt-4 mx-auto',
    };
    if (isExternal) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" {...CommonProps}>
          <DownloadIcon />
          Download
        </a>
      );
    }
    return (
      <Link href={url} {...CommonProps}>
        <DownloadIcon />
        Download
      </Link>
    );
  };

  return (
    <section className="py-12 bg-extralight min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        {/* Title */}
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-center text-4xl font-bold">Software Downloads</h1>
        </div>

        {/* Page Description */}
        <p className="text-center text-darklight mb-8">
          Welcome to the downloads page for sheenbot∞, where you’ll find essential software and resources to power your robotics and coding projects.
        </p>

        {/* Desktop Grid View */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
          {downloads.map((item, idx) => (
            <div
              key={idx}
              className="bg-background shadow-md rounded-2xl p-6 flex flex-col justify-between"
            >
              <div className="flex flex-col items-center mb-4">
                <Image
                  src={item.iconSrc}
                  alt={`${item.title} icon`}
                  width={48}
                  height={48}
                  className="mb-2"
                />
                <h2 className="text-2xl font-semibold text-center">{item.title}</h2>
              </div>
              <p className="text-body flex-grow text-center">{item.description}</p>
              {renderDownloadButton(item.link)}
            </div>
          ))}
        </div>

        {/* Mobile Tab View */}
        <div className="md:hidden flex">
          {/* Tabs */}
          <div className="w-1/4 flex flex-col items-center space-y-4">
            {downloads.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className={`p-2 rounded-full ${
                  idx === selected ? 'bg-background shadow-md' : 'bg-transparent'
                }`}
              >
                <Image
                  src={item.iconSrc}
                  alt={`${item.title} icon`}
                  width={32}
                  height={32}
                />
              </button>
            ))}
          </div>
          {/* Selected Content */}
          <div className="w-3/4 bg-background shadow-md rounded-2xl p-6 ml-4 flex flex-col justify-between">
            <div className="flex flex-col items-center mb-4">
              <Image
                src={downloads[selected].iconSrc}
                alt={`${downloads[selected].title} icon`}
                width={48}
                height={48}
                className="mb-2"
              />
              <h2 className="text-2xl font-semibold text-center mb-2">{downloads[selected].title}</h2>
            </div>
            <p className="text-body text-center">{downloads[selected].description}</p>
            {renderDownloadButton(downloads[selected].link)}
          </div>
        </div>
      </div>
    </section>
  );
}