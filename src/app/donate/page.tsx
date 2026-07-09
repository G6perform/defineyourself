import StripeButton from "@/components/StripeButton";

export const metadata = {
  title: "Donate | Define Yourself Inc.",
  description:
    "Support Define Yourself Inc. Your donation provides mentorship, athletic training, and life-changing opportunities for youth.",
};

const tiers = [
  {
    amount: "$25",
    desc: "Provides athletic gear for one young athlete to participate in our programs.",
  },
  {
    amount: "$50",
    desc: "Funds a month of mentorship sessions for a youth in our leadership program.",
  },
  {
    amount: "$100",
    desc: "Sponsors a young athlete for an entire season of training and development.",
  },
];

export default function Donate() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-charcoal text-white noise-overlay text-center px-4">
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            Define Yourself Inc.
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider mb-6">
            SUPPORT OUR MISSION
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Your donation provides mentorship, athletic training, and life-changing opportunities for youth. Every dollar makes a difference.
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
            Click below to make a secure donation via Stripe. Every contribution helps us empower the next generation.
          </p>
          <div className="flex justify-center">
            <StripeButton />
          </div>
        </div>
      </section>

      {/* Impact Tiers */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Your Impact
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark">
              EVERY DOLLAR COUNTS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {tiers.map((tier) => (
              <div
                key={tier.amount}
                className="bg-white p-10 text-center border border-mid-gray/30"
              >
                <p className="font-display text-6xl text-charcoal mb-4">
                  {tier.amount}
                </p>
                <p className="text-text-gray leading-relaxed text-sm">
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
