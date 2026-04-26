import { navLinks } from "@/constants/data";
import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function MobileMenu({ onClose, isOpen }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      // transition={{ duration: 0.2 }}
      className="fixed origin-top inset-0 bg-primary/90 backdrop-blur-sm z-100"
    >
      <header className="flex items-center justify-between main min-h-[70px]">
        <img src="/logo.png" alt="logo" className="w-auto h-6" />
        <button onClick={onClose}>
          <X size={20} className="text-white" />
        </button>
      </header>

      <ul className="flex flex-col gap-4 p-4">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `text-xl w-full block text-center py-2 font-light transition ${isActive ? "border-b-2 border-white/30 text-white pb-1 bg-white/10" : "text-white hover:bg-white/10"}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
