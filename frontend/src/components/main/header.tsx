import { Link, NavLink } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  PhoneCall,
  Mail,
  MapPin,
  Menu,
} from "lucide-react";
import { GTranslate, MobileMenu } from ".";
import { navLinks } from "@/constants/data";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  // const activeLanguage = i18n.resolvedLanguage ?? i18n.language ?? "en";
  // const languages = useMemo(
  //   () => [
  //     { code: "en", name: t("english", "English") },
  //     { code: "fr", name: t("french", "French") },
  //     { code: "es", name: t("spanish", "Spanish") },
  //     { code: "de", name: t("german", "German") },
  //     { code: "sv", name: t("swedish", "Swedish") },
  //     { code: "ru", name: t("russian", "Russian") },
  //   ],
  //   [t]
  // );

  // const handleLanguageChange = async (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   await i18n.changeLanguage(event.target.value);
  // };

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* TOP BAR */}
        <div className="w-full bg-white border-b border-gray-200 text-sm hidden md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
            {/* Left: Contact */}
            <div className="flex items-center gap-6 text-xs">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-nowrap hover:text-white/80 transition-colors"
              >
                <MapPin size={14} className="shrink-0" /> {t('calahondaMarbellaMallorcaEstepona', 'Estepona')}
              </a>
              <a
                href="mailto:info@qualitypoolspa.es"
                className="flex items-center gap-2 text-nowrap hover:text-white/80 transition-colors"
              >
                <Mail size={14} className="shrink-0" /> info@qualitypoolspa.es
              </a>
            </div>

            {/* Right: Book + Socials */}

            <div className="flex items-center gap-4">
              {/* Book Call */}
              <a
                href="tel:+34951172808"
                className="flex items-center gap-1 font-space font-medium underline text-primary px-3 py-1.5 text-xs transition hover:opacity-90"
              >
                <PhoneCall size={14} className="shrink-0" /> {t('bookACall', 'Book a Call')}
              </a>
              {/* Socials */}
              <div className="flex items-center gap-4 text-gray-500">
                <Facebook
                  size={16}
                  className="hover:text-[mediumslateblue] cursor-pointer"
                />
                <Twitter
                  size={16}
                  className="hover:text-[mediumslateblue] cursor-pointer"
                />
                <Instagram
                  size={16}
                  className="hover:text-[mediumslateblue] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* MAIN HEADER */}
        <div className="bg-primary text-white shadow-md">
          <nav className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4">
            {/* Logo */}
            <Link
              to="/"
              className="shrink-0 transition-transform duration-200 hover:scale-[1.03]"
            >
              <img
                src="/logo.png"
                alt={t('qualityPoolSpa', 'Quality Pool & Spa')}
                className="h-5 md:h-7 w-auto"
              />
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-6 border-r-[1px] border-white/30 pr-6">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `text-sm font-medium transition ${
                          isActive
                            ? "border-b-2 border-white/30 text-white pb-1"
                            : "text-white"
                        }`
                      }
                    >
                      {t(link.labelKey, link.fallback)}
                    </NavLink>
                  </li>
                ))}
              </ul>
              {/* Language Selector */}
              <GTranslate />
              {/* <label className="group relative">
                <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 shrink-0 z-10" />
                <select
                  className="h-10 appearance-none pl-8 pr-10 rounded-full border border-white/35 bg-white/10 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/15 focus-within:ring-2 focus-within:ring-white/70"
                  aria-label={t("chooseLanguage", "Choose language")}
                  value={activeLanguage}
                  onChange={handleLanguageChange}
                >
                  {languages.map((language) => (
                    <option
                      className="text-black"
                      key={language.code}
                      value={language.code}
                    >
                      {language.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-80 transition-transform group-focus-within:rotate-180"
                />
              </label> */}
            </div>

            <div className="flex md:hidden items-center gap-4">
              <GTranslate />
              {/* <label className="group relative">
                <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 shrink-0 z-10" />
                <select
                  className="h-10 appearance-none pl-8 pr-10 rounded-full border border-white/35 bg-white/10 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/15 focus-within:ring-2 focus-within:ring-white/70"
                  aria-label={t("chooseLanguage", "Choose language")}
                  value={activeLanguage}
                  onChange={handleLanguageChange}
                >
                  {languages.map((language) => (
                    <option
                      className="text-black"
                      key={language.code}
                      value={language.code}
                    >
                      {language.code.toUpperCase()}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-80 transition-transform group-focus-within:rotate-180"
                />
              </label> */}

              <div>
                <button onClick={() => setIsOpen(true)}>
                  <Menu size={20} className="text-white" />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu onClose={() => setIsOpen(false)} isOpen={isOpen} />
        )}
      </AnimatePresence>
    </>
  );
}
