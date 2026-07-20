import type { Metadata } from "next";
import Link from "next/link";
import { programs } from "@/data/programs";

export const metadata: Metadata = {
  title: "RVOE de programas UNIVAMEX",
  description: "Consulta el RVOE publicado para bachilleratos, licenciaturas, maestrías y doctorado de UNIVAMEX en Ecatepec.",
  alternates: { canonical: "/rvoe" },
};

export default function RvoePage() {
  return <main><section className="bg-[#F8FAFC] px-5 py-16 sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold text-[#B45309]">Validez académica</p><h1 className="mt-3 font-heading text-4xl font-semibold text-[#04215e] sm:text-5xl">RVOE de los programas UNIVAMEX</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Consulta la clave asociada a cada programa junto con la modalidad y duración publicadas por UNIVAMEX.</p><div className="mt-10 grid gap-3">{programs.map((program) => <Link className="grid gap-2 border border-slate-200 bg-white p-5 transition hover:border-[#1E40AF] sm:grid-cols-[1fr_auto] sm:items-center" href={`/programas/${program.slug}`} key={program.slug}><span><strong className="block text-[#071a3d]">{program.name}</strong><span className="mt-1 block text-sm text-slate-600">{program.modality} · {program.duration}</span></span><span className="text-sm font-bold text-[#1E3A8A]">RVOE {program.rvoe}</span></Link>)}</div></div></section></main>;
}
