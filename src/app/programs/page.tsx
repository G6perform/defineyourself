import Image from "next/image";
import { images } from "@/lib/images";

export const metadata = {
  title: "Our Programs | Define Yourself Inc.",
  description:
    "Youth Development Scholarships, Performance Access, Mentorship, and Financial Literacy.",
};

const programs = [
  {
    title: "Youth Development Scholarships",
    desc: "Funding training, coaching, and resources for young people who face financial barriers to development.",
    detail:
      "Too many young people with real potential never get the chance to develop because of cost. Our scholarships remove that barrier — funding the resources that let them grow and reach the level they deserve.",
    active: true,
  },
  {
    title: "Performance Access",
    desc: "Partnering with schools, clubs, and community programs that lack funding to bring development resources to the youth who need them.",
    detail:
      "Access to quality development programs shouldn't be reserved for those with big budgets. We bring the same resources used by elite programs directly to the communities that need them most.",
    active: true,
  },
  {
    title: "Mentorship",
    desc: "Pairing young people with experienced mentors for guidance in personal growth, financial literacy, and building a path forward.",
    detail:
      "Development doesn't stop at skill building. Our mentors help youth navigate challenges, build confidence, develop financial literacy, and prepare for life — because the strongest individuals are built from the inside out.",
    active: false,
  },
  {
    title: "Financial Literacy",
    desc: "Teaching young people how to manage money, build credit, and make smart financial decisions — skills they will carry for life.",
    detail:
      "Most young people never learn about money until it's too late. We teach budgeting, credit building, investing basics, and smart financial decisions early — so our youth are prepared for whatever comes next.",
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
          alt="Youth development"
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
            THE YOUNG PEOPLE WITH THE MOST PROMISE HAVE THE LEAST ACCESS
          </h2>
          <p className="text-text-gray text-lg leading-relaxed">
            Too often, the youth with the most potential have the least access
            to the resources that would let them grow. We exist to close that gap
            — through scholarships, development access, mentorship, and
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
                className={`p-10 md:p-12 flex flex-col rounded-2xl ${
                  i % 2 === 0
                    ? "bg-charcoal text-white"
                    : "bg-white border border-mid-gray/30 shadow-lg"
                }`}
              >
                <span
                  className={`font-display text-6xl leading-none mb-6 ${
                    i % 2 === 0 ? "text-white/30" : "text-charcoal/20"
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
                EMPOWERING YOUTH
              </h3>
              <p className="text-text-gray leading-relaxed">
                To empower youth to achieve their fullest potential through
                holistic development — emphasizing mental, physical, and social
                growth through mentorship, education, and development programs.
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
            Your contribution helps a young person earn a scholarship, find a
            mentor who shows them what is possible, or access the resources
            that change their trajectory.
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
