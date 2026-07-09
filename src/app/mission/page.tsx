import Image from "next/image";

export const metadata = {
  title: "Our Mission | Define Yourself Inc.",
  description:
    "Define Yourself Inc. empowers youth through sport, mentorship, education, financial literacy, and career development. 501(c)(3) non-profit in Sacramento, CA.",
};

const values = [
  {
    title: "Athletic Development",
    desc: "High-level training, coaching, and competition — giving every athlete the resources to reach their potential regardless of background.",
  },
  {
    title: "Mentorship",
    desc: "Pairing young athletes with experienced mentors who guide them in sport, life decisions, and personal growth beyond the game.",
  },
  {
    title: "Education",
    desc: "Academic support and educational programming that keeps athletes on track in the classroom — because development starts with the mind.",
  },
  {
    title: "Financial Literacy",
    desc: "Teaching athletes how to manage money, build credit, and make smart financial decisions — skills they'll carry long after the final whistle.",
  },
  {
    title: "Career Development",
    desc: "Preparing athletes for life after sport with career counseling, resume building, networking opportunities, and exposure to professional pathways.",
  },
  {
    title: "Community Impact",
    desc: "Strengthening the communities our athletes come from by investing in youth development and creating a culture of contribution.",
  },
];

export default function Mission() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="https://cdn.durable.co/getty/8Uos2SVYSf43zv7sFbDq0uyH3aDWqYU4LfTFB6CRBBrS4EVEwY9c1iR84vG2aTjO.jpg"
          alt="Youth athletes celebrating"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <p className="text-white/50 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            501(c)(3) Non-Profit &middot; EIN 88-3419481
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider text-white">
            OUR MISSION
          </h1>
        </div>
      </section>

      {/* Core Statement */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl tracking-wider text-text-dark leading-tight mb-8">
            &ldquo;TO EMPOWER YOUTH TO ACHIEVE THEIR FULLEST POTENTIAL THROUGH HOLISTIC DEVELOPMENT&rdquo;
          </blockquote>
          <p className="text-text-gray text-lg leading-relaxed max-w-3xl mx-auto">
            We believe that high-level athletic training and genuine mentorship can teach and inspire the next generation of leaders, prepare them to succeed in every arena of life, and strengthen the communities they come from.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 md:py-28 bg-charcoal text-white noise-overlay">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            The Problem We Solve
          </p>
          <h2 className="font-display text-3xl md:text-5xl tracking-wider mb-8 leading-tight">
            THE ATHLETES WITH THE MOST PROMISE HAVE THE LEAST ACCESS
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Too often, the athletes with the most promise have the least access to the resources that would let them grow — not just on the field, but in the classroom, in their finances, and in their careers. We exist to close that gap with a complete approach to youth development.
          </p>
        </div>
      </section>

      {/* Mission & Vision Side by Side */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="bg-white p-10 md:p-14">
              <p className="text-accent-dark text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Our Mission
              </p>
              <h3 className="font-display text-2xl md:text-3xl tracking-wider text-text-dark mb-6">
                EMPOWERING YOUTH THROUGH SPORT
              </h3>
              <p className="text-text-gray leading-relaxed">
                To empower youth to achieve their fullest potential through holistic development — emphasizing mental, physical, and social growth via sports participation, mentorship, education, and career preparation.
              </p>
            </div>
            <div className="bg-charcoal p-10 md:p-14">
              <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Our Vision
              </p>
              <h3 className="font-display text-2xl md:text-3xl tracking-wider text-white mb-6">
                BUILDING COMPLETE LEADERS
              </h3>
              <p className="text-white/60 leading-relaxed">
                To cultivate a generation of resilient leaders equipped with the skills, education, financial knowledge, and confidence to excel in all facets of life — while fostering a culture of community contribution and positive social impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Beyond The Game
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark">
              DEVELOPING THE COMPLETE PERSON
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {values.map((value, i) => (
              <div
                key={value.title}
                className={`p-10 ${i % 2 === 0 ? "bg-off-white" : "bg-white"} border border-mid-gray/30`}
              >
                <span className="font-display text-5xl text-mid-gray/40 leading-none">
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl tracking-wider text-text-dark mt-4 mb-3">
                  {value.title.toUpperCase()}
                </h3>
                <p className="text-text-gray text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Life After Sport */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="bg-charcoal p-10 md:p-14 flex flex-col justify-center">
              <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Life After Sport
              </p>
              <h3 className="font-display text-2xl md:text-3xl tracking-wider text-white mb-6">
                THE GAME DOESN&apos;T LAST FOREVER. THE LESSONS SHOULD.
              </h3>
              <p className="text-white/60 leading-relaxed">
                Most athletic careers end. We prepare our athletes for what comes next — with financial literacy training, career counseling, educational support, and professional networking. When the game is over, our athletes are ready.
              </p>
            </div>
            <div className="bg-white p-10 md:p-14 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h4 className="font-display text-lg tracking-wider text-text-dark mb-2">
                    FINANCIAL LITERACY
                  </h4>
                  <p className="text-text-gray text-sm leading-relaxed">
                    Budgeting, credit building, investing basics, and smart money decisions — taught early so athletes are financially prepared whether they go pro or not.
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-lg tracking-wider text-text-dark mb-2">
                    CAREER COUNSELING
                  </h4>
                  <p className="text-text-gray text-sm leading-relaxed">
                    Resume workshops, interview prep, industry exposure, and professional mentorship — building pathways to careers in and beyond sport.
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-lg tracking-wider text-text-dark mb-2">
                    ACADEMIC SUPPORT
                  </h4>
                  <p className="text-text-gray text-sm leading-relaxed">
                    Tutoring, study skills, college prep, and academic accountability — because the strongest athletes are students first.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-charcoal text-white noise-overlay text-center px-4">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl tracking-wider mb-6">
            EVERY DOLLAR GOES TOWARD LEVELING THE PLAYING FIELD
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            Your contribution helps a young athlete attend a camp that changes their trajectory, earn a scholarship, find a mentor, learn to manage their money, and prepare for a career beyond the game.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="inline-block bg-white text-charcoal font-bold text-sm uppercase tracking-wider px-10 py-4 hover:bg-off-white transition-colors"
            >
              Support Our Mission &rarr;
            </a>
            <a
              href="/programs"
              className="inline-block border-2 border-white/40 text-white font-bold text-sm uppercase tracking-wider px-10 py-4 hover:border-white transition-colors"
            >
              View Programs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
