import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const testDir = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(testDir, "../..");
const srcRoot = join(appRoot, "src");

function read(relativePath) {
  return readFileSync(join(appRoot, relativePath), "utf8");
}

function listSourceFiles(dir = srcRoot) {
  return readdirSync(dir).flatMap((entry) => {
    const absolutePath = join(dir, entry);
    const stat = statSync(absolutePath);

    if (stat.isDirectory()) {
      return listSourceFiles(absolutePath);
    }

    return [absolutePath];
  });
}

test("homepage uses the new three-section structure", () => {
  const home = read("src/app/page.tsx");

  assert.match(home, /Hero/);
  assert.match(home, /ProgramLevelsBento/);
  assert.match(home, /StickyStorytelling/);
  assert.doesNotMatch(home, /ProgramFinder/);
  assert.doesNotMatch(home, /Cierre home/);
});

test("header swaps horizontal logos and uses the display font", () => {
  const header = read("src/components/header.tsx");
  const globals = read("src/app/globals.css");

  assert.match(header, /"use client"/);
  assert.match(header, /framer-motion/);
  assert.match(globals, /family=Cinzel/);
  assert.match(globals, /--font-display:\s*"Cinzel"/);
  assert.match(header, /Logo Horizontal\/blanco\.png/);
  assert.match(header, /Logo Horizontal\/azul\.png/);
  assert.match(header, /w-\[12\.9rem\]/);
  assert.match(header, /sm:w-\[16\.65rem\]/);
  assert.match(header, /setScrolled\(window\.scrollY > 24\)/);
  assert.match(header, /bg-white\/95/);
  assert.match(header, /text-\[#04215e\]/);
  assert.match(header, /Menu/);
  assert.match(header, /Solicitar informes/);
});

test("hero uses a blue film, right-side portrait, particles, and only an H1", () => {
  const hero = read("src/components/hero.tsx");

  assert.match(hero, /DECÍDETE A LLEGAR MÁS LEJOS/);
  assert.match(hero, /home-hero\.jpg/);
  assert.match(hero, /foto-hero\.webp/);
  assert.match(hero, /bg-\[#04215e\]\/32/);
  assert.match(hero, /rgba\(4,33,94,0\.94\)/);
  assert.match(hero, /right-\[calc\(-28vw\+40px\)\]/);
  assert.match(hero, /lg:right-\[calc\(-5vw\+40px\)\]/);
  assert.match(hero, /w-\[140vw\]/);
  assert.match(hero, /lg:w-\[76vw\]/);
  assert.match(hero, /group\/portrait/);
  assert.match(hero, /group-hover\/portrait:scale-\[1\.035\]/);
  assert.match(hero, /motion\.circle/);
  assert.match(hero, /font-heading/);
  assert.match(hero, /font-semibold/);
  assert.match(hero, /sm:ml-\[30px\]/);
  assert.doesNotMatch(hero, /description:/);
  assert.doesNotMatch(hero, /<motion\.p[\s>]/);
  assert.doesNotMatch(hero, /WhatsAppButton|ArrowRight|href="\/oferta-academica"/);
});

test("hero mobile is wide and reference-led", () => {
  const hero = read("src/components/hero.tsx");

  assert.match(hero, /w-\[140vw\]/);
  assert.match(hero, /h-\[82svh\]/);
  assert.match(hero, /sm:hidden/);
  assert.match(hero, /circle cx="86"/);
  assert.match(hero, /px-4/);
  assert.doesNotMatch(hero, /max-w-7xl/);
});

test("program levels are a selector with expanding cards", () => {
  const programs = read("src/components/program-levels-bento.tsx");

  assert.match(programs, /useState/);
  assert.match(programs, /Oferta disponible/);
  assert.match(programs, /Bachilleratos/);
  assert.match(programs, /Licenciaturas/);
  assert.match(programs, /Maestrías/);
  assert.match(programs, /AnimatePresence/);
  assert.match(programs, /LayoutGroup/);
  assert.match(programs, /layoutId/);
  assert.match(programs, /clipPath/);
  assert.match(programs, /Siguiente/);
  assert.match(programs, /blur-\[2px\]/);
  assert.match(programs, /hidden h-\[16rem\]/);
  assert.doesNotMatch(programs, /Explorar oferta/);
  assert.doesNotMatch(programs, /Ver toda la oferta/);
  assert.doesNotMatch(programs, /uppercase/);
});

test("storytelling is a modern carousel without CTA buttons", () => {
  const storytelling = read("src/components/sticky-storytelling.tsx");

  assert.match(storytelling, /useState/);
  assert.match(storytelling, /AnimatePresence/);
  assert.match(storytelling, /ChevronLeft/);
  assert.match(storytelling, /ChevronRight/);
  assert.match(storytelling, /Elegir programa/);
  assert.match(storytelling, /también debe/);
  assert.match(storytelling, /sentirse acompañado/);
  assert.match(storytelling, /Admisiones claras/);
  assert.doesNotMatch(storytelling, /uppercase/);
  assert.doesNotMatch(storytelling, /WhatsAppButton/);
  assert.doesNotMatch(storytelling, /Ver admisiones/);
  assert.doesNotMatch(storytelling, /Conocer mas|Conocer más/);
  assert.doesNotMatch(storytelling, /href=/);
});

test("homepage clips overflow and forces square UI geometry", () => {
  const globals = read("src/app/globals.css");

  assert.match(globals, /html\s*{[^}]*overflow-x:\s*hidden/s);
  assert.match(globals, /body\s*{[^}]*max-width:\s*100%/s);
  assert.match(globals, /\.home-main\s*{[^}]*overflow-x:\s*clip/s);
  assert.match(globals, /border-radius:\s*0 !important/);
  assert.match(globals, /--blue-700:\s*#04215e/);
});

test("academic offer has separate maestrias and doctorados routes", () => {
  const maestrias = read("src/app/oferta-academica/maestrias/page.tsx");
  const doctorados = read("src/app/oferta-academica/doctorados/page.tsx");

  assert.match(maestrias, /LevelPage level="Maestr(Ã­a|ía)"/);
  assert.match(doctorados, /LevelPage level="Doctorado"/);
});

test("visible copy outside contact does not mention WhatsApp", () => {
  const allowed = new Set([
    "src/app/contacto/page.tsx",
    "src/components/whatsapp-button.tsx",
    "src/data/site.ts",
    "src/lib/whatsapp.ts",
  ]);

  const offenders = listSourceFiles()
    .filter((file) => /\.(tsx|ts)$/.test(file))
    .flatMap((file) => {
      const relativePath = relative(appRoot, file).replaceAll("\\", "/");
      if (allowed.has(relativePath)) {
        return [];
      }

      return readFileSync(file, "utf8")
        .split(/\r?\n/)
        .map((line, index) => ({ line, index: index + 1, relativePath }))
        .filter(({ line }) => /WhatsApp/.test(line))
        .filter(
          ({ line }) =>
            !/WhatsAppButton|FloatingWhatsApp|buildWhatsAppUrl/.test(line),
        );
    });

  assert.deepEqual(offenders, []);
});
