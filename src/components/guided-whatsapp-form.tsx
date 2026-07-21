"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { ProgramLevel } from "@/types/content";

export type ProgramInterestOption = {
  name: string;
  level: ProgramLevel;
};

type GuidedWhatsAppFormProps = {
  programs: ProgramInterestOption[];
  campuses: string[];
  source?: string;
};

type FieldErrors = {
  name?: string;
  interest?: string;
};

export function GuidedWhatsAppForm({
  programs,
  campuses,
  source = "Formulario guiado",
}: GuidedWhatsAppFormProps) {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [campus, setCampus] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [whatsAppUrl, setWhatsAppUrl] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const interestRef = useRef<HTMLSelectElement>(null);

  const groupedPrograms = useMemo(() => {
    const groups = new Map<ProgramLevel, ProgramInterestOption[]>();

    programs.forEach((program) => {
      const current = groups.get(program.level) ?? [];
      current.push(program);
      groups.set(program.level, current);
    });

    return Array.from(groups.entries());
  }, [programs]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FieldErrors = {};
    const cleanName = name.trim();

    if (!cleanName) {
      nextErrors.name = "Escribe tu nombre para personalizar el mensaje.";
    }

    if (!interest) {
      nextErrors.interest = "Selecciona un programa o pide orientación.";
    }

    setErrors(nextErrors);

    if (nextErrors.name) {
      nameRef.current?.focus();
      return;
    }

    if (nextErrors.interest) {
      interestRef.current?.focus();
      return;
    }

    const url = buildWhatsAppUrl({
      name: cleanName,
      interest,
      campus: campus || undefined,
      source,
    });

    setWhatsAppUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="border border-white/18 bg-white/8 p-4 sm:p-8" noValidate onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:gap-5">
        <div>
          <label className="block text-sm font-bold text-white" htmlFor="lead-name">
            Nombre <span aria-hidden="true" className="text-[#e7a928]">*</span>
          </label>
          <input
            ref={nameRef}
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "lead-name-error" : undefined}
            className="mt-1.5 min-h-11 w-full border border-white/30 bg-white px-3 text-base text-[#071a3d] outline-none transition focus:border-[#e7a928] focus:ring-2 focus:ring-[#e7a928]/30 sm:mt-2 sm:min-h-12 sm:px-4"
            onChange={(event) => {
              setName(event.target.value);
              if (errors.name) setErrors((current) => ({ ...current, name: undefined }));
            }}
          />
          {errors.name ? (
            <p className="mt-2 text-sm text-[#ffd98a]" id="lead-name-error" role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-bold text-white" htmlFor="lead-interest">
            Programa de interés <span aria-hidden="true" className="text-[#e7a928]">*</span>
          </label>
          <select
            ref={interestRef}
            id="lead-interest"
            name="interest"
            value={interest}
            aria-invalid={Boolean(errors.interest)}
            aria-describedby={errors.interest ? "lead-interest-error" : undefined}
            className="mt-1.5 min-h-11 w-full border border-white/30 bg-white px-3 text-base text-[#071a3d] outline-none transition focus:border-[#e7a928] focus:ring-2 focus:ring-[#e7a928]/30 sm:mt-2 sm:min-h-12 sm:px-4"
            onChange={(event) => {
              setInterest(event.target.value);
              if (errors.interest) setErrors((current) => ({ ...current, interest: undefined }));
            }}
          >
            <option value="">Selecciona una opción</option>
            <option value="recibir orientación para elegir un programa">Necesito orientación</option>
            {groupedPrograms.map(([level, options]) => (
              <optgroup key={level} label={level}>
                {options.map((program) => (
                  <option key={program.name} value={program.name}>
                    {program.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {errors.interest ? (
            <p className="mt-2 text-sm text-[#ffd98a]" id="lead-interest-error" role="alert">
              {errors.interest}
            </p>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-bold text-white" htmlFor="lead-campus">
            Campus preferido <span className="font-normal text-white/65">(opcional)</span>
          </label>
          <select
            id="lead-campus"
            name="campus"
            value={campus}
            className="mt-1.5 min-h-11 w-full border border-white/30 bg-white px-3 text-base text-[#071a3d] outline-none transition focus:border-[#e7a928] focus:ring-2 focus:ring-[#e7a928]/30 sm:mt-2 sm:min-h-12 sm:px-4"
            onChange={(event) => setCampus(event.target.value)}
          >
            <option value="">Sin preferencia</option>
            {campuses.map((campusName) => (
              <option key={campusName} value={campusName}>
                {campusName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 bg-[#e7a928] px-4 text-sm font-bold text-[#071a3d] transition hover:bg-[#f0bd4b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mt-6 sm:min-h-12 sm:px-6"
        type="submit"
      >
        <MessageCircle aria-hidden="true" className="h-5 w-5" />
        Continuar por WhatsApp
      </button>

      <p className="mt-4 text-xs leading-5 text-white/62">
        UNIVAMEX no almacena estos datos en el sitio. Solo se utilizan para preparar tu mensaje de WhatsApp.
      </p>

      <div aria-live="polite" className="mt-3 min-h-6 text-sm text-white/78">
        {whatsAppUrl ? (
          <p>
            Se preparó tu mensaje. Si WhatsApp no se abrió, {" "}
            <Link className="inline-flex items-center gap-1 font-bold text-[#e7a928] underline" href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
              ábrelo aquí
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
