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
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
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
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
          Unlock Potential Through Sports
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8">
          Define Yourself is dedicated to the mental, physical, and social development of young adults through athletics and mentorship.
        </p>
        <a
          href="/programs"
          className="bg-gold hover:bg-gold-dark text-charcoal font-semibold px-8 py-3 rounded-lg text-lg transition-colors"
        >
          Our Programs
        </a>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
