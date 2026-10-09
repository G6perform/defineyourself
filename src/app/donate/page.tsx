export const metadata = {
  title: "Donate | Define Yourself Inc.",
  description:
    "Your contribution directly funds scholarships, performance access, mentorship, and financial literacy for youth athletes who have the drive but not the access.",
};

const programs = [
  {
    title: "Athlete Development Scholarships",
    desc: "Covering training, coaching, and equipment costs for talented athletes who face financial barriers to high-level development.",
    detail:
      "Too many athletes with real potential never get the chance to develop because of cost. Our scholarships remove that barrier — funding the training, coaching, and gear that let them compete at the level they deserve.",
    href: "https://www.zeffy.com/en-US/donation-form/donate-to-change-lives-17833",
    active: true,
  },
  {
    title: "Performance Access",
    desc: "Bringing advanced combine testing and performance consulting to teams, schools, and clubs that lack the funding to access it on their own.",
    detail:
      "Advanced performance testing shouldn't be reserved for programs with big budgets. We bring the same combine testing and consulting used by elite programs directly to the teams and clubs that need it most.",
    href: "https://www.zeffy.com/en-US/donation-form/metrix-team-access-fund",
    active: true,
  },
  {
    title: "Athlete Mentorship",
    desc: "Pairing experienced athletes with younger ones for guidance in their sport, financial literacy, mental performance, and personal growth beyond the game.",
    detail:
      "Development doesn't stop at the field. Our mentors help young athletes navigate the mental side of competition, build financial literacy, and prepare for life beyond sport — because the best athletes are built from the inside out.",
    href: null,
    active: false,
  },
  {
    title: "Financial Literacy",
    desc: "Teaching athletes how to manage money, build credit, and make smart financial decisions — skills they'll carry long after the final whistle.",
    detail:
      "Most athletes never learn about money until it's too late. We teach budgeting, credit building, investing basics, and smart financial decisions early — so our athletes are prepared whether they go pro or pursue a career beyond sport.",
    href: null,
    active: false,
  },
];

export default function Donate() {
  return (
    <div>
      {/* Hero with big Donate CTA */}
      <section className="py-24 md:py-36 bg-charcoal text-white noise-overlay text-center px-4">
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            501(c)(3) Non-Profit &middot; EIN 88-3419481
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider mb-6">
            LEVEL THE PLAYING FIELD
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Every dollar goes toward the athletes who have the drive but not the
            access. Your contribution directly funds the programs that change
            trajectories.
          </p>
          <a
            href="#programs"
            className="inline-block bg-white text-charcoal font-bold text-lg uppercase tracking-wider px-16 py-5 hover:bg-off-white transition-colors"
          >
            Donate Now &darr;
          </a>
        </div>
      </section>

      {/* Program Cards */}
      <section id="programs" className="py-20 md:py-28 bg-off-white scroll-mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Where Your Donation Goes
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark">
              CHOOSE A PROGRAM TO SUPPORT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {programs.map((program, i) => (
              <div
                key={program.title}
                className={`flex flex-col ${
                  program.active
                    ? "bg-white border border-mid-gray/30"
                    : "bg-white/60 border border-mid-gray/20"
                }`}
              >
                <div className="p-10 md:p-12 flex flex-col flex-1">
                  <span className="font-display text-5xl text-mid-gray/40 leading-none mb-4">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl tracking-wider text-text-dark mb-4">
                    {program.title.toUpperCase()}
                  </h3>
                  <p className="text-text-gray leading-relaxed mb-4">
                    {program.desc}
                  </p>
                  <p className="text-text-gray/70 text-sm leading-relaxed mb-8">
                    {program.detail}
                  </p>
                  <div className="mt-auto">
                    {program.active ? (
                      <a
                        href={program.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-charcoal text-white font-bold text-sm uppercase tracking-wider px-10 py-4 hover:bg-charcoal/90 transition-colors w-full text-center"
                      >
                        Donate to {program.title} &rarr;
                      </a>
                    ) : (
                      <div className="border-2 border-mid-gray/30 text-text-gray/50 font-bold text-sm uppercase tracking-wider px-10 py-4 text-center">
                        Coming Soon
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section className="py-20 md:py-28 bg-charcoal text-white noise-overlay text-center px-4">
        <div className="relative z-10 max-w-3xl mx-auto">
          <blockquote className="font-display text-3xl md:text-4xl tracking-wider leading-tight mb-8">
            &ldquo;WE WOULD BE HONORED TO PARTNER WITH YOU. ON BEHALF OF EVERY
            ATHLETE YOU HELP REACH NEW HEIGHTS — THANK YOU.&rdquo;
          </blockquote>
          <p className="text-white/50 text-sm font-semibold uppercase tracking-wider">
            Nicholas Pohl — Define Yourself Inc.
          </p>
        </div>
      </section>
    </div>
  );
}
