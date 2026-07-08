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
    "bg-[#16A34A] text-white shadow-sm shadow-green-900/10 hover:bg-[#15803D]",
  secondary:
    "border border-[#CBD5E1] bg-white text-[#1E3A8A] hover:border-[#1E40AF] hover:bg-[#EFF6FF]",
  ghost: "text-[#1E3A8A] hover:bg-[#EFF6FF]",
  floating:
    "bg-[#16A34A] text-white shadow-lg shadow-green-900/20 hover:bg-[#15803D]",
};

export function WhatsAppButton({
  label = "Solicitar informes por WhatsApp",
  program,
  source,
  question,
  variant = "primary",
  className,
}: WhatsAppButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]",
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



