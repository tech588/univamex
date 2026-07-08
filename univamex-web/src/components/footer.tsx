import Link from "next/link";
import { Mail, Phone, Share2 } from "lucide-react";
import { navItems, siteConfig } from "@/data/site";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#0F172A] pb-24 text-white md:pb-0">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <p className="font-heading text-2xl font-bold">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            {siteConfig.fullName}. Decidete a llegar mas lejos estudiando lo
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
          <h2 className="text-sm font-bold uppercase text-slate-300">
            Navegacion
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
          <h2 className="text-sm font-bold uppercase text-slate-300">
            Contacto
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex gap-2">
              <Phone aria-hidden="true" className="mt-0.5 h-4 w-4" />
              <span>{siteConfig.phone}</span>
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



