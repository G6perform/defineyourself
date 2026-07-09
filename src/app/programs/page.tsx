import Image from "next/image";

export const metadata = {
  title: "Our Programs | Define Yourself Inc.",
  description:
    "Learn about Define Yourself Inc. programs empowering youth through sports, mentorship, and holistic development.",
};

export default function Programs() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="https://cdn.durable.co/getty/x9lPxoBdahQJ2gYqkxAiUm5aLGo4Hf6r7QjhCVVLlCaWtTgEPyoRDi0snYt6JWk.jpg"
          alt="Youth athletes"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Our Programs
          </h1>
        </div>
      </section>

      {/* About the Org */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-6">
            Who We Are
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            Define Yourself Inc. is a non-profit organization geared towards helping youth obtain their goals and reach new heights. We focus on the mental, physical, and social development of young adults through athletic programs and mentorship.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-gold-dark font-semibold uppercase tracking-widest text-sm mb-3">
                Our Mission
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mb-6">
                Empowering Youth Through Sports
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                To empower youth to achieve their fullest potential through holistic development, emphasizing mental, physical, and social growth via sports participation and mentorship programs.
              </p>
            </div>
            <div>
              <p className="text-gold-dark font-semibold uppercase tracking-widest text-sm mb-3">
                Our Vision
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mb-6">
                Building Future Leaders
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                To cultivate a generation of resilient leaders equipped with the skills and confidence to excel in all facets of life, while fostering a culture of community contribution and positive social impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Areas */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-dark font-semibold uppercase tracking-widest text-sm mb-2">
              What We Offer
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">
              Program Areas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((program) => (
              <div
                key={program.title}
                className="bg-white rounded-2xl p-8 border border-taupe/15 shadow-sm"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mb-5">
                  <div className="w-5 h-5 bg-gold rounded-full" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                  {program.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {program.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-white py-16 text-center px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
          Ready to Get Involved?
        </h2>
        <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">
          Whether you want to enroll your child, volunteer, or support our mission — we&apos;d love to connect.
        </p>
        <a
          href="/contact"
          className="inline-block bg-gold hover:bg-gold-dark text-charcoal font-semibold px-10 py-4 rounded-lg text-lg transition-colors"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
