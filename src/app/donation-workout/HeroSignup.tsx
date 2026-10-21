"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

function getNextSession(): { date: string; day: string; time: string } {
  const now = new Date();
  const pt = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const dayOfWeek = pt.getDay(); // 0=Sun, 2=Tue, 6=Sat
  const hour = pt.getHours();
  const minute = pt.getMinutes();

  // Calculate days until next Tuesday (2) and Saturday (6)
  let daysToTue = (2 - dayOfWeek + 7) % 7;
  let daysToSat = (6 - dayOfWeek + 7) % 7;

  // If today is Tuesday and past 6:30pm, skip to next week
  if (daysToTue === 0 && (hour > 18 || (hour === 18 && minute >= 30))) daysToTue = 7;
  // If today is Saturday and past 10am, skip to next week
  if (daysToSat === 0 && hour >= 10) daysToSat = 7;
  // If neither is today, ensure non-zero
  if (daysToTue === 0 && dayOfWeek !== 2) daysToTue = 7;
  if (daysToSat === 0 && dayOfWeek !== 6) daysToSat = 7;

  const isTuesday = daysToTue <= daysToSat;
  const daysUntil = isTuesday ? daysToTue : daysToSat;

  const next = new Date(now);
  next.setDate(now.getDate() + daysUntil);
  return {
    date: next.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    day: isTuesday ? "Tuesday" : "Saturday",
    time: isTuesday ? "6:30 PM" : "10:00 AM",
    coach: isTuesday ? "Coach Gabrielle of G6 Performance" : "Coach Hammer of G6 Performance",
  };
}

export default function HeroSignup() {
  const nextSession = useMemo(() => getNextSession(), []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || state === "submitting") return;
    setState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/donation-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim() }),
      });
      if (res.ok) {
        setState("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-3xl tracking-wider mb-3">YOU&apos;RE IN</h3>
        <p className="text-white/60 text-lg">We&apos;ll see you {nextSession.day} at {nextSession.time} w/ {nextSession.coach}.</p>
        <p className="text-white/40 text-sm mt-1">G6 Performance — Sacramento, CA</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Image
        src="/logo-badge.webp"
        alt="Define Yourself 501(c)(3)"
        width={80}
        height={80}
        className="rounded-full mx-auto mb-5"
      />
      <p className="font-display text-2xl tracking-wider mb-1">{nextSession.day} w/ {nextSession.coach}</p>
      <p className="font-display text-2xl tracking-wider mb-3">{nextSession.date} &middot; {nextSession.time}</p>
      <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.2em] mb-8">10 Slots Available</p>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-white/50 text-sm font-medium mb-1.5">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-white/50 text-sm font-medium mb-1.5">Phone *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(916) 555-1234"
            required
            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-white/50 text-sm font-medium mb-1.5">
            Email <span className="text-white/20">(optional)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>
        {state === "error" && <p className="text-red-400 text-sm text-center">{errorMsg}</p>}
        <button
          type="submit"
          disabled={state === "submitting"}
          className="w-full py-4 bg-white text-charcoal font-bold text-sm uppercase tracking-wider rounded-full hover:bg-off-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {state === "submitting" ? "Signing Up..." : "Sign Me Up"}
        </button>
        <p className="text-white/20 text-xs text-center">
          100% of donations benefit Define Yourself 501(c)(3)
        </p>
      </form>
    </div>
  );
}
