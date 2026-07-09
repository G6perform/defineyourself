"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    src: "https://cdn.durable.co/getty/x9lPxoBdahQJ2gYqkxAiUm5aLGo4Hf6r7QjhCVVLlCaWtTgEPyoRDi0snYt6JWk.jpg",
    alt: "Basketball players in action",
  },
  {
    src: "https://cdn.durable.co/getty/kGKCyS5u9VVmfPEVhMKwKZFYUVVhM8u2ynYqaFPcf3mUuPGJO3Hn2bG68FLT9fLc.jpg",
    alt: "Soccer training session",
  },
  {
    src: "https://cdn.durable.co/getty/8Uos2SVYSf43zv7sFbDq0uyH3aDWqYU4LfTFB6CRBBrS4EVEwY9c1iR84vG2aTjO.jpg",
    alt: "Trophy celebration",
  },
  {
    src: "https://cdn.durable.co/getty/JYl8zcNEkZ5SVNqw0bQPBJPflU5LOkOEkQ4xNOqk2EiQkTqI5fXcUZlAFsPxrcpX.jpg",
    alt: "Youth playing frisbee",
  },
  {
    src: "https://cdn.durable.co/getty/N7PdK3SqkNvwJGPXMD1kuxYbYS2nlPuSxQTTJWdCxYoUkiW7FgNJdKajFPkgpGdL.jpg",
    alt: "Girl soccer player",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.alt}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <p className="text-white/60 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
          Define Yourself Inc.
        </p>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white tracking-wider leading-none mb-6">
          UNLOCK POTENTIAL
          <br />
          THROUGH SPORTS
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
          Empowering youth to reach their fullest potential through sport and mentorship. The athletes with the most promise often have the least access. We exist to close that gap.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/programs"
            className="bg-white text-charcoal font-bold text-sm uppercase tracking-wider px-8 py-4 hover:bg-off-white transition-colors"
          >
            Our Programs
          </a>
          <a
            href="/donate"
            className="border-2 border-white/40 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 hover:border-white transition-colors"
          >
            Support Our Mission
          </a>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-0.5 transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-4 bg-white/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
