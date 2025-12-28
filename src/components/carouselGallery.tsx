// src/components/carouselGallery.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageItem { src: string; alt: string }
interface CarouselGalleryProps { images: ImageItem[] }

export default function CarouselGallery({ images }: CarouselGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbsContainerRef = useRef<HTMLDivElement>(null); // 父容器 Ref
  const thumbsRef = useRef<HTMLDivElement[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Responsive helper
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };
    handler(mq);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const goToPrev = () =>
    setCurrentIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const goToNext = () =>
    setCurrentIndex(i => (i === images.length - 1 ? 0 : i + 1));

  // Safe scroll logic: scroll the CONTAINER, not the page
  useEffect(() => {
    const container = thumbsContainerRef.current;
    const selectedThumb = thumbsRef.current[currentIndex];

    if (container && selectedThumb) {
      // Calculate center position
      const containerWidth = container.offsetWidth;
      const thumbWidth = selectedThumb.offsetWidth;
      const thumbLeft = selectedThumb.offsetLeft;
      
      // Target scroll position to center the thumb
      const targetScrollLeft = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 50;
    if (diff > threshold) goToNext();
    else if (diff < -threshold) goToPrev();
    touchStartX.current = null;
  };

  if (!images || images.length === 0) {
    return <p>No images available.</p>;
  }

  const positions = [
    { offset: -2, left: '10%', size: 240, blur: 'blur-sm', zIndex: 1 },
    { offset: -1, left: '20%', size: 260, blur: 'blur-sm', zIndex: 2 },
    {
      offset: 0,
      left: '50%',
      size: isDesktop ? 380 : 300,
      blur: '',
      zIndex: 3,
    },
    { offset: 1, left: '80%', size: 260, blur: 'blur-sm', zIndex: 2 },
    { offset: 2, left: '90%', size: 240, blur: 'blur-sm', zIndex: 1 },
  ];

  return (
    <div>
      {/* Main carousel pane with swipe support */}
      <div
        className="relative w-full mx-auto h-[60vw] sm:h-80 mb-4 bg-extralight rounded-md overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {positions.map(pos => {
          const idx = (currentIndex + pos.offset + images.length) % images.length;
          const width = pos.size;
          const height = Math.round(pos.size * 0.75);

          return (
            <div
              key={pos.offset}
              className="absolute flex items-center justify-center rounded-md cursor-pointer overflow-hidden"
              style={{
                top: '50%',
                left: pos.left,
                transform: 'translate(-50%, -50%)',
                zIndex: pos.zIndex,
                width,
                height,
                transition: 'all 0.3s ease',
              }}
              onClick={() => {
                if (pos.offset < 0) goToPrev();
                else if (pos.offset > 0) goToNext();
              }}
            >
              <Image
                src={images[idx].src}
                alt={images[idx].alt}
                fill
                className={`${pos.blur} object-cover select-none`}
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xs text-center py-1">
                {images[idx].alt}
              </div>
            </div>
          );
        })}
      </div>

      {/* Thumbnails */}
      <div 
        ref={thumbsContainerRef} // 添加 ref 到父容器
        className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar mb-4 px-2"
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            ref={el => {
              thumbsRef.current[idx] = el!;
            }}
            onClick={() => setCurrentIndex(idx)}
            className={`flex-shrink-0 cursor-pointer ${
              idx === currentIndex ? 'ring-2 ring-primary rounded-md' : ''
            }`}
          >
            <div className="relative w-16 sm:w-20 aspect-square">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
