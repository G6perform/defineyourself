"use client";

import { useState } from "react";

export default function SignupForm() {
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
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-3xl tracking-wider mb-3">YOU&apos;RE IN</h3>
        <p className="text-white/60 text-lg">We&apos;ll see you Saturday at 10 AM.</p>
        <p className="text-white/40 text-sm mt-1">G6 Performance — Sacramento, CA</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
  );
}
