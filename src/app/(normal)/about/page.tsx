'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <section className="grid md:grid-cols-2 gap-8">
        {/* LEFT COLUMN: About Us */}
        <div>
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          
          <p className="text-gray-700 mb-6">
            We are passionate about building cutting-edge solutions for our clients. 
            Whether it’s AI, robotics, or software platforms, our team at Sheen Robotics 
            constantly pushes the boundaries to bring innovative technology to businesses 
            around the world.
          </p>

          {/* Teams Photo */}
          <div className="flex flex-wrap gap-4">
            <Image
              src="/images/about/about-sheen-team.webp"
              alt="Sheen team group photo"
              className="w-1/2 md:w-1/3 rounded shadow"
            />
            <Image
              src="/images/about/about-sheen-team2.webp"
              alt="Sheen team teacher training"
              className="w-1/2 md:w-1/3 rounded shadow"
            />
            <Image
              src="/images/about/about-sheen-team3.webp"
              alt="Sheen team teacher training"
              className="hidden md:block md:w-1/3 rounded shadow"
            />
            <Image
              src="/images/about/about-sheen-team4.webp"
              alt="Sheen team product demostration"
              className="hidden md:block md:w-1/3 rounded shadow"
            />
          </div>

          <h2 className="text-2xl font-semibold my-4">Contact Us</h2>
          {/* Contact Form */}
          <form action="#" method="POST" className="space-y-4 mb-8">
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
                className="w-full border p-2 rounded"
                rows={4}
                placeholder="Your message..."
              ></textarea>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="privacy" name="privacy" />
              <label htmlFor="privacy" className="ml-2 text-sm">
                I have read and agree to the Privacy Policy
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </form>

        </div>

        {/* RIGHT COLUMN: Contact Form + Contact Details + Map */}
        <div>
          <h2 className="text-2xl font-semibold my-4">Find Us</h2>
          {/* Contact Details */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Opening Hours</h3>
            <p>Mon - Fri: 09:00 - 18:00</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Call Us</h3>
            <p>Tel: +27 659 008 570</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Email Us</h3>
            <p>info@sheen.bot</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Address</h3>
            <p>Unit C1, Century Square, Heron Crescent, Century City, Cape Town, 7441</p>
          </div>

          {/* Google Map Embed */}
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.0319453894426!2d18.5179085!3d-33.8888311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc5dd0bd04eb99%3A0x87d6b663e00daf5e!2sSheen%20Academy!5e0!3m2!1sen!2sza!4v1742840783857!5m2!1sen!2sza"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
