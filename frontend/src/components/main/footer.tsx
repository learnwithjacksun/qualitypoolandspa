
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, PhoneCall, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-14 bg-[#101829] text-white">
      <div className="main py-12 md:py-14">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Quality Pool SPA"
                className="h-7 w-auto "
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Spain&apos;s most trusted premium pool and spa installation
              specialists. Serving Marbella, Mallorca, and the Costa del Sol.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="center h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="center h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="center h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Youtube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Collections
            </h3>
            <div className="space-y-2 text-sm text-white/70">
              <Link to="/categories/hot-tubs" className="block transition-colors hover:text-white">
                Premium Hot Tubs
              </Link>
              <Link to="/categories/spas" className="block transition-colors hover:text-white">
                Elite Swim Spas
              </Link>
              <Link to="/categories/pools" className="block transition-colors hover:text-white">
                Pool Architecture
              </Link>
              <Link to="/contact" className="block transition-colors hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Services
            </h3>
            <div className="space-y-2 text-sm text-white/70">
              <p>Installation</p>
              <p>Maintenance</p>
              <p>Water Chemistry</p>
              <p>Design Consultation</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-white/70">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 transition-colors hover:text-white"
              >
                <MapPin size={16} className="mt-0.5 shrink-0 text-violet-400" />
                <span>Calahonda, Marbella, Mallorca, Estepona, Espania</span>
              </a>
              <a
                href="tel:+34951172808"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <PhoneCall size={16} className="shrink-0 text-violet-400" />
                <span>+34 951 172 808</span>
              </a>
              <a
                href="mailto:info@qualitypoolspa.es"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail size={16} className="shrink-0 text-violet-400" />
                <span>info@qualitypoolspa.es</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Quality Pool Spa. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="transition-colors hover:text-white/80">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="transition-colors hover:text-white/80">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
