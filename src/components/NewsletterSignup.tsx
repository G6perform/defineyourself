"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "website" }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-xl mx-auto text-center">
      <h3 className="font-display text-2xl md:text-3xl tracking-wider text-white mb-3">
        STAY CONNECTED
      </h3>
      <p className="text-white/50 text-sm mb-6">
        Get updates on our programs, athlete stories, and ways to make an impact.
      </p>
      {status === "success" ? (
        <p className="text-accent font-semibold text-sm uppercase tracking-wider">
          You&apos;re on the list. Thank you for your support.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-accent transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-accent hover:bg-accent-dark text-charcoal font-bold text-sm uppercase tracking-wider px-8 py-3 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
