import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/70 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo & brand */}
          <div>
            <Image
              src="https://cdn.durable.co/blocks/25wDI7wkiV0wP2eleWi3MwyBpNGGLj5AsNiLCGXbvALZmbOBFzQxdXaui785enNd.png"
              alt="Define Yourself"
              width={160}
              height={64}
              className="h-10 w-auto mb-4 brightness-200"
            />
            <p className="text-sm text-white/50">
              Empowering youth through sports.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Pages</h4>
              <div className="flex flex-col gap-2">
                <Link href="/programs" className="text-sm text-white/60 hover:text-white transition-colors">
                  Our Programs
                </Link>
                <Link href="/donate" className="text-sm text-white/60 hover:text-white transition-colors">
                  Donate
                </Link>
                <Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Social</h4>
              <a
                href="https://www.instagram.com/define_yourself_inc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} Define Yourself Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
