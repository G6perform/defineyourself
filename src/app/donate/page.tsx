import StripeButton from "@/components/StripeButton";

export const metadata = {
  title: "Donate | Define Yourself Inc.",
  description:
    "Support Define Yourself Inc. Your donation provides mentorship, athletic training, and life-changing opportunities for youth.",
};

export default function Donate() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-charcoal text-white py-16 md:py-24 text-center px-4">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
          Support Our Mission
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto text-lg mb-4">
          Your donation provides mentorship, athletic training, and life-changing opportunities for youth. Every dollar makes a difference in a young athlete&apos;s journey.
        </p>
      </section>

      {/* Donate Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-4">
            Make a Donation
          </h2>
          <p className="text-text-secondary text-lg mb-10">
            Click below to make a secure donation via Stripe. Every contribution helps us empower the next generation of leaders.
          </p>
          <div className="flex justify-center">
            <StripeButton />
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-charcoal mb-4">
              Your Impact
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Here&apos;s how your generous contribution helps youth in our community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
            ].map((tier) => (
              <div
                key={tier.amount}
                className="bg-cream rounded-2xl p-8 text-center border border-taupe/15"
              >
                <p className="font-serif text-4xl font-bold text-gold-dark mb-4">
                  {tier.amount}
                </p>
                <p className="text-text-secondary leading-relaxed">
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
