import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata: Metadata = {
  title: "Becas y colegiaturas 2026 en Ecatepec",
  description: "Consulta colegiaturas, Plan Beca, pagos adicionales y condiciones 2026 de bachillerato, licenciatura y posgrados UNIVAMEX.",
  alternates: { canonical: "/becas-y-colegiaturas" },
};

const prices = [
  { level: "Bachillerato tecnológico", normal: "$2,990 MXN", scholarship: "$2,490 MXN", details: "Pago mensual puntual. Sin inscripción, reinscripción, credencial ni seguro escolar." },
  { level: "Licenciatura escolarizada", normal: "$2,990 MXN", scholarship: "$2,490 MXN", details: "Pago mensual puntual. Precios congelados durante la carrera." },
  { level: "Licenciatura mixta / sabatina", normal: "$2,490 MXN", scholarship: "$1,245 MXN", details: "Plan Beca de 50% incluido en el precio de colegiaturas, sujeto a condiciones." },
  { level: "Maestría", normal: "$2,200 MXN", scholarship: "$1,800 MXN", details: "Colegiatura mensual durante 20 meses. Inscripción o reinscripción cuatrimestral de $1,490 MXN." },
  { level: "Doctorado", normal: "$2,990 MXN", scholarship: "$2,490 MXN", details: "Inscripción o reinscripción cuatrimestral de $1,490 MXN. Existe promoción documentada para egresados de la Maestría en Educación UNIVAMEX." },
];

export default function BecasYColegiaturasPage() {
  return <main>
    <section className="bg-[#04215e] px-5 py-16 text-white sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold text-[#e7a928]">Información oficial · ciclo 2026</p><h1 className="mt-3 max-w-4xl font-heading text-4xl font-semibold leading-[1.02] sm:text-5xl">Becas y colegiaturas UNIVAMEX</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">Compara pagos mensuales y condiciones antes de inscribirte. Confirma con admisiones que el plan siga vigente para tu programa, modalidad y fecha de ingreso.</p></div></section>
    <section className="bg-[#F8FAFC] px-5 py-16 sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{prices.map((price) => <article className="border border-slate-200 bg-white p-6" key={price.level}><h2 className="font-editorial text-xl font-semibold text-[#04215e]">{price.level}</h2><dl className="mt-5 grid gap-3"><div><dt className="text-xs font-bold text-slate-500">Colegiatura normal</dt><dd className="mt-1 text-xl font-bold text-[#071a3d]">{price.normal}</dd></div><div><dt className="text-xs font-bold text-slate-500">Plan Beca / pago puntual</dt><dd className="mt-1 text-xl font-bold text-[#B45309]">{price.scholarship}</dd></div></dl><p className="mt-4 text-sm leading-6 text-slate-600">{price.details}</p></article>)}</div><div className="mt-8 border-l-4 border-[#e7a928] bg-white p-6"><h2 className="font-editorial text-2xl font-semibold text-[#04215e]">Condiciones que debes revisar</h2><ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700"><li>Los pagos puntuales se realizan durante los primeros 3 días de cada mes.</li><li>Las reinscripciones deben hacerse en las fechas indicadas para conservar el Plan Beca.</li><li>Bachillerato y licenciatura contemplan gastos de incorporación a la SEP de $1,600 MXN por semestre o cuatrimestre, según el nivel.</li><li>La modalidad de las clases puede ajustarse a las indicaciones de la SEP.</li></ul><div className="mt-6"><WhatsAppButton label="Confirmar precio vigente" question="colegiaturas y Plan Beca 2026" source="Becas y colegiaturas" /></div></div></div></section>
  </main>;
}

