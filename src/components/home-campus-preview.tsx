import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { campuses } from "@/data/campuses";

export function HomeCampusPreview() {
  return (
    <section className="bg-[#f3f6fb] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#b45309]">Campus UNIVAMEX</p>
            <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-[1.02] text-[#04215e] sm:text-4xl lg:text-5xl">
              Estudia en Ecatepec
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Ubica las sedes y conoce sus referencias antes de planear una visita.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 w-fit items-center gap-2 border border-[#04215e] px-5 text-sm font-bold text-[#04215e] transition hover:bg-[#04215e] hover:text-white"
            href="/campus"
          >
            Conocer los campus
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {campuses.map((campus) => (
            <article className="grid min-w-0 overflow-hidden border border-slate-200 bg-white sm:grid-cols-[0.92fr_1.08fr]" key={campus.name}>
              <div className="relative min-h-[17rem] bg-slate-200">
                <Image
                  src={campus.image}
                  alt={campus.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col p-6">
                <h3 className="font-editorial text-2xl font-semibold leading-snug text-[#04215e]">
                  {campus.name}
                </h3>
                <p className="mt-3 flex gap-2 text-sm leading-6 text-slate-600">
                  <MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#1e40af]" />
                  <span>{campus.address}</span>
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#04215e] px-4 text-sm font-bold text-white"
                    href="/campus"
                  >
                    Ver campus
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link
                    className="inline-flex min-h-11 items-center justify-center gap-2 border border-slate-300 px-4 text-sm font-bold text-[#04215e]"
                    href={campus.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mapa
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4 border-l-4 border-[#e7a928] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-slate-600">
            También puedes recorrer virtualmente la explanada y las canchas del Campus Ciudad Azteca.
          </p>
          <Link
            className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-[#04215e]"
            href="/campus#recorrido-360"
          >
            Abrir recorrido 360
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
