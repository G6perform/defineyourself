import Link from "next/link";

const programs = [
  {
    title: "Skill Enhancement",
    description:
      "Expert coaching to develop sport-specific skills and elevate athletic performance.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Team Building",
    description:
      "Activities and training that foster teamwork, communication, and trust.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Leadership Training",
    description:
      "Programs designed to cultivate leadership qualities on and off the field.",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    title: "Physical Fitness",
    description:
      "Comprehensive fitness programs that build strength, endurance, and healthy habits.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    title: "Confidence Building",
    description:
      "Mentorship and support that helps young athletes believe in themselves.",
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
  {
    title: "Life Skills Development",
    description:
      "Teaching discipline, time management, and resilience through sports.",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
];

const testimonials = [
  {
    quote:
      "Define Yourself has been incredible for my son. He's not only a better athlete but a more confident young man.",
    name: "Sarah M.",
    role: "Parent",
  },
  {
    quote:
      "The mentorship programs gave my daughter the resilience she needed both on and off the court.",
    name: "James T.",
    role: "Parent",
  },
  {
    quote:
      "This organization truly cares about developing the whole person, not just the athlete.",
    name: "Coach Rivera",
    role: "Community Partner",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-taupe/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-charcoal tracking-tight">
                Define Yourself
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#about"
                className="text-charcoal/70 hover:text-charcoal font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#programs"
                className="text-charcoal/70 hover:text-charcoal font-medium transition-colors"
              >
                Programs
              </a>
              <a
                href="#testimonials"
                className="text-charcoal/70 hover:text-charcoal font-medium transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-charcoal/70 hover:text-charcoal font-medium transition-colors"
              >
                Contact
              </a>
              <a
                href="#donate"
                className="bg-gold hover:bg-gold-dark text-charcoal font-semibold px-6 py-2 rounded-full transition-colors"
              >
                Donate
              </a>
            </div>
            <a
              href="https://www.instagram.com/define_yourself_inc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/60 hover:text-charcoal transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-charcoal text-white py-24 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-taupe-dark/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Unlock Potential
            <br />
            <span className="text-gold">Through Sports</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-sans">
            Empowering youth to achieve their fullest potential through holistic
            development, emphasizing mental, physical, and social growth via
            sports participation and mentorship programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#programs"
              className="bg-gold hover:bg-gold-dark text-charcoal font-semibold px-8 py-3 rounded-full text-lg transition-colors"
            >
              Our Programs
            </a>
            <a
              href="#donate"
              className="border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-3 rounded-full text-lg transition-colors"
            >
              Support Our Mission
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-6">
              About Define Yourself
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-8 rounded-full" />
            <p className="text-lg text-charcoal/70 leading-relaxed mb-6">
              Define Yourself is dedicated to empowering youth across the United
              States through sports. We believe every young person deserves the
              opportunity to discover their strengths, develop their character,
              and define their own future.
            </p>
            <p className="text-lg text-charcoal/70 leading-relaxed">
              Through our programs, athletes learn teamwork, leadership, and
              perseverance — skills that extend far beyond the playing field and
              into every aspect of their lives.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Our Programs
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-6 rounded-full" />
            <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
              Comprehensive programs designed to develop the whole athlete —
              mind, body, and character.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div
                key={program.title}
                className="bg-cream/50 border border-taupe/20 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mb-5">
                  <svg
                    className="w-6 h-6 text-gold-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={program.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                  {program.title}
                </h3>
                <p className="text-charcoal/60 leading-relaxed">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">
              What People Are Saying
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <svg
                  className="w-8 h-8 text-gold mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <p className="text-charcoal/70 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-charcoal">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-charcoal/50">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-20 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Support Our Mission
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-8 rounded-full" />
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Your donation provides mentorship, athletic training, and
            life-changing opportunities to young athletes who need it most. Every
            contribution makes a difference.
          </p>
          <a
            href="https://defineyourselfcompany.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold hover:bg-gold-dark text-charcoal font-bold px-10 py-4 rounded-full text-lg transition-colors"
          >
            Make a Donation
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Get In Touch
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-8 rounded-full" />
            <p className="text-charcoal/60 mb-8">
              Have questions about our programs or want to get involved? We&apos;d
              love to hear from you.
            </p>
            <div className="space-y-4 text-charcoal/70">
              <p>Sacramento, CA</p>
              <a
                href="https://www.instagram.com/define_yourself_inc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold-dark hover:text-gold transition-colors font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @define_yourself_inc
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white/50 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-serif text-lg text-white/70 mb-2">
            Define Yourself Inc.
          </p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Define Yourself Inc. All rights
            reserved. | 501(c)(3) Non-Profit Organization
          </p>
        </div>
      </footer>
    </div>
  );
}
