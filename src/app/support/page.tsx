"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

const programs = [
  {
    title: "Athlete Scholarships",
    desc: "Training, coaching, and equipment for athletes facing financial barriers.",
  },
  {
    title: "Performance Access",
    desc: "Advanced combine testing for teams and clubs that can't afford it.",
  },
  {
    title: "Athlete Mentorship",
    desc: "Sport, life, and career guidance from experienced athletes.",
  },
  {
    title: "Financial Literacy",
    desc: "Money management, credit building, and smart financial decisions.",
  },
];

export default function Support() {
  return (
    <>
      <style jsx global>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0;
            padding: 0;
          }
          .flyer {
            width: 8.5in;
            min-height: 11in;
            max-height: 11in;
            overflow: hidden;
            margin: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
        }
        @media screen {
          .flyer {
            max-width: 850px;
            margin: 2rem auto;
            box-shadow: 0 25px 60px rgba(0,0,0,0.3);
            border-radius: 4px;
          }
        }
      `}</style>

      {/* Download Button */}
      <div className="no-print bg-charcoal text-center py-4 px-4">
        <p className="text-white/60 text-sm mb-3">
          Use your browser&apos;s &quot;Save as PDF&quot; option for best results
        </p>
        <button
          onClick={() => window.print()}
          className="bg-white text-charcoal font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-full hover:bg-off-white transition-colors"
        >
          Download as PDF &darr;
        </button>
      </div>

      {/* Flyer */}
      <div className="flyer bg-white overflow-hidden">
        {/* Header */}
        <div className="px-10 pt-10 pb-6 flex items-center gap-6 border-b border-mid-gray/20">
          <Image
            src="/logo-badge.webp"
            alt="Define Yourself"
            width={80}
            height={80}
            className="w-20 h-20 shrink-0"
          />
          <div>
            <h1 className="font-display text-3xl md:text-4xl tracking-wider text-text-dark leading-none mb-1">
              DEFINE YOURSELF INC.
            </h1>
            <p className="text-text-gray text-sm">
              501(c)(3) Non-Profit &middot; EIN 88-3419481 &middot; Sacramento, California
            </p>
          </div>
        </div>

        {/* Who We Are */}
        <div className="px-10 py-7 border-b border-mid-gray/20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-gray mb-3">
            Who We Are
          </p>
          <p className="text-text-dark text-sm leading-relaxed mb-3">
            <span className="font-bold">Define Yourself Inc.</span> is a 501(c)(3) non-profit founded in Sacramento, California with one mission: <span className="font-bold">empowering youth athletes who have the drive but not the access.</span>
          </p>
          <p className="text-text-gray text-sm leading-relaxed">
            Too often, the most talented young athletes never reach their potential — not because of ability, but because of circumstance. They can&apos;t afford training. They don&apos;t have exposure. No one is showing them what&apos;s possible beyond the game. We exist to change that — through direct funding, hands-on mentorship, and programs that develop the whole athlete: mind, body, and future.
          </p>
        </div>

        {/* What Your Donation Does */}
        <div className="px-10 py-7 bg-off-white border-b border-mid-gray/20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-gray mb-3">
            What Your Donation Does
          </p>
          <p className="text-text-gray text-sm leading-relaxed mb-4">
            Every dollar goes directly toward removing the barriers between talented young athletes and the opportunities they deserve. Your contribution funds real programs with real impact:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {programs.map((program) => (
              <div
                key={program.title}
                className="bg-white border border-mid-gray/25 rounded-xl p-4"
              >
                <h3 className="font-display text-xs tracking-wider text-text-dark mb-1">
                  {program.title.toUpperCase()}
                </h3>
                <p className="text-text-gray text-[11px] leading-relaxed">
                  {program.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Levels */}
        <div className="px-10 py-7 border-b border-mid-gray/20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-gray mb-4">
            The Impact of Your Gift
          </p>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="bg-off-white rounded-xl p-4">
              <p className="font-display text-2xl text-text-dark mb-1">$25</p>
              <p className="text-text-gray text-[10px] leading-snug">Supplies for one athlete</p>
            </div>
            <div className="bg-off-white rounded-xl p-4">
              <p className="font-display text-2xl text-text-dark mb-1">$100</p>
              <p className="text-text-gray text-[10px] leading-snug">One month of training access</p>
            </div>
            <div className="bg-off-white rounded-xl p-4">
              <p className="font-display text-2xl text-text-dark mb-1">$250</p>
              <p className="text-text-gray text-[10px] leading-snug">Performance testing for a team</p>
            </div>
            <div className="bg-off-white rounded-xl p-4">
              <p className="font-display text-2xl text-text-dark mb-1">$500</p>
              <p className="text-text-gray text-[10px] leading-snug">Full scholarship for one athlete</p>
            </div>
          </div>
        </div>

        {/* CTA + QR */}
        <div className="px-10 py-7">
          <div className="bg-charcoal rounded-2xl px-8 py-6 flex items-center gap-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
            <div className="relative z-10 flex-1">
              <h2 className="font-display text-2xl tracking-wider text-white mb-2">
                HELP US LEVEL THE PLAYING FIELD
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Scan the QR code or visit our website to make a tax-deductible donation. Every dollar counts.
              </p>
              <div className="flex items-center gap-6 mt-4 text-xs text-white/70">
                <span className="font-bold text-white">defineyourself916.org/donate</span>
                <span>defineyourself916@gmail.com</span>
                <span>@define_yourself_916</span>
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-center shrink-0">
              <div className="bg-white rounded-xl p-3">
                <QRCodeSVG
                  value="https://defineyourself916.org/donate"
                  size={100}
                  level="M"
                />
              </div>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mt-2">
                Scan to Donate
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for web */}
      <div className="no-print h-16" />
    </>
  );
}
