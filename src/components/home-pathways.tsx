import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CircleHelp,
  GraduationCap,
  MessagesSquare,
  ClipboardCheck,
} from "lucide-react";

const pathways = [
  {
    title: "Oferta académica",
    description: "Compara bachilleratos, licenciaturas, maestrías y doctorado.",
    href: "/oferta-academica",
    image: "/images/legacy/grupo-aula.jpg",
    icon: GraduationCap,
  },
  {
    title: "Campus",
    description: "Ubica sedes, referencias y recorrido virtual 360.",
    href: "/campus",
    image: "/images/legacy/campus-americas-frente.jpg",
    icon: Building2,
  },
  {
    title: "Admisiones",
    description: "Revisa documentos y pasos para iniciar tu proceso.",
    href: "/admisiones",
    image: "/images/legacy/grupo-certificados.jpg",
    icon: ClipboardCheck,
  },
  {
    title: "FAQ",
    description: "Resuelve dudas sobre RVOE, duración, horarios y campus.",
    href: "/faq",
    image: "/images/legacy/generacion-graduados.jpg",
    icon: CircleHelp,
  },
  {
    title: "Contacto",
    description: "Habla con un asesor y confirma costos, grupos y horarios.",
    href: "/contacto",
    image: "/images/legacy/modulo-informes.jpg",
    icon: MessagesSquare,
  },
] as const;

export function HomePathways() {
  return (
    <section className="bg-white px-5 py-16 text-[#071a3d] sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold text-[#b45309]">
              Siguiente paso
            </p>
            <h2 className="mt-3 max-w-2xl font-heading text-[2rem] font-semibold leading-[0.98] tracking-normal text-[#04215e] sm:text-4xl lg:text-5xl">
              Encuentra rápido lo que necesitas
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-slate-600">
            El home conecta las rutas principales para que puedas elegir,
            confirmar información y avanzar sin perder contexto.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {pathways.map((item) => (
            <Link
              className="group flex min-h-[21rem] flex-col overflow-hidden border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:border-[#04215e]/40 hover:shadow-md"
              href={item.href}
              key={item.href}
            >
              <div className="relative min-h-[11rem] overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={`Acceso a ${item.title.toLowerCase()} en UNIVAMEX`}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="grid h-11 w-11 place-items-center border border-[#04215e]/20 text-[#04215e]">
                  <item.icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold leading-tight text-[#071a3d]">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1e3a8a]">
                  Ir a la página
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
