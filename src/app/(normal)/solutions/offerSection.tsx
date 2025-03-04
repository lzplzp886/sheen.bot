// src/app/solutions/offerSection.tsx

"use client";
import React from "react";
import Image from "next/image";

export default function OfferSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl sm:text-4xl text-black font-bold mb-8 text-center">
        What We Offer
      </h2>
      <p className="text-black text-base sm:text-lg md:text-xl mb-10 text-center max-w-2xl mx-auto">
        We provide a comprehensive suite of educational resources, competitions, and AI-driven tools that empower learners of all ages to embrace the future of robotics.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Competition Consulting */}
        <a
          href="#competition-consulting"
          className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <div className="mb-4">
            <Image
              src="/images/solutions/competition-consulting.svg"
              alt="Competition Consulting Icon"
              width={50}
              height={50}
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Competition Consulting</h3>
          <p className="text-base sm:text-lg">
            Expert guidance for AI and robotics competitions.
          </p>
        </a>
        {/* Robotics Lab Sourcing */}
        <a
          href="#robotics-lab-sourcing"
          className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <div className="mb-4">
            <Image
              src="/images/solutions/lab-sourcing.svg"
              alt="Robotics Lab Sourcing Icon"
              width={50}
              height={50}
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Robotics Lab Sourcing</h3>
          <p className="text-base sm:text-lg">
            Supply resources to set up and maintain the robotics lab.
          </p>
        </a>
        {/* Public Services */}
        <a
          href="#public-services"
          className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <div className="mb-4">
            <Image
              src="/images/solutions/public-services.svg"
              alt="Public Services Icon"
              width={50}
              height={50}
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Public Services</h3>
          <p className="text-base sm:text-lg">
            Teacher Training, Talent Development and STEM Events.
          </p>
        </a>
        {/* Equipment Rental */}
        <a
          href="#equipment-rental"
          className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <div className="mb-4">
            <Image
              src="/images/solutions/equipment-rental.svg"
              alt="Equipment Rental Icon"
              width={50}
              height={50}
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Equipment Rental</h3>
          <p className="text-base sm:text-lg">
            High-quality robots and equipment tailored to your on-demand needs.
          </p>
        </a>
        {/* Learning Resources */}
        <a
          href="#learning-resources"
          className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <div className="mb-4">
            <Image
              src="/images/solutions/learning-resources.svg"
              alt="Learning Resources Icon"
              width={50}
              height={50}
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Learning Resources</h3>
          <p className="text-base sm:text-lg">
            Coding &amp; Robotics Curriculums accessible from an online portal.
          </p>
        </a>
        {/* Cloud Platform */}
        <a
          href="#cloud-platform"
          className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <div className="mb-4">
            <Image
              src="/images/solutions/cloud-platform.svg"
              alt="Cloud Platform Icon"
              width={50}
              height={50}
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Cloud Platform</h3>
          <p className="text-base sm:text-lg">
            AI and IoT Cloud solutions to optimize efficiency and connectivity.
          </p>
        </a>
      </div>
    </section>
  );
}
