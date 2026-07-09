"use client";

import { useState, type FormEvent } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-charcoal text-white noise-overlay text-center px-4">
        <div className="relative z-10">
          <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            Define Yourself Inc.
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider mb-4">
            CONTACT
          </h1>
          <p className="text-white/60 text-lg">Reach Out to Our Team</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {/* Info */}
            <div className="bg-charcoal p-10 md:p-14 flex flex-col justify-center">
              <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.2em] mb-6">
                Get In Touch
              </p>
              <h2 className="font-display text-3xl tracking-wider text-white mb-8">
                WE&apos;D LOVE TO HEAR FROM YOU
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Phone</p>
                  <a
                    href="tel:+15306016625"
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    (530) 601-6625
                  </a>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                  <a
                    href="mailto:defineyourself916@gmail.com"
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    defineyourself916@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Location</p>
                  <p className="text-white/80 text-sm">Sacramento, California</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Social</p>
                  <a
                    href="https://www.instagram.com/define_yourself_916/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    @define_yourself_916
                  </a>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Organization</p>
                  <p className="text-white/80 text-sm">501(c)(3) Non-Profit</p>
                  <p className="text-white/50 text-xs mt-1">EIN 88-3419481</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-off-white p-10 md:p-14">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-charcoal flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl tracking-wider text-text-dark mb-2">
                    MESSAGE SENT
                  </h3>
                  <p className="text-text-gray text-sm">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="block text-text-dark text-xs font-semibold uppercase tracking-wider mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white border border-mid-gray text-text-dark text-sm focus:outline-none focus:border-charcoal transition-colors"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-text-dark text-xs font-semibold uppercase tracking-wider mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white border border-mid-gray text-text-dark text-sm focus:outline-none focus:border-charcoal transition-colors"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="message"
                      className="block text-text-dark text-xs font-semibold uppercase tracking-wider mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-mid-gray text-text-dark text-sm focus:outline-none focus:border-charcoal transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-charcoal hover:bg-charcoal/90 text-white font-bold text-sm uppercase tracking-wider py-4 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Submit"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-off-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199539.04534498907!2d-121.59441752890477!3d38.56165706318942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x921f6aaa74197fdb!2sSacramento%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sacramento, CA location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
