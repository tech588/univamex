import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("la ficha de programa conserva metadata 2x2 y usa el explorador interactivo", async () => {
  const page = await read("../app/programas/[slug]/page.tsx");

  assert.match(page, /grid grid-cols-2 gap-2/);
  assert.match(page, /<ProgramInsights/);
  assert.match(page, /aiApplications=\{program\.aiApplications\}/);
  assert.match(page, /graduateProfile=\{program\.graduateProfile\}/);
  assert.match(page, /careerField=\{program\.careerField\}/);
  assert.match(page, /<details[^>]*open>/);
  assert.match(page, /compact/);
  assert.match(page, /className="contents lg:block"/);
  assert.match(page, /order-1 aspect-\[16\/10\]/);
  assert.match(page, /<StudyPlan[\s\S]*pdfHref=/);
  assert.doesNotMatch(page, /program\.aiApplications\.map/);
});

test("el explorador académico ofrece tabs accesibles y contenido completo", async () => {
  const component = await read("../components/program-insights.tsx");

  assert.match(component, /role="tablist"/);
  assert.match(component, /role="tab"/);
  assert.match(component, /role="tabpanel"/);
  assert.match(component, /ArrowRight/);
  assert.match(component, /ArrowLeft/);
  assert.match(component, /hidden=\{!active\}/);
  assert.match(component, /<WhatsAppButton/);
});

test("los contratos móviles usan header compacto, gutter de 16px y secciones de 40px", async () => {
  const [globals, header, programPage] = await Promise.all([
    read("../app/globals.css"),
    read("../components/header.tsx"),
    read("../app/programas/[slug]/page.tsx"),
  ]);

  assert.match(globals, /padding-top: 4\.25rem/);
  assert.match(header, /min-h-\[4\.25rem\]/);
  assert.match(programPage, /px-4 py-10/);
  assert.match(programPage, /sm:px-6 sm:py-14/);
});

test("WhatsApp conserva programa y pregunta en el contexto de la ficha", async () => {
  const helper = await read("../lib/whatsapp.ts");

  assert.match(helper, /context\.program && context\.question/);
  assert.match(helper, /Tengo una duda sobre \$\{context\.question\}/);
});

test("el plan termina con la descarga sin instrucciones redundantes", async () => {
  const studyPlan = await read("../components/study-plan.tsx");

  assert.doesNotMatch(studyPlan, /Selecciona un periodo/);
  assert.match(studyPlan, /Descargar PDF/);
  assert.match(studyPlan, /mt-4 flex justify-end/);
});
