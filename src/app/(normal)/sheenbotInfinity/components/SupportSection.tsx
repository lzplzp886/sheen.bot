// src/app/(normal)/sheenbotInfinity/components/SupportSection.tsx
import React from 'react';
import Link from 'next/link';

export default function SupportSection() {
  const supportItems = [
    {
      title: 'Downloads',
      description: 'Get the latest software, extensions, and mobile apps for sheenbot∞.',
      link: '/downloads',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
    },
    {
      title: 'User Manual',
      description: 'Step-by-step guides and documentation to help you master your robot.',
      link: '/sheenbotInfinity/manual',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'Brochure',
      description: 'Download the product brochure for detailed specs and feature highlights.',
      link: '/sheenbotInfinity/brochure',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-body">Product Support</h2>
          <p className="text-darklight max-w-2xl mx-auto">
            Everything you need to get started, keep learning, and explore the possibilities of sheenbot∞.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supportItems.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-extralight hover:shadow-lg transition-shadow duration-300"
            >
              {item.icon}
              <h3 className="text-xl font-bold mb-3 text-body">{item.title}</h3>
              <p className="text-darklight mb-8 flex-grow">{item.description}</p>
              
              <Link href={item.link} className="btn text-center">
                Go to {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}