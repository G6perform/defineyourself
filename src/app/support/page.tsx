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
        {/* Top Banner */}
        <div className="bg-charcoal text-white px-10 pt-10 pb-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
          <div className="relative z-10">
            <Image
              src="/logo.png"
              alt="Define Yourself"
              width={180}
              height={72}
              className="h-12 w-auto invert brightness-200 mx-auto mb-4"
            />
            <h1 className="font-display text-4xl md:text-5xl tracking-wider mb-2">
              LEVEL THE PLAYING FIELD
            </h1>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-[0.3em]">
              501(c)(3) Non-Profit &middot; EIN 88-3419481
            </p>
          </div>
        </div>

        {/* Mission Strip */}
        <div className="bg-off-white px-10 py-5 text-center border-b border-mid-gray/20">
          <p className="text-text-gray text-sm leading-relaxed max-w-xl mx-auto">
            <span className="font-bold text-text-dark">The athletes with the most promise have the least access.</span>{" "}
            Define Yourself exists to close that gap — through scholarships, performance access, mentorship, and financial literacy.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="px-10 py-8">
          <p className="text-text-gray text-[10px] font-bold uppercase tracking-[0.3em] mb-5 text-center">
            Our Programs
          </p>
          <div className="grid grid-cols-2 gap-4">
            {programs.map((program) => (
              <div
                key={program.title}
                className="border border-mid-gray/25 rounded-xl p-5"
              >
                <h3 className="font-display text-sm tracking-wider text-text-dark mb-1.5">
                  {program.title.toUpperCase()}
                </h3>
                <p className="text-text-gray text-xs leading-relaxed">
                  {program.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact + QR Row */}
        <div className="px-10 pb-8">
          <div className="bg-charcoal rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
            <div className="relative z-10 flex-1">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
                Your Impact
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <p className="text-white">
                  <span className="font-bold">$25</span>
                  <span className="text-white/50"> — Athlete supplies</span>
                </p>
                <p className="text-white">
                  <span className="font-bold">$250</span>
                  <span className="text-white/50"> — Team testing</span>
                </p>
                <p className="text-white">
                  <span className="font-bold">$100</span>
                  <span className="text-white/50"> — Month of training</span>
                </p>
                <p className="text-white">
                  <span className="font-bold">$500</span>
                  <span className="text-white/50"> — Full scholarship</span>
                </p>
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-center shrink-0">
              <div className="bg-white rounded-xl p-3">
                <QRCodeSVG
                  value="https://defineyourself916.org/donate"
                  size={110}
                  level="M"
                />
              </div>
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider mt-2">
                Scan to Donate
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-10 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-5 border-t border-mid-gray/20">
            <div className="flex items-center gap-6 text-xs text-text-gray">
              <span className="font-bold text-text-dark">defineyourself916.org</span>
              <span>defineyourself916@gmail.com</span>
              <span>@define_yourself_916</span>
            </div>
            <p className="text-xs text-text-gray">
              Sacramento, California &middot; All donations are tax-deductible
            </p>
          </div>
        </div>
      </div>

      {/* Spacer for web */}
      <div className="no-print h-16" />
    </>
  );
}
