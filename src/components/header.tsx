"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Menu, X } from "lucide-react";
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
          : "border-white/10 bg-[#061533]/95 text-white shadow-xl shadow-[#061533]/15 backdrop-blur-md",
      )}
      initial={reduceMotion ? false : { y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7A928]"
          onClick={() => setMobileOpen(false)}
        >
          <span
            className={cn(
              "grid h-10 w-10 place-items-center rounded-lg border transition-colors",
              transparent
                ? "border-white/30 bg-white/10 text-white"
                : "border-[#E7A928]/60 bg-[#E7A928] text-[#061533]",
            )}
          >
            <GraduationCap aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-2xl font-semibold">
              {siteConfig.name}
            </span>
            <span
              className={cn(
                "hidden text-xs font-semibold sm:inline",
                transparent ? "text-white/75" : "text-white/60",
              )}
            >
              Colegio Universitario
            </span>
          </span>
        </Link>

        <nav aria-label="Navegacion principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7A928]",
                    pathname === item.href
                      ? "text-[#E7A928]"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                  )}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton
            label="Solicitar informes"
            source="Header"
            variant="secondary"
          />
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7A928] md:hidden"
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
            className="border-t border-white/10 bg-[#061533]/98 px-5 pb-6 pt-3 shadow-2xl shadow-[#061533]/30 backdrop-blur-md md:hidden"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <nav aria-label="Navegacion movil">
              <ul className="grid gap-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      className={cn(
                        "flex min-h-12 items-center rounded-lg px-3 text-base font-semibold transition hover:bg-white/10",
                        pathname === item.href
                          ? "text-[#E7A928]"
                          : "text-white/90",
                      )}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <WhatsAppButton
                  className="w-full"
                  label="Solicitar informes"
                  source="Header movil"
                  variant="floating"
                />
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
