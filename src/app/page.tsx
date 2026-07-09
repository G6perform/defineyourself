import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import StripeButton from "@/components/StripeButton";

const pillars = [
  { title: "Physical", desc: "Building athletic foundations through structured training." },
  { title: "Mental", desc: "Developing resilience, focus, and competitive mindset." },
  { title: "Social", desc: "Fostering teamwork, communication, and community bonds." },
  { title: "Leadership", desc: "Cultivating leaders on and off the field." },
  { title: "Skill", desc: "Sport-specific coaching to elevate performance." },
  { title: "Character", desc: "Instilling discipline, integrity, and perseverance." },
];

const programs = [
  {
    title: "Skill Enhancement",
    image: "https://cdn.durable.co/getty/kGKCyS5u9VVmfPEVhMKwKZFYUVVhM8u2ynYqaFPcf3mUuPGJO3Hn2bG68FLT9fLc.jpg",
    alt: "Soccer skill training",
  },
  {
    title: "Team Building",
    image: "https://cdn.durable.co/getty/N7PdK3SqkNvwJGPXMD1kuxYbYS2nlPuSxQTTJWdCxYoUkiW7FgNJdKajFPkgpGdL.jpg",
    alt: "Team high-five",
  },
  {
    title: "Leadership Training",
    image: "https://cdn.durable.co/getty/8Uos2SVYSf43zv7sFbDq0uyH3aDWqYU4LfTFB6CRBBrS4EVEwY9c1iR84vG2aTjO.jpg",
    alt: "Leadership coaching",
  },
  {
    title: "Physical Fitness",
    image: "https://cdn.durable.co/getty/JYl8zcNEkZ5SVNqw0bQPBJPflU5LOkOEkQ4xNOqk2EiQkTqI5fXcUZlAFsPxrcpX.jpg",
    alt: "Youth fitness training",
  },
  {
    title: "Confidence Building",
    image: "https://cdn.durable.co/getty/x9lPxoBdahQJ2gYqkxAiUm5aLGo4Hf6r7QjhCVVLlCaWtTgEPyoRDi0snYt6JWk.jpg",
    alt: "Athletes celebrating",
  },
  {
    title: "Life Skills",
    image: "https://images.unsplash.com/photo-1508802595585-a7e56c972036?w=800",
    alt: "Youth mentorship",
  },
];

const testimonials = [
  {
    quote:
      "Define Yourself has been transformative for my child. The coaches don't just teach sports — they teach life lessons that have made a real difference.",
    initials: "JL",
    name: "Jessica Lee",
    role: "Parent — Sacramento",
  },
  {
    quote:
      "The mentorship program gave me the confidence and discipline I needed. I'm a better athlete and a better person because of Define Yourself.",
    initials: "DT",
    name: "David Thompson",
    role: "Athlete — Sacramento",
  },
  {
    quote:
      "Watching my daughter grow through this program has been incredible. She's learned resilience, teamwork, and what it means to define yourself.",
    initials: "MC",
    name: "Melissa Carter",
    role: "Parent — Sacramento",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* About / Pillars Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Our Approach
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-wider text-text-dark mb-6">
              EVERY ATHLETE HAS THE POWER TO DEFINE THEMSELVES
            </h2>
            <p className="text-text-gray text-lg leading-relaxed">
              Define Yourself is dedicated to empowering youth across the United States through sports. We develop the complete athlete — mind, body, and character.
            </p>
          </div>

          {/* Six Pillars Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-off-white p-6 text-center group hover:bg-charcoal transition-colors duration-300"
              >
                <h3 className="font-display text-2xl tracking-wider text-text-dark group-hover:text-white mb-2 transition-colors">
                  {pillar.title.toUpperCase()}
                </h3>
                <p className="text-text-gray text-xs leading-relaxed group-hover:text-white/60 transition-colors">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid — G6 "Athletes of G6" style */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Play Empowers
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-wider text-text-dark">
              UNLOCK POTENTIAL THROUGH PLAY
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {programs.map((program) => (
              <div
                key={program.title}
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
              >
                <Image
                  src={program.image}
                  alt={program.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl md:text-3xl tracking-wider text-white">
                    {program.title.toUpperCase()}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement — Full width */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Our Mission
          </p>
          <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl tracking-wider text-text-dark leading-tight">
            &ldquo;TO EMPOWER YOUTH TO ACHIEVE THEIR FULLEST POTENTIAL THROUGH HOLISTIC DEVELOPMENT&rdquo;
          </blockquote>
          <p className="text-text-gray text-lg mt-8 leading-relaxed max-w-2xl mx-auto">
            Emphasizing mental, physical, and social growth via sports participation and mentorship programs.
          </p>
        </div>
      </section>

      {/* Testimonials — G6 style */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Champions Speak
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-wider text-text-dark">
              STORIES OF TRIUMPH & GROWTH
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white p-8 md:p-10 border border-mid-gray/50"
              >
                <p className="text-text-gray leading-relaxed mb-8 text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-charcoal flex items-center justify-center">
                    <span className="font-display text-lg text-white tracking-wider">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-text-dark text-sm">
                      {t.name}
                    </p>
                    <p className="text-text-gray text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Tuesday / Donate CTA */}
      <section className="py-20 md:py-28 bg-charcoal text-white noise-overlay">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Support Us
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-wider mb-6">
            EMPOWER A YOUNG ATHLETE
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Your support helps provide mentorship, athletic training, and life-changing opportunities for youth. Every dollar makes a difference in a young athlete&apos;s journey.
          </p>
          <StripeButton />
        </div>
      </section>

      {/* Map */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Location
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark">
              SACRAMENTO, CA
            </h2>
          </div>
          <div className="overflow-hidden h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199539.04534498907!2d-121.59441752890477!3d38.56165706318942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x921f6aaa74197fdb!2sSacramento%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sacramento, CA location"
            />
          </div>
        </div>
      </section>

      {/* Final CTA — G6 "Claim Free Eval" style */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-6xl tracking-wider text-text-dark mb-6">
            INSPIRE GREATNESS VIA SPORTS
          </h2>
          <p className="text-text-gray text-lg mb-10 leading-relaxed">
            Unleash potential, ignite passion: Join our community where youth thrive through the power of sports, mentorship, and personal growth.
          </p>
          <a
            href="/programs"
            className="inline-block bg-charcoal hover:bg-charcoal/90 text-white font-bold text-sm uppercase tracking-wider px-10 py-4 transition-colors"
          >
            Our Programs &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}
