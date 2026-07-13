"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, siteConfig } from "@/data/site";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !mobileOpen;
  const logoSrc = transparent
    ? "/logos/Logo Horizontal/blanco.png"
    : "/logos/Logo Horizontal/azul.png";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        transparent
          ? "border-white/10 bg-transparent text-white"
          : "border-[#d9e0ec] bg-white/95 text-[#04215e] shadow-lg shadow-slate-950/5 backdrop-blur-md",
      )}
      initial={reduceMotion ? false : { y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="flex min-h-[5.25rem] w-full items-center justify-between gap-4 px-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-h-12 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928]"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src={logoSrc}
            alt={`${siteConfig.name} Colegio Universitario`}
            width={1920}
            height={1080}
            priority
            sizes="(min-width: 768px) 267px, 207px"
            className="h-[4.45rem] w-[12.9rem] object-contain object-left sm:h-[4.8rem] sm:w-[16.65rem]"
          />
        </Link>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    className={cn(
                      "inline-flex min-h-11 items-center px-3 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] lg:px-4",
                      active
                        ? transparent
                          ? "text-white"
                          : "text-[#04215e]"
                        : transparent
                          ? "text-white/78 hover:bg-white/10 hover:text-white"
                          : "text-[#04215e]/72 hover:bg-[#04215e]/6 hover:text-[#04215e]",
                    )}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <WhatsAppButton
            className="min-h-10 border-current px-4 py-2.5 text-xs"
            label="Solicitar informes"
            source="Header"
            variant="secondary"
          />
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          className={cn(
            "inline-flex min-h-11 min-w-11 items-center justify-center border p-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] lg:hidden",
            transparent
              ? "border-white/30 text-white hover:bg-white/10"
              : "border-[#d9e0ec] text-[#04215e] hover:bg-[#04215e]/6",
          )}
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-x-0 top-[5.25rem] z-50 border-y border-[#d9e0ec] bg-white px-3 py-5 text-[#04215e] shadow-xl shadow-slate-950/10 lg:hidden"
            initial={reduceMotion ? false : { y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: -18, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Navegación móvil">
              <ul className="grid">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      className={cn(
                        "flex min-h-12 items-center border-b border-[#d9e0ec] px-1 text-sm font-bold transition hover:bg-[#04215e]/6",
                        pathname === item.href
                          ? "text-[#04215e]"
                          : "text-[#04215e]/72",
                      )}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <WhatsAppButton
                  className="w-full border-[#04215e] px-4 text-[#04215e]"
                  label="Solicitar informes"
                  source="Header movil"
                  variant="secondary"
                />
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
