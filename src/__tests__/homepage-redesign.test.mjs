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
  assert.match(header, /Solicitar informes/);
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
