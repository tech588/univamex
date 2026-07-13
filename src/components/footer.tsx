import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Share2 } from "lucide-react";
import { navItems, siteConfig } from "@/data/site";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#0F172A] pb-24 text-white md:pb-0">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <Image
            src="/logos/Logo Horizontal/blanco.png"
            alt="UNIVAMEX"
            width={210}
            height={60}
            className="h-auto w-44"
          />
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            {siteConfig.fullName}. Decídete a llegar más lejos estudiando lo
            que te apasiona.
          </p>
          <div className="mt-6">
            <WhatsAppButton
              label="Solicitar informes"
              source="Footer"
              variant="floating"
            />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-300">
            Navegación
          </h2>
          <ul className="mt-4 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-sm text-slate-300 transition hover:text-white"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-300">
            Contacto
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex gap-2">
              <Phone aria-hidden="true" className="mt-0.5 h-4 w-4" />
              <span>
                {siteConfig.phone}
                {siteConfig.phoneSecondary ? ` / ${siteConfig.phoneSecondary}` : null}
              </span>
            </li>
            <li className="flex gap-2">
              <Mail aria-hidden="true" className="mt-0.5 h-4 w-4" />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li className="flex gap-2">
              <Share2 aria-hidden="true" className="mt-0.5 h-4 w-4" />
              <span>{siteConfig.facebook}</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}



