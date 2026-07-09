import Image from "next/image";

export const metadata = {
  title: "Our Programs | Define Yourself Inc.",
  description:
    "Athlete Development Scholarships, Identification Camps, Elite Mentorship, Performance Access, and Define Yourself Teams.",
};

const programs = [
  {
    title: "Athlete Development Scholarships",
    desc: "Covering training, coaching, and equipment costs for talented athletes who face financial barriers to high-level development.",
    detail: "Too many athletes with real potential never get the chance to develop because of cost. Our scholarships remove that barrier — funding the training, coaching, and gear that let them compete at the level they deserve.",
  },
  {
    title: "Identification Camps",
    desc: "Giving athletes from underserved and under-marketed communities a platform to showcase their skills in front of college and semi-professional recruiters, with the exposure their peers often take for granted.",
    detail: "Talent is everywhere. Opportunity is not. Our ID Camps put athletes in front of the recruiters and coaches who can change their lives — giving them the same platform that athletes in well-funded programs already have.",
  },
  {
    title: "Elite Athlete Mentorship",
    desc: "Pairing experienced athletes with younger ones for guidance in their sport, financial literacy, mental performance, and personal growth beyond the game.",
    detail: "Development doesn't stop at the field. Our mentors help young athletes navigate the mental side of competition, build financial literacy, and prepare for life beyond sport — because the best athletes are built from the inside out.",
  },
  {
    title: "Performance Access",
    desc: "Partnering with schools and clubs that lack funding to bring advanced combine testing and performance consulting to their athletes, unlocking their potential with data-driven insight.",
    detail: "Advanced performance testing shouldn't be reserved for programs with big budgets. We bring the same combine testing and consulting used by elite programs directly to the schools and clubs that need it most.",
  },
  {
    title: "Define Yourself Teams",
    desc: "Launching our own youth sports teams, giving young athletes a place to play, compete, and grow within a program built around our mission — pairing real competition with training, mentorship, and development.",
    detail: "More than a team — a program. DY Teams give athletes a place to compete while getting the training, mentorship, and personal development that help them reach their potential on and off the field.",
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
            What Your Support Makes Possible
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider text-white">
            OUR PROGRAMS
          </h1>
        </div>
      </section>

      {/* Core Problem */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            The Problem
          </p>
          <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark mb-6">
            THE ATHLETES WITH THE MOST PROMISE HAVE THE LEAST ACCESS
          </h2>
          <p className="text-text-gray text-lg leading-relaxed">
            Too often, the athletes with the most promise have the least access to the resources that would let them grow. We exist to close that gap — through scholarships, camps, mentorship, performance consulting, and our own competitive teams.
          </p>
        </div>
      </section>

      {/* Programs Detail */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {programs.map((program, i) => (
            <div
              key={program.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-1 ${i > 0 ? "mt-1" : ""}`}
            >
              <div className={`bg-white p-10 md:p-14 flex flex-col justify-center ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <span className="font-display text-5xl text-mid-gray/40 leading-none mb-4">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl md:text-3xl tracking-wider text-text-dark mb-4">
                  {program.title.toUpperCase()}
                </h3>
                <p className="text-text-gray leading-relaxed mb-4">
                  {program.desc}
                </p>
                <p className="text-text-gray/70 text-sm leading-relaxed">
                  {program.detail}
                </p>
              </div>
              <div className={`bg-charcoal p-10 md:p-14 flex flex-col justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <blockquote className="font-display text-xl md:text-2xl tracking-wider text-white leading-snug">
                  {program.desc.toUpperCase()}
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="bg-off-white p-10 md:p-14">
              <p className="text-accent-dark text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Our Mission
              </p>
              <h3 className="font-display text-2xl md:text-3xl tracking-wider text-text-dark mb-6">
                EMPOWERING YOUTH THROUGH SPORT
              </h3>
              <p className="text-text-gray leading-relaxed">
                To empower youth to achieve their fullest potential through holistic development — emphasizing mental, physical, and social growth via sports participation and mentorship programs.
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

      {/* CTA */}
      <section className="py-20 md:py-28 bg-charcoal text-white noise-overlay text-center px-4">
        <div className="relative z-10">
          <h2 className="font-display text-4xl md:text-5xl tracking-wider mb-6">
            EVERY DOLLAR GOES TOWARD LEVELING THE PLAYING FIELD
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            Your contribution helps a young athlete attend a camp that changes their trajectory, earn a scholarship that keeps them in their sport, or find a mentor who shows them what is possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="inline-block bg-white text-charcoal font-bold text-sm uppercase tracking-wider px-10 py-4 hover:bg-off-white transition-colors"
            >
              Donate Now &rarr;
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-white/40 text-white font-bold text-sm uppercase tracking-wider px-10 py-4 hover:border-white transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
