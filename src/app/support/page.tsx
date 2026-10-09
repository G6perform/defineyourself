"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

const programs = [
  {
    title: "Athlete Development Scholarships",
    desc: "Funding training, coaching, and equipment for athletes facing financial barriers.",
  },
  {
    title: "Performance Access",
    desc: "Bringing advanced combine testing to teams, schools, and clubs that can't afford it.",
  },
  {
    title: "Athlete Mentorship",
    desc: "Pairing experienced athletes with youth for sport, life, and career guidance.",
    comingSoon: true,
  },
  {
    title: "Financial Literacy",
    desc: "Teaching athletes to manage money, build credit, and make smart financial decisions.",
    comingSoon: true,
  },
];

export default function Support() {
  return (
    <>
      {/* Print-only styles */}
      <style jsx global>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-page {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-break-avoid { break-inside: avoid; }
          section { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; }
        }
      `}</style>

      <div className="print-page">
        {/* Download Button */}
        <div className="no-print bg-charcoal text-center py-4 px-4">
          <button
            onClick={() => window.print()}
            className="bg-white text-charcoal font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-full hover:bg-off-white transition-colors"
          >
            Download as PDF &darr;
          </button>
        </div>

        {/* Header */}
        <section className="py-12 md:py-16 bg-charcoal text-white noise-overlay text-center px-4">
          <div className="relative z-10 max-w-4xl mx-auto">
            <Image
              src="/logo.png"
              alt="Define Yourself"
              width={200}
              height={80}
              className="h-14 w-auto invert brightness-200 mx-auto mb-6"
            />
            <h1 className="font-display text-4xl md:text-6xl tracking-wider mb-4">
              LEVEL THE PLAYING FIELD
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
              Empowering youth to achieve their fullest potential through sport,
              mentorship, and holistic development.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-10 md:py-14 bg-white print-break-avoid">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              Our Mission
            </p>
            <h2 className="font-display text-2xl md:text-3xl tracking-wider text-text-dark mb-4">
              THE ATHLETES WITH THE MOST PROMISE HAVE THE LEAST ACCESS
            </h2>
            <p className="text-text-gray leading-relaxed max-w-3xl mx-auto">
              Too often, talented young athletes never reach their potential — not
              because of ability, but because of access. Define Yourself exists to
              close that gap through scholarships, performance access, mentorship,
              and financial literacy.
            </p>
          </div>
        </section>

        {/* Programs */}
        <section className="py-10 md:py-14 bg-off-white print-break-avoid">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-text-gray text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-center">
              Our Programs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {programs.map((program) => (
                <div
                  key={program.title}
                  className="bg-white rounded-xl p-6 border border-mid-gray/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-lg tracking-wider text-text-dark">
                      {program.title.toUpperCase()}
                    </h3>
                    {program.comingSoon && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-text-gray/50 border border-mid-gray/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-text-gray text-sm leading-relaxed">
                    {program.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Help + QR */}
        <section className="py-10 md:py-14 bg-charcoal text-white noise-overlay print-break-avoid">
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                  How You Can Help
                </p>
                <h2 className="font-display text-2xl md:text-3xl tracking-wider mb-4">
                  EVERY DOLLAR MAKES A DIFFERENCE
                </h2>
                <p className="text-white/60 leading-relaxed mb-6">
                  Your contribution — of any size — directly funds the programs
                  that change trajectories. All donations are tax-deductible.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-white/80">
                    <span className="text-white font-bold">$25</span>
                    <span className="text-white/50"> — Supplies for one athlete</span>
                  </p>
                  <p className="text-white/80">
                    <span className="text-white font-bold">$100</span>
                    <span className="text-white/50"> — One month of training access</span>
                  </p>
                  <p className="text-white/80">
                    <span className="text-white font-bold">$250</span>
                    <span className="text-white/50"> — Performance testing for a team</span>
                  </p>
                  <p className="text-white/80">
                    <span className="text-white font-bold">$500</span>
                    <span className="text-white/50"> — Full scholarship for one athlete</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-white rounded-2xl p-4 mb-4">
                  <QRCodeSVG
                    value="https://defineyourself916.org/donate"
                    size={160}
                    level="M"
                  />
                </div>
                <p className="text-white/60 text-sm mb-1">
                  Scan to donate
                </p>
                <p className="text-white font-bold text-sm tracking-wider">
                  defineyourself916.org/donate
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Info */}
        <section className="py-8 md:py-10 bg-white print-break-avoid">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <p className="text-text-dark font-bold text-sm mb-1">
                  Define Yourself Inc.
                </p>
                <p className="text-text-gray text-sm">
                  501(c)(3) Non-Profit &middot; EIN 88-3419481
                </p>
                <p className="text-text-gray text-sm">
                  Sacramento, California
                </p>
              </div>
              <div className="text-sm text-text-gray space-y-1 md:text-right">
                <p>defineyourself916@gmail.com</p>
                <p>defineyourself916.org</p>
                <p>@define_yourself_916</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA — web only */}
        <section className="no-print py-14 bg-off-white text-center px-4">
          <a
            href="/donate"
            className="inline-block bg-charcoal text-white font-bold text-lg uppercase tracking-wider px-16 py-5 rounded-full hover:bg-charcoal/90 transition-colors"
          >
            Donate Now &rarr;
          </a>
        </section>
      </div>
    </>
  );
}
