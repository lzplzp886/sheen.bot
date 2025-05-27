// src/components/carouselGallery.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageItem {
  src: string;
  alt: string;
}

interface CarouselGalleryProps {
  images: ImageItem[];
}

export default function CarouselGallery({ images }: CarouselGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbsRef = useRef<HTMLDivElement[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  // ────────────────────────────────────────────────────────────
  // Responsive helper – update when viewport crosses 1024px
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };
    // initial value & listener
    handler(mq);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const goToPrev = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goToNext = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  // Open lightbox only when clicking main carousel center
  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  // center the current thumbnail horizontally without vertical scroll
  useEffect(() => {
    if (!lightboxOpen) {
      const thumbEl = thumbsRef.current[currentIndex];
      if (thumbEl) {
        thumbEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentIndex, lightboxOpen]);

  if (!images || images.length === 0) {
    return <p>No images available.</p>;
  }

  // positions for the 5-image perspective lineup
  // On desktop, the centre image is larger (scale / size boost)
  const positions = [
    { offset: -2, left: '10%', scale: 0.4, size: 240, blur: 'blur-sm', zIndex: 1 },
    { offset: -1, left: '20%', scale: 0.7, size: 260, blur: 'blur-sm', zIndex: 2 },
    {
      offset: 0,
      left: '50%',
      scale: isDesktop ? 1.2 : 0.9,
      size: isDesktop ? 380 : 300,
      blur: '',
      zIndex: 3,
    },
    { offset: 1, left: '80%', scale: 0.7, size: 260, blur: 'blur-sm', zIndex: 2 },
    { offset: 2, left: '90%', scale: 0.4, size: 240, blur: 'blur-sm', zIndex: 1 },
  ];

  return (
    <div>
      {/* Main carousel pane */}
      <div className="relative w-full mx-auto h-[60vw] sm:h-80 mb-4 bg-extralight rounded-md overflow-hidden">
        {positions.map((pos) => {
          const idx = (currentIndex + pos.offset + images.length) % images.length;
          return (
            <div
              key={pos.offset}
              className="absolute flex items-center justify-center rounded-md cursor-pointer"
              style={{
                top: '50%',
                left: pos.left,
                transform: `translate(-50%, -50%) scale(${pos.scale})`,
                zIndex: pos.zIndex,
                width: pos.size,
                height: pos.size,
                transition: 'transform 0.3s ease',
              }}
              onClick={() => {
                if (pos.offset < 0) goToPrev();
                else if (pos.offset > 0) goToNext();
                else openLightbox();
              }}
            >
              <Image
                src={images[idx].src}
                alt={images[idx].alt}
                fill
                className={`${pos.blur} object-contain rounded-md select-none`}
              />
            </div>
          );
        })}
        {/* nav arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background text-primary p-2 rounded-full shadow-lg hover:bg-primary hover:text-background z-20"
        >
          &larr;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background text-primary p-2 rounded-full shadow-lg hover:bg-primary hover:text-background z-20"
        >
          &rarr;
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar mb-4 px-2">
        {images.map((img, idx) => (
          <div
            key={idx}
            ref={(el) => {
              thumbsRef.current[idx] = el!;
            }}
            onClick={() => setCurrentIndex(idx)}
            className={`flex-shrink-0 cursor-pointer ${idx === currentIndex ? 'ring-2 ring-primary rounded-md' : ''}`}
          >
            <div className="relative w-16 sm:w-20 aspect-square">
              <Image src={img.src} alt={img.alt} fill className="object-cover rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-body bg-opacity-80"
          onClick={closeLightbox}
        >
          <div className="relative bg-transparent" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-[-2rem] top-1/2 -translate-y-1/2 bg-background text-primary p-2 rounded-full shadow-lg hover:bg-primary hover:text-background z-20"
            >
              &larr;
            </button>
            <div className="relative w-[90vw] max-w-[600px] aspect-square">
              <Image src={images[currentIndex].src} alt={images[currentIndex].alt} fill className="object-contain" />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-[-2rem] top-1/2 -translate-y-1/2 bg-background text-primary p-2 rounded-full shadow-lg hover:bg-primary hover:text-background z-20"
            >
              &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}