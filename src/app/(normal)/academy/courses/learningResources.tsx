// src/app/(normal)/solutions/LearningResourcesSection.tsx

"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Document, Page as PdfPage, pdfjs } from "react-pdf";

// 指定 pdf.js worker 源（确保该路径或 URL 可用）
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf/pdf.worker.min.mjs";

// 定义翻页动画的 variants，利用 custom 参数传入翻页方向
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
  }),
};

export default function LearningResourcesSection() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  // direction 记录翻页方向：1 表示向右翻页，-1 表示向左翻页
  const [direction, setDirection] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePrevious = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (pageNumber > 1) {
      setDirection(-1);
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (numPages && pageNumber < numPages) {
      setDirection(1);
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <section id="learning-resources" className="max-w-6xl mx-auto px-4 py-20 relative">
      <h2 className="text-3xl sm:text-4xl text-body font-bold mb-8 text-center">
        Learning Resources
      </h2>
      <div className="flex justify-center overflow-hidden relative" style={{ maxHeight: 680 }}>
        <Document
          file="/pdf/Sheen-Curriculum-20250303.pdf"  // 替换为实际 PDF 文件地址
          onLoadSuccess={onDocumentLoadSuccess}
          className="shadow-lg"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pageNumber}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <PdfPage pageNumber={pageNumber} width={480} />
            </motion.div>
          </AnimatePresence>
        </Document>
        {/* 左侧翻页按钮 */}
        <button
          onClick={handlePrevious}
          disabled={pageNumber <= 1}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-light p-2 rounded disabled:opacity-50"
        >
          ←
        </button>
        {/* 右侧翻页按钮 */}
        <button
          onClick={handleNext}
          disabled={numPages !== null && pageNumber >= numPages}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-light p-2 rounded disabled:opacity-50"
        >
          →
        </button>
      </div>
      <div className="text-center mt-4">
        <span>
          Page {pageNumber} {numPages ? `of ${numPages}` : ""}
        </span>
      </div>
    </section>
  );
}
