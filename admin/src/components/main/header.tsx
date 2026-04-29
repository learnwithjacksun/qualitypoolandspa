import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../../constant/data";
import { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import MobileMenu from "./mobile-menu";
import { useAuth } from "../../hooks";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { logoutAdmin } = useAuth();

  return (
    <>
      <header className="bg-primary text-white shadow-md sticky top-0 z-50 w-full">
        <nav className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 transition-transform duration-200 hover:scale-[1.03]"
          >
            <img
              src="/logo.png"
              alt="Quality Pool & Spa"
              className="h-5 md:h-7 w-auto"
            />
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 border-r border-white/30 pr-6">
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
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <button onClick={logoutAdmin} className="h-10 px-4 rounded-full bg-red-500 text-white text-sm font-semibold">
              <LogOut size={16} />
              Logout
            </button>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button className="h-10 px-4 rounded-full bg-red-500 text-white text-sm font-semibold">
              <LogOut size={16} />
              Logout
            </button>

            <div>
              <button onClick={() => setIsOpen(true)}>
                <Menu size={20} className="text-white" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu onClose={() => setIsOpen(false)} isOpen={isOpen} />
        )}
      </AnimatePresence>
    </>
  );
}
