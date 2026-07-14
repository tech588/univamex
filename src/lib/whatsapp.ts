import { siteConfig } from "@/data/site";

export type WhatsAppContext = {
  name?: string;
  interest?: string;
  campus?: string;
  program?: string;
  source?: string;
  question?: string;
};

export function buildWhatsAppMessage(context: WhatsAppContext = {}) {
  if (context.name || context.interest || context.campus) {
    const introduction = context.name
      ? `Hola, soy ${context.name}.`
      : "Hola.";
    const interest = context.interest
      ? ` Me interesa ${context.interest}.`
      : " Quiero conocer la oferta académica de UNIVAMEX.";
    const campus = context.campus
      ? ` Campus preferido: ${context.campus}.`
      : "";

    return `${introduction}${interest}${campus} Quiero conocer requisitos, horarios, modalidades y fechas de inicio.`;
  }

  if (context.program) {
    return `Hola, quiero información sobre ${context.program} en UNIVAMEX.`;
  }

  if (context.question) {
    return `Hola, tengo una duda sobre ${context.question} en UNIVAMEX.`;
  }

  return "Hola, quiero informes de UNIVAMEX.";
}

export function buildWhatsAppUrl(context: WhatsAppContext = {}) {
  const message = encodeURIComponent(buildWhatsAppMessage(context));
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
}



