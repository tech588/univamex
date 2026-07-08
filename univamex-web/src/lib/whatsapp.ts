import { siteConfig } from "@/data/site";

type WhatsAppContext = {
  program?: string;
  source?: string;
  question?: string;
};

export function buildWhatsAppMessage(context: WhatsAppContext = {}) {
  if (context.program) {
    return `Hola, quiero información sobre ${context.program} en UNIVAMEX.`;
  }

  if (context.question) {
    return `Hola, tengo una duda sobre ${context.question} en UNIVAMEX.`;
  }

  if (context.source) {
    return `Hola, quiero informes de UNIVAMEX. Vengo de la página ${context.source}.`;
  }

  return "Hola, quiero informes de UNIVAMEX.";
}

export function buildWhatsAppUrl(context: WhatsAppContext = {}) {
  const message = encodeURIComponent(buildWhatsAppMessage(context));
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
}



