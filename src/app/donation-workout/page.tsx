import Image from "next/image";
import HeroSignup from "./HeroSignup";

export const metadata = {
  title: "Define Your Saturday | Define Yourself Inc.",
  description:
    "Join us every Saturday at 10 AM at G6 Performance for a community workout. Donate what you can — every dollar funds training and development for student athletes who need it most.",
};

export default function DonationWorkoutPage() {
  return (
    <div>
      {/* Hero with Signup */}
      <section className="py-24 md:py-36 bg-charcoal text-white noise-overlay text-center px-4">
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            Every Saturday &middot; 10:00 AM
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider mb-6">
            DEFINE YOUR SATURDAY
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            A community workout hosted at G6 Performance — open to everyone, all fitness levels.
            No set price. Just show up, push yourself, and donate what you can.
            Every dollar goes directly to Define Yourself.
          </p>
          <HeroSignup />
        </div>
      </section>

      {/* Details */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { label: "When", value: "Every Saturday", sub: "10:00 AM" },
              { label: "Where", value: "G6 Performance", sub: "Sacramento, CA" },
              { label: "Cost", value: "Donate What You Can", sub: "100% goes to Define Yourself" },
            ].map((item) => (
              <div key={item.label} className="text-center border border-mid-gray p-8">
                <p className="text-text-gray text-xs font-semibold uppercase tracking-[0.2em] mb-2">{item.label}</p>
                <p className="font-display text-2xl tracking-wider text-text-dark">{item.value}</p>
                <p className="text-text-gray text-sm mt-1">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* What to Expect */}
          <div className="text-center mb-4">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-4">What to Expect</p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark mb-8">
              SHOW UP. WORK HARD. GIVE BACK.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              "45\u201360 minute full-body workout",
              "Led by G6 Performance coaches",
              "All fitness levels welcome",
              "No equipment needed \u2014 just show up",
              "Water provided",
              "Donations collected on-site",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-accent font-bold text-lg leading-tight flex-shrink-0">&rsaquo;</span>
                <span className="text-text-gray text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About + Logo */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <div className="flex-shrink-0">
              <Image
                src="/logo-badge.webp"
                alt="Define Yourself 501(c)(3)"
                width={160}
                height={160}
                className="rounded-full"
              />
            </div>
            <div>
              <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-3">501(c)(3) Non-Profit</p>
              <h2 className="font-display text-3xl tracking-wider text-text-dark mb-4">
                ABOUT DEFINE YOURSELF
              </h2>
              <p className="text-text-gray text-base leading-relaxed mb-3">
                Define Yourself Inc. is a 501(c)(3) nonprofit founded to provide performance testing, training, and athlete development resources to student athletes in the Sacramento community &mdash; regardless of their family&apos;s financial situation.
              </p>
              <p className="text-text-gray text-base leading-relaxed mb-5">
                5% of all G6 Performance revenue is donated directly to Define Yourself each quarter, and 100% of donation workout proceeds go straight to the fund. Your contribution helps cover evaluations, training scholarships, nutrition guidance, and recruiting support for young athletes who need it most.
              </p>
              <a
                href="https://www.zeffy.com/en-US/donation-form/donate-to-change-lives-17833"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-charcoal text-white font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-full hover:bg-text-dark transition-colors"
              >
                Make a Donation
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
