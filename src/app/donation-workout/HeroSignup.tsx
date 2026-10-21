"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

interface SessionInfo {
  date: string;
  dateRaw: string;
  day: string;
  time: string;
  coach: string;
}

function getNextDate(targetDay: number, cutoffHour: number, cutoffMinute: number): Date {
  const now = new Date();
  const pt = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const dayOfWeek = pt.getDay();
  const hour = pt.getHours();
  const minute = pt.getMinutes();

  let daysUntil = (targetDay - dayOfWeek + 7) % 7;
  if (daysUntil === 0 && (hour > cutoffHour || (hour === cutoffHour && minute >= cutoffMinute))) {
    daysUntil = 7;
  }
  if (daysUntil === 0 && dayOfWeek !== targetDay) daysUntil = 7;

  const next = new Date(now);
  next.setDate(now.getDate() + daysUntil);
  return next;
}

function getUpcomingSessions(): { tuesday: SessionInfo; saturday: SessionInfo } {
  const nextTue = getNextDate(2, 18, 30);
  const nextSat = getNextDate(6, 10, 0);
  return {
    tuesday: {
      date: nextTue.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      dateRaw: nextTue.toISOString().split("T")[0],
      day: "Tuesday",
      time: "6:30 PM",
      coach: "Coach Gabrielle",
    },
    saturday: {
      date: nextSat.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      dateRaw: nextSat.toISOString().split("T")[0],
      day: "Saturday",
      time: "10:00 AM",
      coach: "Coach Hammer",
    },
  };
}

export default function HeroSignup() {
  const sessions = useMemo(() => getUpcomingSessions(), []);
  const [selected, setSelected] = useState<"tuesday" | "saturday" | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const selectedSession = selected ? sessions[selected] : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !selectedSession || state === "submitting") return;
    setState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/donation-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          session_day: selectedSession.day,
          session_date: selectedSession.dateRaw,
          session_time: selectedSession.time,
          coach: selectedSession.coach,
        }),
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

  if (state === "success" && selectedSession) {
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-3xl tracking-wider mb-3">YOU&apos;RE IN</h3>
        <p className="text-white/60 text-lg">
          {selectedSession.day}, {selectedSession.date} at {selectedSession.time}
        </p>
        <p className="text-white/40 text-sm mt-1">w/ {selectedSession.coach} of G6 Performance</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <Image
        src="/logo-badge.webp"
        alt="Define Yourself 501(c)(3)"
        width={80}
        height={80}
        className="rounded-full mx-auto mb-6"
      />

      {/* Session picker */}
      <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.2em] mb-4">Choose Your Session</p>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {(["tuesday", "saturday"] as const).map((key) => {
          const s = sessions[key];
          const active = selected === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              className={`p-4 border text-left transition-all ${
                active
                  ? "border-white bg-white/10"
                  : "border-white/10 bg-white/5 hover:border-white/30"
              }`}
            >
              <p className={`font-display text-lg tracking-wider ${active ? "text-white" : "text-white/70"}`}>
                {s.day.toUpperCase()}
              </p>
              <p className={`text-sm mt-0.5 ${active ? "text-white/80" : "text-white/40"}`}>
                {s.time} &middot; {s.date}
              </p>
              <p className={`text-xs mt-1 ${active ? "text-white/60" : "text-white/30"}`}>
                w/ {s.coach} of G6
              </p>
            </button>
          );
        })}
      </div>

      {/* Form — only visible after selecting a session */}
      {selected && (
        <>
          <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.2em] mb-4">10 Slots Available</p>
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
        </>
      )}
    </div>
  );
}
