# UNIVAMEX Etapa 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a modern static UNIVAMEX website that helps users find academic programs and contact the official WhatsApp.

**Architecture:** The repository root stores project documentation and content source. The Next.js app lives in `univamex-web/`, uses App Router, typed static data, SSG pages, and reusable UI components.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, next/font, next/image, Lucide React.

## Global Constraints

- Documentation stays outside `univamex-web/`.
- WhatsApp is the primary lead channel: `https://wa.me/525529945381`.
- Use `UNIVAMEX_estructura_web.md` as the initial canónical content source.
- Mark inconsistent RVOE/modalidad data as `por confirmar`.
- Do not add CMS, backend, CRM, payment, auth, or persisted forms in etapa 1.
- Use realistic imagery only; no fake official logos or unvalidated claims.

---

### Task 1: Repository And Documentation

**Files:**
- Create: `README.md`
- Create: `AGENTS.md`
- Create: `docs/PRD.md`
- Create: `docs/UI_UX.md`
- Create: `docs/superpowers/plans/2026-07-07-etapa-1-univamex.md`

**Interfaces:**
- Produces root project context and implementation contract for all later tasks.

- [ ] Create root docs.
- [ ] Initialize git in root repo.
- [ ] Set remote to `https://github.com/tech588/univamex.git`.
- [ ] Verify `git status --short`.

### Task 2: Next.js App Setup

**Files:**
- Create: `univamex-web/`
- Modify: `univamex-web/package.json`

**Interfaces:**
- Produces runnable app with scripts: `dev`, `lint`, `build`.

- [ ] Run `npx create-next-app@latest univamex-web --yes --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --use-npm`.
- [ ] Install `lucide-react`.
- [ ] Remove app-local README if generated.
- [ ] Verify `npm run lint`.

### Task 3: Content Model

**Files:**
- Create: `univamex-web/src/types/content.ts`
- Create: `univamex-web/src/data/site.ts`
- Create: `univamex-web/src/data/admissions.ts`
- Create: `univamex-web/src/data/programs.ts`
- Create: `univamex-web/src/lib/whatsapp.ts`

**Interfaces:**
- Produces `programs`, `admissionsByLevel`, `siteConfig`, `buildWhatsAppUrl()`.

- [ ] Define content types.
- [ ] Add site config and WhatsApp helper.
- [ ] Add admissions requirements.
- [ ] Add program data from `UNIVAMEX_estructura_web.md`.
- [ ] Verify TypeScript with `npm run build`.

### Task 4: UI System And Components

**Files:**
- Modify: `univamex-web/src/app/globals.css`
- Modify: `univamex-web/src/app/layout.tsx`
- Create: `univamex-web/src/components/*`

**Interfaces:**
- Produces shared layout, buttons, cards, filters, accordions, sections and footer.

- [ ] Add fonts, metadata and global tokens.
- [ ] Build header/footer.
- [ ] Build WhatsApp CTA variants.
- [ ] Build catalog filters and program cards.
- [ ] Build accordions and admissions checklist.
- [ ] Verify mobile and desktop rendering.

### Task 5: Routes

**Files:**
- Modify/Create: `univamex-web/src/app/**/page.tsx`

**Interfaces:**
- Produces public pages and static program routes.

- [ ] Build home page.
- [ ] Build offer catalog.
- [ ] Build level pages.
- [ ] Build program detail route with `generateStaticParams`.
- [ ] Build admissions page.
- [ ] Build contact page.
- [ ] Verify all nav links and WhatsApp URLs.

### Task 6: Assets And Final Verification

**Files:**
- Create: `univamex-web/public/images/*`

**Interfaces:**
- Produces final visual polish and launch-ready build.

- [ ] Add realistic image assets.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run local dev server and inspect responsive UI.
- [ ] Commit working state.
- [ ] Push to GitHub remote.



