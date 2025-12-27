// src/app/(normal)/academy/curriculum/components/curriculumSection.tsx

"use client";

import "@/lib/polyfill"; 

import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Document, Page as PdfPage, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Loader2, Download } from "lucide-react"; // 引入 Download 图标

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf/pdf.worker.min.mjs";

// ==========================================
// 桌面端 FlipBook 专用的 Page 组件
// ==========================================
const DesktopPage = forwardRef<HTMLDivElement, { pageNumber: number; width: number; height: number }>(
  ({ pageNumber, width, height }, ref) => {
    return (
      <div 
        ref={ref} 
        className="bg-white relative border-r border-gray-100"
        style={{ width: `${width}px`, height: `${height}px`, padding: 0, margin: 0, overflow: 'hidden' }}
      >
          {/* 
            关键尝试：
            1. 移除 flex 布局，使用默认 block。
            2. 使用 width 属性传递给 PdfPage (与移动端保持一致的策略)。
            3. 显式指定 loading，看是否卡在 loading。
          */}
          <PdfPage
            pageNumber={pageNumber}
            width={width} // 尝试回滚到 width 策略，因为移动端 width 策略是成功的
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="pointer-events-none" // 防止鼠标事件干扰 FlipBook
            loading={
                <div className="flex items-center justify-center w-full h-full bg-gray-50 text-gray-400">
                    <Loader2 className="animate-spin mr-2" />
                    Loading...
                </div>
            }
            onRenderSuccess={() => console.log(`Desktop Page ${pageNumber} rendered successfully`)}
            onRenderError={(err) => console.error(`Desktop Page ${pageNumber} error:`, err)}
          />
          
          <div className="absolute bottom-2 right-4 text-xs text-gray-400 font-mono z-10 pointer-events-none">
            {pageNumber}
          </div>
      </div>
    );
  }
);
DesktopPage.displayName = "DesktopPage";

// ==========================================
// 移动端 垂直列表 专用的 Page 组件
// ==========================================
function MobilePage({ pageNumber, width }: { pageNumber: number; width: number }) {
    return (
        <div className="shadow-lg rounded-sm overflow-hidden bg-white border border-gray-200 mb-6">
            <PdfPage 
                pageNumber={pageNumber} 
                width={width}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={
                    <div className="h-[400px] w-full flex items-center justify-center bg-gray-50">
                        <Loader2 className="animate-spin text-gray-300" />
                    </div>
                }
            />
             <div className="text-center py-2 text-xs text-gray-400 bg-gray-50 border-t border-gray-100">
                Page {pageNumber}
            </div>
        </div>
    );
}

export default function CurriculumSection() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const bookRef = useRef<any>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(300); 
  const [desktopBookSize, setDesktopBookSize] = useState({ width: 400, height: 566 });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setContainerWidth(window.innerWidth - 32);
      } else {
        // 桌面端：单页宽 400
        setDesktopBookSize({ width: 400, height: Math.floor(400 * 1.414) });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const handleNext = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const handlePrev = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  return (
    <section id="curriculum-booklet" className="w-full bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl text-body font-bold mb-4 text-center">
          Our Curriculum
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 mb-10 text-body opacity-80 text-center max-w-2xl">
          <p>
            {isMobile 
              ? "Explore our comprehensive learning path below" 
              : "Explore our comprehensive learning path. Use buttons to flip"}
          </p>
          <span className="hidden sm:inline">, or </span>
          <a 
            href="/pdf/Sheen-Curriculum-20250303.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-primary hover:text-secondary hover:underline transition-colors mt-2 sm:mt-0 font-medium ml-1"
          >
            <Download className="w-4 h-4 mr-1" />
            Download the material
          </a>
        </div>

        <div className="w-full flex justify-center min-h-[600px]">
            <Document
                file="/pdf/Sheen-Curriculum-20250303.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="flex flex-col items-center justify-center p-20">
                        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                        <p className="text-gray-500">Loading Curriculum PDF...</p>
                    </div>
                }
                className={isMobile ? "flex flex-col gap-4 w-full" : "flex justify-center"}
            >
                {/* ================= 移动端视图 ================= */}
                {isMobile && numPages && (
                    <div className="flex flex-col items-center w-full">
                        {Array.from(new Array(numPages), (el, index) => (
                            <MobilePage 
                                key={`mobile_page_${index + 1}`} 
                                pageNumber={index + 1} 
                                width={containerWidth} 
                            />
                        ))}
                    </div>
                )}

                {/* ================= 桌面端视图 ================= */}
                {!isMobile && numPages && (
                    <div className="relative flex items-center justify-center">
                         <button 
                            onClick={handlePrev} 
                            className="absolute -left-16 z-20 p-3 bg-white text-primary rounded-full shadow-lg hover:scale-110 transition-transform"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* @ts-ignore */}
                        <HTMLFlipBook
                            width={desktopBookSize.width}
                            height={desktopBookSize.height}
                            size="fixed"
                            minWidth={300}
                            maxWidth={600}
                            minHeight={400}
                            maxHeight={850}
                            maxShadowOpacity={0.5}
                            showCover={true}
                            mobileScrollSupport={false}
                            ref={bookRef}
                            className="shadow-2xl bg-white"
                            flippingTime={1000}
                            usePortrait={false}
                            startZIndex={0}
                            autoSize={true} // 尝试允许 autoSize，有时能解决渲染问题
                            clickEventForward={true}
                            useMouseEvents={true}
                            swipeDistance={30}
                            showPageCorners={true}
                            disableFlipByClick={false}
                        >
                            {Array.from(new Array(numPages), (el, index) => (
                                <DesktopPage 
                                    key={`desktop_page_${index + 1}`} 
                                    pageNumber={index + 1} 
                                    width={desktopBookSize.width}
                                    height={desktopBookSize.height}
                                />
                            ))}
                        </HTMLFlipBook>

                        <button 
                            onClick={handleNext} 
                            className="absolute -right-16 z-20 p-3 bg-white text-primary rounded-full shadow-lg hover:scale-110 transition-transform"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}
            </Document>
        </div>
        
        {loading && <p className="mt-8 text-sm text-gray-400">Preparing document...</p>}
      </div>

      <style jsx global>{`
         /* 移除所有针对 canvas 的 !important 强制样式 */
         /* 让 react-pdf 自然渲染，避免冲突 */
      `}</style>
    </section>
  );
}
