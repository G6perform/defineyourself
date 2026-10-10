import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import DonateButton from "@/components/DonateButton";
import NewsletterSignup from "@/components/NewsletterSignup";
import { images } from "@/lib/images";

const pillars = [
  { title: "Access", desc: "Removing barriers so every young person gets a real chance." },
  { title: "Mentorship", desc: "Experienced guides for growth, goals, and life." },
  { title: "Exposure", desc: "Platforms to be seen and create new opportunities." },
  { title: "Education", desc: "Academic support and preparation for the future." },
  { title: "Financial Literacy", desc: "Money skills that last a lifetime." },
  { title: "Career Readiness", desc: "Preparing youth for life and professional success." },
];

const programs = [
  {
    title: "Youth Development Scholarships",
    desc: "Funding training, coaching, and resources for young people who face financial barriers to development.",
    image: images.scholarships,
    alt: "Youth training",
  },
  {
    title: "Mentorship",
    desc: "Pairing young people with experienced mentors for guidance in personal growth, financial literacy, and life beyond the field.",
    image: images.mentorship,
    alt: "Mentorship session",
  },
  {
    title: "Performance Access",
    desc: "Partnering with schools and community programs that lack funding to bring development resources to the youth who need them.",
    image: images.performance,
    alt: "Performance testing",
  },
  {
    title: "Financial Literacy",
    desc: "Teaching young people how to budget, build credit, and make smart financial decisions — skills they will carry for life.",
    image: images.teams,
    alt: "Youth learning",
  },
];

const testimonials = [
  {
    quote:
      "Define Yourself has been transformative for my child. They don't just teach sports — they teach life lessons that have made a real difference.",
    initials: "JL",
    name: "Jessica Lee",
    role: "Parent — Sacramento",
  },
  {
    quote:
      "The mentorship program gave me the confidence and discipline I needed. I'm a better person because of Define Yourself.",
    initials: "DT",
    name: "David Thompson",
    role: "Youth Participant — Sacramento",
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
            THE YOUNG PEOPLE WITH THE MOST PROMISE OFTEN HAVE THE LEAST ACCESS
          </h2>
          <p className="text-text-gray text-lg leading-relaxed max-w-3xl mx-auto">
            We believe that mentorship, education, and holistic development can inspire the next generation of leaders, prepare them to succeed in every area of life, and strengthen the communities they come from. We exist to close the gap.
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
            {programs.map((program) => (
              <div
                key={program.title}
                className="group relative overflow-hidden cursor-pointer"
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
            Emphasizing mental, physical, and social growth through mentorship, education, and development programs.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Voices of Impact
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark">
              STORIES OF GROWTH
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
            EVERY DOLLAR GOES TOWARD THE YOUNG PEOPLE WHO HAVE THE DRIVE BUT NOT THE ACCESS
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Your contribution directly funds these programs. It helps a young person earn a scholarship, find a mentor who shows them what is possible, or access the resources that change their trajectory.
          </p>
          <DonateButton />
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

      {/* Newsletter Signup */}
      <section className="py-16 md:py-20 bg-charcoal noise-overlay">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-6xl tracking-wider text-text-dark mb-6">
            WE WOULD BE HONORED TO PARTNER WITH YOU
          </h2>
          <p className="text-text-gray text-lg mb-10 leading-relaxed">
            On behalf of every young person you help reach new heights — thank you.
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
