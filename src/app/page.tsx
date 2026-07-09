import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import StripeButton from "@/components/StripeButton";

const services = [
  {
    title: "Skill Enhancement",
    image: "https://cdn.durable.co/getty/2169880982.jpg",
    fallback: "https://cdn.durable.co/getty/kGKCyS5u9VVmfPEVhMKwKZFYUVVhM8u2ynYqaFPcf3mUuPGJO3Hn2bG68FLT9fLc.jpg",
    alt: "Tennis skill training",
  },
  {
    title: "Team Building",
    image: "https://cdn.durable.co/getty/1445097959.jpg",
    fallback: "https://cdn.durable.co/getty/N7PdK3SqkNvwJGPXMD1kuxYbYS2nlPuSxQTTJWdCxYoUkiW7FgNJdKajFPkgpGdL.jpg",
    alt: "Soccer team high-five",
  },
  {
    title: "Leadership Training",
    image: "https://cdn.durable.co/getty/1790695421.jpg",
    fallback: "https://cdn.durable.co/getty/8Uos2SVYSf43zv7sFbDq0uyH3aDWqYU4LfTFB6CRBBrS4EVEwY9c1iR84vG2aTjO.jpg",
    alt: "Rock climbing leadership",
  },
  {
    title: "Physical Fitness",
    image: "https://cdn.durable.co/getty/92041135.jpg",
    fallback: "https://cdn.durable.co/getty/JYl8zcNEkZ5SVNqw0bQPBJPflU5LOkOEkQ4xNOqk2EiQkTqI5fXcUZlAFsPxrcpX.jpg",
    alt: "Cross-country running",
  },
  {
    title: "Confidence Building",
    image: "https://cdn.durable.co/getty/1055445624.jpg",
    fallback: "https://cdn.durable.co/getty/x9lPxoBdahQJ2gYqkxAiUm5aLGo4Hf6r7QjhCVVLlCaWtTgEPyoRDi0snYt6JWk.jpg",
    alt: "Basketball high-five",
  },
  {
    title: "Life Skills Development",
    image: "https://cdn.durable.co/getty/2160153326.jpg",
    fallback: "https://cdn.durable.co/getty/kGKCyS5u9VVmfPEVhMKwKZFYUVVhM8u2ynYqaFPcf3mUuPGJO3Hn2bG68FLT9fLc.jpg",
    alt: "Basketball strategy session",
  },
];

const testimonials = [
  {
    quote:
      "Define Yourself has been transformative for my child. The coaches don't just teach sports — they teach life lessons that have made a real difference.",
    name: "Jessica Lee",
    image: "https://cdn.durable.co/getty/1496615445.jpg",
    fallback: "/placeholder-avatar.jpg",
  },
  {
    quote:
      "The mentorship program gave me the confidence and discipline I needed. I'm a better athlete and a better person because of Define Yourself.",
    name: "David Thompson",
    image: "https://cdn.durable.co/getty/1483052170.jpg",
    fallback: "/placeholder-avatar.jpg",
  },
  {
    quote:
      "Watching my daughter grow through this program has been incredible. She's learned resilience, teamwork, and what it means to define yourself.",
    name: "Melissa Carter",
    image: "https://cdn.durable.co/getty/1174816380.jpg",
    fallback: "/placeholder-avatar.jpg",
  },
];

export default function Home() {
  return (
    <div>
      {/* Giving Tuesday Banner */}
      <section className="bg-charcoal text-white py-12 md:py-16 text-center px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
          Giving Tuesday: Empower a Young Athlete
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
          This Giving Tuesday, your support helps provide mentorship, athletic training, and life-changing opportunities for youth. Every dollar makes a difference in a young athlete&apos;s journey.
        </p>
        <StripeButton />
      </section>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* About Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-6">
                About Define Yourself
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-4">
                Define Yourself is dedicated to empowering youth across the United States through sports. We believe that every young person deserves the chance to discover their potential, build character, and develop the skills they need to succeed — both on and off the field.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                Through our programs, athletes learn teamwork, leadership, and perseverance — values that extend far beyond the playing field and into every aspect of their lives.
              </p>
            </div>
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1508802595585-a7e56c972036?w=800"
                alt="Youth athlete in sports gear"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-dark font-semibold uppercase tracking-widest text-sm mb-2">
              Play Empowers
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">
              Unlock Potential Through Play
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="group relative h-64 rounded-2xl overflow-hidden"
              >
                <Image
                  src={service.fallback}
                  alt={service.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-dark font-semibold uppercase tracking-widest text-sm mb-2">
              Champions Speak
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">
              Discover Stories of Triumph & Growth
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-8 shadow-sm border border-taupe/10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">{t.name}</p>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal">
              Sacramento, CA
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden h-80">
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

      {/* Final CTA */}
      <section className="bg-charcoal text-white py-16 md:py-24 text-center px-4">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
          Inspire Greatness via Sports
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
          Unleash potential, ignite passion: Join our community where youth thrive through the power of sports, mentorship, and personal growth.
        </p>
        <a
          href="/programs"
          className="inline-block bg-gold hover:bg-gold-dark text-charcoal font-semibold px-10 py-4 rounded-lg text-lg transition-colors"
        >
          Our Programs
        </a>
      </section>
    </div>
  );
}
