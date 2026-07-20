import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = process.cwd();

async function source(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)));
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(absolutePath);
    }
  }

  return files;
}

test("el home funciona como guía de un sitio multipágina", async () => {
  const home = await source("src/app/page.tsx");

  assert.match(home, /ProgramLevelsPreview/);
  assert.match(home, /HomePathways/);
  assert.match(home, /HomeCampusPreview/);
  assert.match(home, /HomeFaqPreview/);
  assert.match(home, /HomeContactGuide/);
  assert.doesNotMatch(home, /ProgramLevelsBento|StickyStorytelling/);
});

test("la oferta abre el contenido del home y usa una composición bento", async () => {
  const home = await source("src/app/page.tsx");
  const levels = await source("src/components/program-levels-preview.tsx");

  assert.ok(
    home.indexOf("<ProgramLevelsPreview />") <
      home.indexOf("<HomeInstitutional />"),
  );
  assert.ok(
    home.indexOf("<HomeInstitutional />") <
      home.indexOf("<HomeCampusPreview />"),
  );
  assert.match(levels, /xl:grid-cols-12/);
  assert.match(levels, /xl:row-span-2/);
  assert.match(levels, /xl:col-span-7/);
  assert.match(levels, /bg-\[#f8fafc\]/);
  assert.match(levels, /-mt-px/);
  assert.match(levels, /\/images\/BACHILLERATO\.png/);
  assert.match(levels, /\/images\/LICENCIATURAS\.png/);
  assert.doesNotMatch(levels, /legacy\/estudiantes-(bachillerato|profesional)\.jpg/);
});

test("las transiciones del hero y el footer no dibujan líneas divisorias", async () => {
  const footer = await source("src/components/footer.tsx");
  const levels = await source("src/components/program-levels-preview.tsx");

  assert.doesNotMatch(footer, /border-t|border-slate-200/);
  assert.match(levels, /-mt-px/);
});

test("quiénes somos presenta vida universitaria", async () => {
  const institutional = await source("src/components/home-institutional.tsx");

  assert.match(institutional, /VIDA-UNIVERSITARIA\.png/);
  assert.match(institutional, /vida universitaria/);
});

test("la ruta del home recupera el storytelling animado", async () => {
  const pathway = await source("src/components/home-pathways.tsx");

  assert.match(pathway, /AnimatePresence/);
  assert.doesNotMatch(pathway, /opacity: 0/);
  assert.match(pathway, /x: "100%"/);
  assert.match(pathway, /x: "-100%"/);
  assert.match(pathway, /duration: reduceMotion \? 0 : 0\.42/);
  assert.match(pathway, /ChevronLeft/);
  assert.match(pathway, /ChevronRight/);
  assert.match(pathway, /5000/);
  assert.match(pathway, /Elegir programa también debe sentirse acompañado/);
  assert.match(pathway, /\/oferta-academica/);
  assert.match(pathway, /\/admisiones/);
  assert.match(pathway, /\/campus/);
  assert.match(pathway, /instalaciones1\.jpg/);
  assert.match(pathway, /object-cover/);
  assert.match(pathway, /linear-gradient/);
  assert.doesNotMatch(pathway, /min-h-\[42rem\]/);
});

test("la nueva fotografía identifica el Campus Ciudad Azteca", async () => {
  const campuses = await source("src/data/campuses.ts");

  assert.match(campuses, /instalaciones1\.jpg/);
  assert.match(campuses, /Vista exterior del Campus Ciudad Azteca/);
  assert.match(campuses, /imageWidth: 1040/);
  assert.match(campuses, /imageHeight: 584/);
});

test("las preguntas y subtítulos usan una serif editorial legible", async () => {
  const styles = await source("src/app/globals.css");
  const faq = await source("src/components/home-faq-preview.tsx");
  const hero = await source("src/components/hero.tsx");
  const pageHero = await source("src/components/page-hero.tsx");
  const nonHeroComponents = (
    await Promise.all(
      (await collectFiles(path.join(root, "src")))
        .filter(
          (file) =>
            !file.endsWith(`${path.sep}hero.tsx`) &&
            !file.endsWith(`${path.sep}page-hero.tsx`),
        )
        .map((file) => readFile(file, "utf8")),
    )
  ).join("\n");

  assert.match(styles, /Source\+Serif\+4/);
  assert.match(styles, /--font-editorial/);
  assert.match(styles, /--font-heading: var\(--font-editorial-copy\)/);
  assert.match(faq, /font-editorial/);
  assert.match(hero, /var\(--font-soft-display\)/);
  assert.match(pageHero, /var\(--font-hero\)/);
  assert.doesNotMatch(nonHeroComponents, /var\(--font-soft-display\)/);
});

test("cada adelanto del home enlaza con una página dedicada", async () => {
  const files = await Promise.all([
    source("src/components/home-institutional.tsx"),
    source("src/components/program-levels-preview.tsx"),
    source("src/components/home-pathways.tsx"),
    source("src/components/home-campus-preview.tsx"),
    source("src/components/home-faq-preview.tsx"),
    source("src/components/home-contact-guide.tsx"),
  ]);
  const content = files.join("\n");

  for (const route of [
    "/quienes-somos",
    "/oferta-academica",
    "/admisiones",
    "/campus",
    "/faq",
    "/contacto",
  ]) {
    assert.match(content, new RegExp(route.replaceAll("/", "\\/")));
  }
});

test("la página institucional usa información real consolidada", async () => {
  const institutional = await source("src/data/institutional.ts");
  const page = await source("src/app/quienes-somos/page.tsx");

  assert.match(institutional, /experienceYears: 50/);
  assert.match(institutional, /Bachillerato: 3/);
  assert.match(institutional, /Licenciatura: 14/);
  assert.match(institutional, /Maestría: 2/);
  assert.match(institutional, /Doctorado: 1/);
  assert.match(institutional, /7 Reglas|Tus valores|Amor a la patria/);
  assert.match(page, /Misión, visión y filosofía/);
  assert.match(page, /Lema y escudo/);
});

test("becas y colegiaturas permanecen fuera del sitio hasta tener autorización", async () => {
  const site = await source("src/data/site.ts");
  const sitemap = await source("src/app/sitemap.ts");

  assert.doesNotMatch(site, /becas-y-colegiaturas|Becas y colegiaturas/);
  assert.doesNotMatch(sitemap, /becas-y-colegiaturas/);
  await assert.rejects(() => source("src/app/becas-y-colegiaturas/page.tsx"));
});

test("las páginas SEO nuevas usan héroes institucionales a todo lo ancho", async () => {
  const university = await source("src/app/universidad-en-ecatepec/page.tsx");
  const pages = await Promise.all([
    source("src/app/areas/[slug]/page.tsx"),
    source("src/app/rvoe/page.tsx"),
  ]);

  assert.match(university, /<Hero/);
  for (const page of pages) assert.match(page, /PageHero/);
  assert.doesNotMatch([university, ...pages].join("\n"), /imageFit="contain"/);
});

test("los mensajes generales de WhatsApp no exponen la página de origen", async () => {
  const whatsapp = await source("src/lib/whatsapp.ts");
  const button = await source("src/components/whatsapp-button.tsx");

  assert.doesNotMatch(whatsapp, /Vengo de la página|Vengo de pagina/);
  assert.match(whatsapp, /Hola, quiero informes de UNIVAMEX\./);
  assert.doesNotMatch(button, /md:hidden|w-full/);
  assert.match(button, /!rounded-full/);
  assert.match(button, /\[&>span\]:sr-only/);
});

test("las páginas de nivel conservan acceso a toda la oferta al cambiar filtros", async () => {
  const levelPage = await source("src/components/level-page.tsx");

  assert.match(levelPage, /programs=\{programs\}/);
  assert.match(levelPage, /navigateOnLevelChange/);
  assert.doesNotMatch(levelPage, /getProgramsByLevel/);
});
