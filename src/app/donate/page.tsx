import StripeButton from "@/components/StripeButton";

export const metadata = {
  title: "Donate | Define Yourself Inc.",
  description:
    "Your contribution directly funds scholarships, ID camps, mentorship, and performance access for youth athletes who have the drive but not the access.",
};

const impact = [
  {
    label: "Scholarships",
    desc: "Fund training, coaching, and equipment for athletes facing financial barriers.",
  },
  {
    label: "ID Camps",
    desc: "Give underserved athletes a platform in front of college and semi-pro recruiters.",
  },
  {
    label: "Mentorship",
    desc: "Pair experienced athletes with youth for sport, financial literacy, and life guidance.",
  },
  {
    label: "Performance",
    desc: "Bring advanced combine testing to schools and clubs that can't afford it.",
  },
  {
    label: "DY Teams",
    desc: "Give young athletes a team, real competition, and a development program built around our mission.",
  },
];

export default function Donate() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-charcoal text-white noise-overlay text-center px-4">
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            501(c)(3) Non-Profit &middot; EIN 88-3419481
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider mb-6">
            LEVEL THE PLAYING FIELD
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Every dollar goes toward the athletes who have the drive but not the access. Your contribution directly funds the programs that change trajectories.
          </p>
        </div>
      </section>

      {/* Stripe */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Secure Donation
          </p>
          <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark mb-4">
            MAKE A DONATION
          </h2>
          <p className="text-text-gray text-lg mb-12 leading-relaxed">
            It helps a young athlete attend a camp that changes their trajectory, earn a scholarship that keeps them in their sport, or find a mentor who shows them what is possible.
          </p>
          <div className="flex justify-center">
            <StripeButton />
          </div>
        </div>
      </section>

      {/* Where It Goes */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Where It Goes
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark">
              YOUR SUPPORT MAKES POSSIBLE
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-1">
            {impact.map((item) => (
              <div
                key={item.label}
                className="bg-white p-8 text-center border border-mid-gray/30 group hover:bg-charcoal transition-colors duration-300"
              >
                <h3 className="font-display text-xl tracking-wider text-text-dark group-hover:text-white mb-3 transition-colors">
                  {item.label.toUpperCase()}
                </h3>
                <p className="text-text-gray text-xs leading-relaxed group-hover:text-white/60 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section className="py-20 md:py-28 bg-charcoal text-white noise-overlay text-center px-4">
        <div className="relative z-10 max-w-3xl mx-auto">
          <blockquote className="font-display text-3xl md:text-4xl tracking-wider leading-tight mb-8">
            &ldquo;WE WOULD BE HONORED TO PARTNER WITH YOU. ON BEHALF OF EVERY ATHLETE YOU HELP REACH NEW HEIGHTS — THANK YOU.&rdquo;
          </blockquote>
          <p className="text-white/50 text-sm font-semibold uppercase tracking-wider">
            Nicholas Pohl — Define Yourself Inc.
          </p>
        </div>
      </section>
    </div>
  );
}
