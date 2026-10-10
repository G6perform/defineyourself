export const metadata = {
  title: "Donate | Define Yourself Inc.",
  description:
    "Your contribution directly funds scholarships, performance access, mentorship, and financial literacy for young people who have the drive but not the access.",
};

const programs = [
  {
    title: "Youth Development Scholarships",
    desc: "Funding training, coaching, and resources for young people who face financial barriers to development.",
    detail:
      "Too many young people with real potential never get the chance to develop because of cost. Our scholarships remove that barrier — funding the resources that let them grow and reach the level they deserve.",
    href: "https://www.zeffy.com/en-US/donation-form/donate-to-change-lives-17833",
    active: true,
  },
  {
    title: "Performance Access",
    desc: "Partnering with schools, clubs, and community programs that lack funding to bring development resources to the youth who need them.",
    detail:
      "Access to quality development programs shouldn't be reserved for those with big budgets. We bring the same resources used by elite programs directly to the communities that need them most.",
    href: "https://www.zeffy.com/en-US/donation-form/metrix-team-access-fund",
    active: true,
  },
  {
    title: "Mentorship",
    desc: "Pairing young people with experienced mentors for guidance in personal growth, financial literacy, and building a path forward.",
    detail:
      "Development doesn't stop at skill building. Our mentors help youth navigate challenges, build confidence, develop financial literacy, and prepare for life — because the strongest individuals are built from the inside out.",
    href: null,
    active: false,
  },
  {
    title: "Financial Literacy",
    desc: "Teaching young people how to manage money, build credit, and make smart financial decisions — skills they will carry for life.",
    detail:
      "Most young people never learn about money until it's too late. We teach budgeting, credit building, investing basics, and smart financial decisions early — so our youth are prepared for whatever comes next.",
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
            Every dollar goes toward the young people who have the drive but not
            the access. Your contribution directly funds the programs that
            change trajectories.
          </p>
          <a
            href="#programs"
            className="inline-block bg-white text-charcoal font-bold text-lg uppercase tracking-wider px-16 py-5 rounded-full hover:bg-off-white transition-colors"
          >
            Donate Now &darr;
          </a>
        </div>
      </section>

      {/* General Donation */}
      <section id="programs" className="py-20 md:py-28 bg-white scroll-mt-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            General Donation
          </p>
          <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark mb-4">
            SUPPORT OUR MISSION
          </h2>
          <p className="text-text-gray text-lg leading-relaxed mb-10">
            Not sure which program to support? Make a general donation and we
            will put it where it is needed most.
          </p>
          <a
            href="https://www.zeffy.com/en-US/donation-form/support-our-mission-266"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-charcoal text-white font-bold text-lg uppercase tracking-wider px-16 py-5 rounded-full hover:bg-charcoal/90 transition-colors"
          >
            Donate &rarr;
          </a>
        </div>
      </section>

      {/* Program Cards */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Where Your Donation Goes
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark">
              OR CHOOSE A PROGRAM TO SUPPORT
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
                        className="inline-block bg-charcoal text-white font-bold text-sm uppercase tracking-wider px-10 py-4 rounded-full hover:bg-charcoal/90 transition-colors w-full text-center"
                      >
                        Donate &rarr;
                      </a>
                    ) : (
                      <div className="border-2 border-mid-gray/30 text-text-gray/50 font-bold text-sm uppercase tracking-wider px-10 py-4 rounded-full text-center">
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

    </div>
  );
}
