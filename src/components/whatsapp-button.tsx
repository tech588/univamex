import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type WhatsAppButtonProps = {
  label?: string;
  program?: string;
  source?: string;
  question?: string;
  variant?: "primary" | "secondary" | "ghost" | "floating";
  className?: string;
};

const variants = {
  primary:
    "bg-[#04215e] text-white shadow-sm shadow-slate-950/10 hover:bg-[#0b327f]",
  secondary:
    "border border-current bg-transparent text-current backdrop-blur hover:border-[#e7a928] hover:bg-white/10",
  ghost: "text-[#04215e] hover:bg-[#04215e]/6",
  floating:
    "bg-[#04215e] text-white shadow-lg shadow-slate-950/20 hover:bg-[#0b327f]",
};

export function WhatsAppButton({
  label = "Solicitar informes",
  program,
  source,
  question,
  variant = "primary",
  className,
}: WhatsAppButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928]",
        variants[variant],
        className,
      )}
      href={buildWhatsAppUrl({ program, source, question })}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle aria-hidden="true" className="h-4 w-4" />
      <span>{label}</span>
    </a>
  );
}

export function FloatingWhatsApp() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
      <WhatsAppButton
        className="w-full"
        label="Hablar con un asesor"
        source="CTA fijo móvil"
        variant="floating"
      />
    </div>
  );
}



