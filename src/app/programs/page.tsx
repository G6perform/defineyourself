import Image from "next/image";
import { images } from "@/lib/images";

export const metadata = {
  title: "Our Programs | Define Yourself Inc.",
  description:
    "Athlete Development Scholarships, Performance Access, Athlete Mentorship, and Financial Literacy.",
};

const programs = [
  {
    title: "Athlete Development Scholarships",
    desc: "Covering training, coaching, and equipment costs for talented athletes who face financial barriers to high-level development.",
    detail:
      "Too many athletes with real potential never get the chance to develop because of cost. Our scholarships remove that barrier — funding the training, coaching, and gear that let them compete at the level they deserve.",
    active: true,
  },
  {
    title: "Performance Access",
    desc: "Bringing advanced combine testing and performance consulting to teams, schools, and clubs that lack the funding to access it on their own.",
    detail:
      "Advanced performance testing shouldn't be reserved for programs with big budgets. We bring the same combine testing and consulting used by elite programs directly to the teams and clubs that need it most.",
    active: true,
  },
  {
    title: "Athlete Mentorship",
    desc: "Pairing experienced athletes with younger ones for guidance in their sport, financial literacy, mental performance, and personal growth beyond the game.",
    detail:
      "Development doesn't stop at the field. Our mentors help young athletes navigate the mental side of competition, build financial literacy, and prepare for life beyond sport — because the best athletes are built from the inside out.",
    active: false,
  },
  {
    title: "Financial Literacy",
    desc: "Teaching athletes how to manage money, build credit, and make smart financial decisions — skills they'll carry long after the final whistle.",
    detail:
      "Most athletes never learn about money until it's too late. We teach budgeting, credit building, investing basics, and smart financial decisions early — so our athletes are prepared whether they go pro or pursue a career beyond sport.",
    active: false,
  },
];

export default function Programs() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src={images.programsHero}
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
            Too often, the athletes with the most promise have the least access
            to the resources that would let them grow. We exist to close that gap
            — through scholarships, performance access, mentorship, and
            financial literacy.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program, i) => (
              <div
                key={program.title}
                className={`p-10 md:p-12 flex flex-col ${
                  i % 2 === 0
                    ? "bg-charcoal text-white"
                    : "bg-white border border-mid-gray/20"
                }`}
              >
                <span
                  className={`font-display text-6xl leading-none mb-6 ${
                    i % 2 === 0 ? "text-white/15" : "text-mid-gray/25"
                  }`}
                >
                  0{i + 1}
                </span>
                <div className="flex items-center gap-4 mb-4">
                  <h3
                    className={`font-display text-2xl md:text-3xl tracking-wider ${
                      i % 2 === 0 ? "text-white" : "text-text-dark"
                    }`}
                  >
                    {program.title.toUpperCase()}
                  </h3>
                  {!program.active && (
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap border ${
                        i % 2 === 0
                          ? "text-white/40 border-white/20"
                          : "text-text-gray/50 border-mid-gray/30"
                      }`}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>
                <p
                  className={`leading-relaxed mb-3 ${
                    i % 2 === 0 ? "text-white/70" : "text-text-gray"
                  }`}
                >
                  {program.desc}
                </p>
                <p
                  className={`text-sm leading-relaxed ${
                    i % 2 === 0 ? "text-white/40" : "text-text-gray/60"
                  }`}
                >
                  {program.detail}
                </p>
              </div>
            ))}
          </div>
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
                To empower youth to achieve their fullest potential through
                holistic development — emphasizing mental, physical, and social
                growth via sports participation and mentorship programs.
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
                To cultivate a generation of resilient leaders equipped with the
                skills and confidence to excel in all facets of life, while
                fostering a culture of community contribution and positive social
                impact.
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
            Your contribution helps a young athlete attend a camp that changes
            their trajectory, earn a scholarship that keeps them in their sport,
            or find a mentor who shows them what is possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="inline-block bg-white text-charcoal font-bold text-sm uppercase tracking-wider px-10 py-4 rounded-full hover:bg-off-white transition-colors"
            >
              Donate Now &rarr;
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-white/40 text-white font-bold text-sm uppercase tracking-wider px-10 py-4 rounded-full hover:border-white transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
