
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, PhoneCall, Youtube } from "lucide-react";
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="mt-14 bg-[#101829] text-white">
      <div className="main py-12 md:py-14">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt={t('qualityPoolSpa2', 'Quality Pool SPA')}
                className="h-7 w-auto "
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              {t('spainapossMostTrustedPremiumPoolAndSpaInstallationSpecialistsServingMarbellaMallorcaAndTheCostaDelSol', 'Spain&apos;s most trusted premium pool and spa installation\r\n              specialists. Serving Marbella, Mallorca, and the Costa del Sol.')}
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
                aria-label={t('youtube', 'Youtube')}
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {t('collections', 'Collections')}
            </h3>
            <div className="space-y-2 text-sm text-white/70">
              <Link to="/categories/hot-tubs" className="block transition-colors hover:text-white">
                {t('premiumHotTubs', 'Premium Hot Tubs')}
              </Link>
              <Link to="/categories/spas" className="block transition-colors hover:text-white">
                {t('eliteSwimSpas', 'Elite Swim Spas')}
              </Link>
              <Link to="/categories/pools" className="block transition-colors hover:text-white">
                {t('poolArchitecture', 'Pool Architecture')}
              </Link>
              <Link to="/contact" className="block transition-colors hover:text-white">
                {t('contact', 'Contact')}
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {t('services', 'Services')}
            </h3>
            <div className="space-y-2 text-sm text-white/70">
              <p>{t('installation', 'Installation')}</p>
              <p>{t('maintenance', 'Maintenance')}</p>
              <p>{t('waterChemistry', 'Water Chemistry')}</p>
              <p>{t('designConsultation', 'Design Consultation')}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {t('contact', 'Contact')}
            </h3>
            <div className="space-y-3 text-sm text-white/70">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 transition-colors hover:text-white"
              >
                <MapPin size={16} className="mt-0.5 shrink-0 text-violet-400" />
                <span>{t('calahondaMarbellaMallorcaEsteponaEspania', 'Calahonda, Marbella, Mallorca, Estepona, Espania')}</span>
              </a>
              <a
                href="tel:+34951172808"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <PhoneCall size={16} className="shrink-0 text-violet-400" />
                <span>{t('349511728082', '+34 951 172 808')}</span>
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
          <p>{t('2026QualityPoolSpaAllRightsReserved', '© 2026 Quality Pool Spa. All rights reserved.')}</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="transition-colors hover:text-white/80">
              {t('privacyPolicy', 'Privacy Policy')}
            </Link>
            <Link to="/terms-of-service" className="transition-colors hover:text-white/80">
              {t('termsOfService', 'Terms of Service')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
