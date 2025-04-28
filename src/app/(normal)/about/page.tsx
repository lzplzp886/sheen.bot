// src/app/(normal)/about/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-96 md:h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/about/about-sheen.webp')" }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto h-full flex items-center justify-center px-4">
          <div className="text-white max-w-xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Building for Future
            </h1>
            <p className="mb-6 text-lg">
              Merge creativity with simplicity to empower education
            </p>
            <a
              href="#about"
              className="bg-primary text-background px-4 py-2 rounded inline-block"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section
        id="about"
        className="container mx-auto px-4 py-12 grid gap-8 md:grid-cols-2"
      >
        {/* LEFT COLUMN: About Us, Team & Contact */}
        <div className="space-y-8">
          {/* About Us */}
          <div>
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="text-body max-w-prose whitespace-normal break-words">
              We are passionate about building cutting-edge solutions for our clients. Whether it’s AI,
              robotics, or software platforms, our team at Sheen Robotics constantly pushes the boundaries
              to bring innovative technology to businesses around the world.
            </p>
            {/* YouTube Video Embed */}
              <div className="mt-6 relative w-full aspect-w-16 aspect-h-9">
                <iframe 
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/zVNYLtjWbe4?si=bFXu4FAut5WltvMv"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen>
                </iframe>
              </div>
          </div>

          {/* Teams Photo */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Team</h3>
            <div className="flex flex-wrap gap-4">
              <Image
                src="/images/about/about-sheen-team.webp"
                alt="Sheen team group photo"
                className="w-1/2 md:w-1/3 rounded shadow-lg"
                width={400}
                height={300}
              />
              <Image
                src="/images/about/about-sheen-team2.webp"
                alt="Sheen team teacher training"
                className="w-1/2 md:w-1/3 rounded shadow-lg"
                width={400}
                height={300}
              />
              <Image
                src="/images/about/about-sheen-team3.webp"
                alt="Sheen team in action"
                className="w-1/2 md:w-1/3 rounded shadow-lg"
                width={400}
                height={300}
              />
              <Image
                src="/images/about/about-sheen-team4.webp"
                alt="Sheen product demonstration"
                className="w-1/2 md:w-1/3 rounded shadow-lg"
                width={400}
                height={300}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <form action="#" method="POST" className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border p-2 rounded"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Your Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border p-2 rounded"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select name="category" className="w-full border p-2 rounded">
                  <option value="">Please select...</option>
                  <option value="inquiry">General Inquiry</option>
                  <option value="enrollment">Enrollment</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  name="message"
                  className="w-full border p-2 rounded whitespace-normal break-words"
                  rows={4}
                  placeholder="Your message..."
                />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="privacy" name="privacy" />
                <label htmlFor="privacy" className="ml-2 text-sm">
                  I have read and agree to the Privacy Policy
                </label>
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Details & Map */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Find Us</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-medium">Opening Hours</h4>
                <p>Mon - Fri: 09:00 - 18:00</p>
              </div>
              <div>
                <h4 className="text-xl font-medium">Call Us</h4>
                <p>Tel: +27659008570</p>
              </div>
              <div>
                <h4 className="text-xl font-medium">Email Us</h4>
                <p>info@sheen.bot</p>
              </div>
              <div>
                <h4 className="text-xl font-medium">Address</h4>
                <p>Unit C1, Century Square, Heron Crescent, Century City, Cape Town, 7441</p>
              </div>
            </div>
          </div>
          <div className="relative w-full aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2410.7107519175756!2d18.5179085!3d-33.8888311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc5dd0bd04eb99%3A0x87d6b663e00daf5e!2sSheen%20Academy!5e1!3m2!1sen!2sza!4v1745879322519!5m2!1sen!2sza"
              width="600"
              height="450"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </section>
    </>
  );
}
