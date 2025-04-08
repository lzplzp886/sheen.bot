'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageItem {
  src: string;
  alt: string;
}

interface CarouselGalleryProps {
  images: ImageItem[];
  thumbnailsToShow?: number; // 缩略图逻辑
}

export default function CarouselGallery({
  images,
  thumbnailsToShow = 5,
}: CarouselGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // 点击最左或左侧图时，认为是 “上一张”
  function goToPrev() {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  // 点击最右或右侧图时，认为是 “下一张”
  function goToNext() {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }

  // 打开 Lightbox
  function openLightbox(index: number) {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
  }

  // 若无图片
  if (!images || images.length === 0) {
    return <p>No images available.</p>;
  }

  // ==============  计算 5 个位置  ==============
  // offset -2 (最左) / -1 (左) / 0 (中) / +1 (右) / +2 (最右)
  // 位置、缩放、模糊、透明度等
  const positions = [
    {
      offset: -2,
      left: '10%',
      scale: 0.4,
      blur: 'blur-sm',
      opacity: 'opacity-100',
      zIndex: 1,
    },
    {
      offset: -1,
      left: '25%',
      scale: 0.6,
      blur: 'blur-sm',
      opacity: 'opacity-100',
      zIndex: 2,
    },
    {
      offset: 0,
      left: '50%',
      scale: 1.2,
      blur: '',
      opacity: 'opacity-100',
      zIndex: 3,
    },
    {
      offset: 1,
      left: '75%',
      scale: 0.6,
      blur: 'blur-sm',
      opacity: 'opacity-100',
      zIndex: 2,
    },
    {
      offset: 2,
      left: '90%',
      scale: 0.4,
      blur: 'blur-sm',
      opacity: 'opacity-100',
      zIndex: 1,
    },
  ];

  // 用于点击事件：offset < 0 => goToPrev, offset > 0 => goToNext, offset=0 => openLightbox
  function handleClick(offset: number) {
    if (offset < 0) {
      goToPrev();
    } else if (offset > 0) {
      goToNext();
    } else {
      openLightbox(currentIndex);
    }
  }

  // ==============  缩略图逻辑  ==============
  function getDisplayedThumbnails() {
    if (images.length <= thumbnailsToShow) {
      return images.map((img, i) => ({ ...img, realIndex: i }));
    }
    const half = Math.floor(thumbnailsToShow / 2);
    let start = currentIndex - half;
    let end = start + thumbnailsToShow;
    if (start < 0) {
      start = 0;
      end = thumbnailsToShow;
    }
    if (end > images.length) {
      end = images.length;
      start = end - thumbnailsToShow;
      if (start < 0) start = 0;
    }
    return images.slice(start, end).map((img, i) => {
      const realIndex = start + i;
      return { ...img, realIndex };
    });
  }

  const displayedThumbs = getDisplayedThumbnails();

  return (
    <div>
      {/* 父容器 */}
      <div className="relative w-full mx-auto h-80 mb-8 bg-extralight overflow-hidden rounded-md">
        {positions.map((pos) => {
          // 计算图片索引：currentIndex + offset
          const index = (currentIndex + pos.offset + images.length) % images.length;

          // 组合 Tailwind 类
          const imageClass = `
            object-contain
            cursor-pointer
            transform
            scale-[${pos.scale}]
            ${pos.blur}
            ${pos.opacity}
          `;

          return (
            <div
              key={pos.offset}
              className="absolute flex items-center justify-center overflow-hidden rounded-md"
              style={{
                // 将图片放置在 pos.left, 垂直居中 top: '50%'
                // translate(-50%, -50%) 让图片中心对齐该点
                top: '50%',
                left: pos.left,
                transform: `translate(-50%, -50%) scale(${pos.scale})`,
                zIndex: pos.zIndex,
                width: 300,         // Add explicit width
                height: 320,        // Add explicit height
              }}
              onClick={() => handleClick(pos.offset)}
            >
              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                className={imageClass}
              />
            </div>
          );
        })}

        {/* 左 / 右箭头按钮 */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 
                     bg-background text-background p-2 rounded-full hover:bg-background z-10"
        >
          &larr;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 
                     bg-background text-background p-2 rounded-full hover:bg-background z-10"
        >
          &rarr;
        </button>
      </div>

      {/* 缩略图行 */}
      <div className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-4">
        {displayedThumbs.map((thumb) => (
          <div
            key={thumb.src}
            onClick={() => openLightbox(thumb.realIndex)}
            className={`cursor-pointer relative w-full h-24 
            ${thumb.realIndex === currentIndex ? 'border-2 border-primary rounded-md' : ''}`}
          >
            <Image
              src={thumb.src}
              alt={thumb.alt}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-body bg-opacity-80">
          {/* 关闭按钮 */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-background text-3xl font-bold"
          >
            &times;
          </button>

          {/* 左按钮 */}
          <button
            onClick={goToPrev}
            className="absolute left-4 text-background text-3xl font-bold top-1/2 transform -translate-y-1/2 z-10"
          >
            &larr;
          </button>

          {/* 大图 */}
          <div className="relative w-11/12 h-5/6 flex items-center justify-center">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
            />
          </div>

          {/* 右按钮 */}
          <button
            onClick={goToNext}
            className="absolute right-4 text-background text-3xl font-bold top-1/2 transform -translate-y-1/2 z-10"
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
