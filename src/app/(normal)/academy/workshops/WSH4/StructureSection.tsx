// src/app/(normal)/academy/workshops/WSH4/StructureSection.tsx

'use client';

import React from 'react';
import Image from 'next/image';

const PROGRAMS = [
  {
    icon: '/images/academy/Workshops/Day-1.svg', // Ensure you have a generic robot/maker icon
    title: 'Mini Makers',
    subtitle: 'Ages 6–8',
    price: 'R750',
    time: 'Morning: 10:00 AM – 12:00 PM',
    desc: 'Perfect for younger creative minds! \n• Create fun animations using block-based coding.\n• Build and code your very own robot.\n• DIY robot build using simple craft supplies.',
  },
  {
    icon: '/images/academy/Workshops/Day-3.svg', // Ensure you have a generic code/laptop icon
    title: 'Young Tech Innovators',
    subtitle: 'Ages 9+',
    price: 'R600',
    time: 'Afternoon: 14:00 PM – 17:00 PM',
    desc: 'Designed for older kids ready to level up! \n• Unleash creativity through Python programming.\n• Create your own mini-game with beginner-friendly tools.\n• Dive deeper into logic and problem solving.',
  },
];

export default function StructureSection() {
  return (
    <section className="bg-accent/10 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-8 text-center md:text-left">
          Choose Your Track:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto">
          {PROGRAMS.map((prog) => (
            <div
              key={prog.title}
              className="bg-background rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow border-t-4 border-secondary"
            >
              <Image
                src={prog.icon}
                alt={prog.title}
                width={80}
                height={80}
                className="mb-4"
              />
              <h4 className="text-2xl font-bold text-primary">
                {prog.title}
              </h4>
              <span className="inline-block bg-accent text-white px-3 py-1 rounded-full text-sm font-bold mt-2 mb-2">
                {prog.subtitle}
              </span>
              
              <div className="w-full border-t border-dashed border-gray-300 my-3"></div>
              
              <div className="text-left w-full space-y-2 mb-4">
                 <p className="font-semibold text-secondary">💰 Price: <span className="text-body font-normal">{prog.price}</span></p>
                 <p className="font-semibold text-secondary">⏰ Time: <span className="text-body font-normal">{prog.time}</span></p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl w-full text-left">
                <p className="text-sm whitespace-pre-line leading-relaxed">{prog.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}