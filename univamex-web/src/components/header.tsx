import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { navItems, siteConfig } from "@/data/site";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-3 rounded-lg text-[#0F172A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
        >
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#1E3A8A] text-white">
            <GraduationCap aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-bold">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs font-semibold text-slate-500 sm:inline">
              Colegio Universitario
            </span>
          </span>
        </Link>

        <nav aria-label="Navegacion principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-[#1E3A8A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton
            label="WhatsApp"
            source="Header"
            variant="secondary"
          />
        </div>
        <Link
          className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-[#1E3A8A] md:hidden"
          href="/oferta-academica"
        >
          Oferta
        </Link>
      </div>
    </header>
  );
}



