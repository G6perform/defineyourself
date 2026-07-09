import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import StripeButton from "@/components/StripeButton";

const pillars = [
  { title: "Mental", desc: "Resilience, focus, and competitive mindset." },
  { title: "Physical", desc: "High-level athletic training and development." },
  { title: "Social", desc: "Community, teamwork, and communication." },
  { title: "Mentorship", desc: "Guidance from experienced athletes and leaders." },
  { title: "Access", desc: "Closing the gap for underserved athletes." },
  { title: "Growth", desc: "Building leaders on and off the field." },
];

const programs = [
  {
    title: "Athlete Development Scholarships",
    desc: "Covering training, coaching, and equipment costs for talented athletes who face financial barriers to high-level development.",
    image: "https://cdn.durable.co/getty/x9lPxoBdahQJ2gYqkxAiUm5aLGo4Hf6r7QjhCVVLlCaWtTgEPyoRDi0snYt6JWk.jpg",
    alt: "Athletes training",
  },
  {
    title: "Identification Camps",
    desc: "Giving athletes from underserved and under-marketed communities a platform to showcase their skills in front of college and semi-professional recruiters.",
    image: "https://cdn.durable.co/getty/kGKCyS5u9VVmfPEVhMKwKZFYUVVhM8u2ynYqaFPcf3mUuPGJO3Hn2bG68FLT9fLc.jpg",
    alt: "Youth athlete showcase",
  },
  {
    title: "Elite Athlete Mentorship",
    desc: "Pairing experienced athletes with younger ones for guidance in their sport, financial literacy, mental performance, and personal growth beyond the game.",
    image: "https://cdn.durable.co/getty/8Uos2SVYSf43zv7sFbDq0uyH3aDWqYU4LfTFB6CRBBrS4EVEwY9c1iR84vG2aTjO.jpg",
    alt: "Mentorship session",
  },
  {
    title: "Performance Access",
    desc: "Partnering with schools and clubs that lack funding to bring advanced combine testing and performance consulting to their athletes.",
    image: "https://cdn.durable.co/getty/JYl8zcNEkZ5SVNqw0bQPBJPflU5LOkOEkQ4xNOqk2EiQkTqI5fXcUZlAFsPxrcpX.jpg",
    alt: "Performance testing",
  },
  {
    title: "Define Yourself Teams",
    desc: "Our own youth sports teams — a place to play, compete, and grow within a program built around our mission.",
    image: "https://cdn.durable.co/getty/N7PdK3SqkNvwJGPXMD1kuxYbYS2nlPuSxQTTJWdCxYoUkiW7FgNJdKajFPkgpGdL.jpg",
    alt: "Youth sports team",
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

      {/* Core Message */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Why We Exist
          </p>
          <h2 className="font-display text-3xl md:text-5xl tracking-wider text-text-dark leading-tight mb-8">
            THE ATHLETES WITH THE MOST PROMISE OFTEN HAVE THE LEAST ACCESS
          </h2>
          <p className="text-text-gray text-lg leading-relaxed max-w-3xl mx-auto">
            We believe that high-level athletic training and genuine mentorship can teach and inspire the next generation of leaders, prepare them to succeed in every arena of life, and strengthen the communities they come from. We exist to close the gap.
          </p>
        </div>
      </section>

      {/* Six Pillars */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Our Approach
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark">
              HOLISTIC DEVELOPMENT
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white p-6 text-center group hover:bg-charcoal transition-colors duration-300"
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

      {/* Programs — Image Tiles */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              What Your Support Makes Possible
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark">
              OUR PROGRAMS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {programs.map((program, i) => (
              <div
                key={program.title}
                className={`group relative overflow-hidden cursor-pointer ${
                  i === programs.length - 1 ? "md:col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={program.image}
                    alt={program.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-colors duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-display text-2xl md:text-3xl tracking-wider text-white mb-2">
                    {program.title.toUpperCase()}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed max-w-lg">
                    {program.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 md:py-28 bg-off-white">
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

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Champions Speak
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark">
              STORIES OF TRIUMPH & GROWTH
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-off-white p-8 md:p-10 border border-mid-gray/50"
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

      {/* Donate CTA */}
      <section className="py-20 md:py-28 bg-charcoal text-white noise-overlay">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Level The Playing Field
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-wider mb-6">
            EVERY DOLLAR GOES TOWARD THE ATHLETES WHO HAVE THE DRIVE BUT NOT THE ACCESS
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Your contribution directly funds these programs. It helps a young athlete attend a camp that changes their trajectory, earn a scholarship that keeps them in their sport, or find a mentor who shows them what is possible.
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
              SACRAMENTO, CALIFORNIA
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

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-6xl tracking-wider text-text-dark mb-6">
            WE WOULD BE HONORED TO PARTNER WITH YOU
          </h2>
          <p className="text-text-gray text-lg mb-10 leading-relaxed">
            On behalf of every athlete you help reach new heights — thank you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="bg-charcoal hover:bg-charcoal/90 text-white font-bold text-sm uppercase tracking-wider px-10 py-4 transition-colors"
            >
              Support Our Mission &rarr;
            </a>
            <a
              href="/contact"
              className="border-2 border-charcoal text-charcoal font-bold text-sm uppercase tracking-wider px-10 py-4 hover:bg-charcoal hover:text-white transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
