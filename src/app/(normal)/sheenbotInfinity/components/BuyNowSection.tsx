"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BuyNowSection() {
  return (
    <section className="py-16 text-center">
      <h2
        className="
          flex flex-wrap 
          md:flex-nowrap 
          items-center justify-center 
          gap-2 
          text-2xl sm:text-3xl 
          font-bold mb-4
        "
      >
        <span>Ready to explore</span>
        <span className="text-primary">sheenbot</span>
        <Image
          src="/images/sheenbotInfinity/icon-infinity.svg"
          alt="Infinity Icon"
          width={36}
          height={36}
          className="inline-block"
        />
        ?
      </h2>
      <p className="text-body mb-8 max-w-lg mx-auto">
        Experience the next generation AI robotics kit for kids and unleash infinite creativity.
      </p>
      <Link
        href="/sheenbotInfinity/order"
        className="px-8 py-3 bg-body text-background font-bold rounded shadow hover:bg-light transition-colors inline-block"
      >
        Order Now
      </Link>
    </section>
  );
}
