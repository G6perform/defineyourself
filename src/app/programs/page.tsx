import Image from "next/image";

export const metadata = {
  title: "Our Programs | Define Yourself Inc.",
  description:
    "Learn about Define Yourself Inc. programs empowering youth through sports, mentorship, and holistic development.",
};

const programAreas = [
  {
    title: "Skill Enhancement",
    desc: "Expert coaching to develop sport-specific skills and elevate athletic performance at every level.",
  },
  {
    title: "Team Building",
    desc: "Activities and training that foster teamwork, communication, and trust among young athletes.",
  },
  {
    title: "Leadership Training",
    desc: "Programs designed to cultivate leadership qualities both on and off the field.",
  },
  {
    title: "Physical Fitness",
    desc: "Comprehensive fitness programs that build strength, endurance, and healthy habits for life.",
  },
  {
    title: "Confidence Building",
    desc: "Mentorship and support that helps young athletes believe in themselves and their abilities.",
  },
  {
    title: "Life Skills Development",
    desc: "Teaching discipline, time management, and resilience through the vehicle of sports.",
  },
];

export default function Programs() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="https://cdn.durable.co/getty/x9lPxoBdahQJ2gYqkxAiUm5aLGo4Hf6r7QjhCVVLlCaWtTgEPyoRDi0snYt6JWk.jpg"
          alt="Youth athletes"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <p className="text-white/50 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            Define Yourself Inc.
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider text-white">
            OUR PROGRAMS
          </h1>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Who We Are
          </p>
          <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark mb-6">
            NON-PROFIT YOUTH EMPOWERMENT
          </h2>
          <p className="text-text-gray text-lg leading-relaxed">
            Define Yourself Inc. is a non-profit organization geared towards helping youth obtain their goals and reach new heights. We focus on the mental, physical, and social development of young adults through athletic programs and mentorship.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="bg-white p-10 md:p-14">
              <p className="text-accent-dark text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Our Mission
              </p>
              <h3 className="font-display text-2xl md:text-3xl tracking-wider text-text-dark mb-6">
                EMPOWERING YOUTH THROUGH SPORTS
              </h3>
              <p className="text-text-gray leading-relaxed">
                To empower youth to achieve their fullest potential through holistic development, emphasizing mental, physical, and social growth via sports participation and mentorship programs.
              </p>
            </div>
            <div className="bg-charcoal p-10 md:p-14">
              <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Our Vision
              </p>
              <h3 className="font-display text-2xl md:text-3xl tracking-wider text-white mb-6">
                BUILDING FUTURE LEADERS
              </h3>
              <p className="text-white/60 leading-relaxed">
                To cultivate a generation of resilient leaders equipped with the skills and confidence to excel in all facets of life, while fostering a culture of community contribution and positive social impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Areas */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              What We Offer
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark">
              PROGRAM AREAS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {programAreas.map((program, i) => (
              <div
                key={program.title}
                className={`p-10 ${i % 2 === 0 ? "bg-off-white" : "bg-white"} border border-mid-gray/30`}
              >
                <span className="font-display text-5xl text-mid-gray/50 leading-none">
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl tracking-wider text-text-dark mt-4 mb-3">
                  {program.title.toUpperCase()}
                </h3>
                <p className="text-text-gray text-sm leading-relaxed">
                  {program.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-charcoal text-white noise-overlay text-center px-4">
        <div className="relative z-10">
          <h2 className="font-display text-4xl md:text-5xl tracking-wider mb-6">
            READY TO GET INVOLVED?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
            Whether you want to enroll your child, volunteer, or support our mission — we&apos;d love to connect.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-charcoal font-bold text-sm uppercase tracking-wider px-10 py-4 hover:bg-off-white transition-colors"
          >
            Contact Us &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}
