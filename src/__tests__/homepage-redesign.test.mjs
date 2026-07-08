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

test("homepage uses the redesigned sections and removes the home finder", () => {
  const home = read("src/app/page.tsx");

  assert.match(home, /ProgramLevelsBento/);
  assert.match(home, /StickyStorytelling/);
  assert.doesNotMatch(home, /ProgramFinder/);
});

test("header is a motion-enabled responsive navigation", () => {
  const header = read("src/components/header.tsx");

  assert.match(header, /"use client"/);
  assert.match(header, /framer-motion/);
  assert.match(header, /Menu/);
  assert.match(header, /logo-univamex-cropped\.png/);
  assert.match(header, /x: "100%"/);
  assert.match(header, /right-0/);
  assert.match(header, /Solicitar informes/);
  assert.doesNotMatch(header, /GraduationCap/);
  assert.doesNotMatch(header, /h-11 w-11 items-center justify-center rounded-lg border/);
  assert.doesNotMatch(header, /label="WhatsApp"|>WhatsApp</);
});

test("hero follows the approved dark editorial structure", () => {
  const hero = read("src/components/hero.tsx");

  assert.match(hero, /Decidete|Decídete/);
  assert.match(hero, /Ver oferta academica|Ver oferta académica/);
  assert.match(hero, /hero-concave|concave|clip-path|rounded-\[50%/);
  assert.match(hero, /framer-motion|motion/);
  assert.match(hero, /useScroll/);
  assert.match(hero, /useTransform/);
  assert.match(hero, /blur\(/);
  assert.doesNotMatch(hero, /por WhatsApp|label="[^"]*WhatsApp|>WhatsApp</);
});

test("hero keeps a pure sticky parallax handoff into programs", () => {
  const hero = read("src/components/hero.tsx");

  assert.match(hero, /object-\[72%_center\]/);
  assert.match(hero, /h-\[64vw\]/);
  assert.match(hero, /h-\[190svh\]/);
  assert.match(hero, /sm:h-\[190dvh\]/);
  assert.doesNotMatch(hero, /Explorar programas/);
  assert.doesNotMatch(hero, /ChevronDown/);
  assert.doesNotMatch(hero, /exploreOpacity/);
  assert.doesNotMatch(hero, /inset-x-\[-8%\]/);
  assert.doesNotMatch(hero, /const imageY/);
  assert.doesNotMatch(hero, /const mobileImageY/);
});

test("program levels section rises as a solid overlay", () => {
  const programs = read("src/components/program-levels-bento.tsx");

  assert.match(programs, /-mt-\[100svh\]/);
  assert.match(programs, /sm:-mt-\[100dvh\]/);
  assert.match(programs, /bg-\[#061533\]/);
  assert.match(programs, /scale-x-110/);
  assert.doesNotMatch(programs, /inset-x-\[-8%\]/);
  assert.doesNotMatch(programs, /rgba\(6,21,51,0\)_0%/);
});

test("homepage clips horizontal overflow on mobile", () => {
  const globals = read("src/app/globals.css");

  assert.match(globals, /html\s*{[^}]*overflow-x:\s*hidden/s);
  assert.match(globals, /body\s*{[^}]*max-width:\s*100%/s);
  assert.match(globals, /\.home-main\s*{[^}]*overflow-x:\s*clip/s);
});

test("program levels owns the centered explore prompt", () => {
  const programs = read("src/components/program-levels-bento.tsx");

  assert.match(programs, /ChevronDown/);
  assert.match(programs, /Explorar programas/);
  assert.match(programs, /exploreOpacity/);
  assert.match(programs, /top-\[0\.25rem\]/);
  assert.match(programs, /left-1\/2/);
  assert.doesNotMatch(programs, /h-px bg-white\/10/);
});

test("sticky storytelling centers copy and reveals panels with blur", () => {
  const storytelling = read("src/components/sticky-storytelling.tsx");

  assert.match(storytelling, /lg:sticky/);
  assert.match(storytelling, /lg:min-h-screen/);
  assert.match(storytelling, /lg:items-center/);
  assert.match(storytelling, /blur\(16px\)/);
  assert.match(storytelling, /y: 72/);
});

test("academic offer has separate maestrias and doctorados routes", () => {
  const maestrias = read("src/app/oferta-academica/maestrias/page.tsx");
  const doctorados = read("src/app/oferta-academica/doctorados/page.tsx");

  assert.match(maestrias, /LevelPage level="Maestría"/);
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
