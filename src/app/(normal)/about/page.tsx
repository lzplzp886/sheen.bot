'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <section className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div>
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
                className="w-full border p-2 rounded"
                rows={4}
                placeholder="Your message..."
              ></textarea>
            </div>
            <div>
              <input type="checkbox" id="privacy" name="privacy" />
              <label htmlFor="privacy" className="ml-2 text-sm">
                I have read and agree to the Privacy Policy
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-background px-6 py-2 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Contact Info and Map */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Opening Hours</h2>
            <p>Mon - Fri: 09:00 - 18:00</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Call Us</h2>
            <p>Tel: +27 659 008 570</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Email Us</h2>
            <p>info@sheen.bot</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Address</h2>
            <p>Unit C1, Century Square, Heron Crescent, Century City, Cape Town, 7441</p>
          </div>

          {/* Google Map Embed */}
          <div className="aspect-w-16 aspect-h-9">
            {/* Replace with your actual Google Maps embed link/iframe */}
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
