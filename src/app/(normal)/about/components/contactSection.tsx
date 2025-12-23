// src/app/(normal)/about/components/contactSection.tsx

'use client';

import React from 'react';
import SectionContainer from './sectionContainer';

const contact_email = process.env.NEXT_PUBLIC_EMAIL
const contact_phone = process.env.NEXT_PUBLIC_PHONE

export default function ContactSection() {
  return (
    <SectionContainer>
      <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>

      {/* 两行布局：上文字，下地图 */}
      <div className="space-y-6">
        {/* Row 1：联系方式 */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-medium">Opening Hours</h4>
            <p>Monday-Saturday • 09:00-18:00</p>
          </div>

          <div>
            <h4 className="text-xl font-medium">Call Us</h4>
            <p>{contact_phone}</p>
          </div>

          <div>
            <h4 className="text-xl font-medium">Email Us</h4>
            <p>{contact_email}</p>
          </div>

          <div>
            <h4 className="text-xl font-medium">Address</h4>
            <p>
              Unit C4, Century Square,<br />
              Heron Crescent, Century City,<br />
              Cape Town 7441
            </p>
          </div>
        </div>

        {/* Row 2：Google Map */}
        <div className="relative w-full pb-[56.25%]">
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2410.7107519175756!2d18.5179085!3d-33.8888311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc5dd0bd04eb99%3A0x87d6b663e00daf5e!2sSheen%20Academy!5e1!3m2!1sen!2sza!4v1745879322519!5m2!1sen!2sza"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </SectionContainer>
  );
}
