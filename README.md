# UNIVAMEX

Sitio web moderno para el Colegio Universitario del Valle de México - UNIVAMEX.

## Objetivo

La etapa 1 busca públicar rápido una web estática, clara y orientada a conversión, donde aspirantes y tutores puedan:

- Encontrar programas por nivel, área y modalidad.
- Revisar duración, RVOE, campo laboral, requisitos y plan de estudios.
- Entender el diferenciador de inteligencia artificial aplicada a cada carrera.
- Contactar a la universidad por WhatsApp oficial sin fricción.

## Estructura

```text
univamex/
  UNIVAMEX_estructura_web.md
  README.md
  AGENTS.md
  docs/
    PRD.md
    UI_UX.md
    superpowers/
      plans/
        2026-07-07-etapa-1-univamex.md
  univamex-web/
    src/
    public/
    package.json
```

La documentación vive fuera de `univamex-web/`. La app Next.js vive dentro de `univamex-web/`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- `next/font/google`
- `next/image`
- Lucide React para iconos

## Comandos

Desde `univamex-web/`:

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Fuente De Contenido

La fuente canónica inicial es `UNIVAMEX_estructura_web.md`. Si hay inconsistencias de RVOE, modalidad o duración, el sitio debe marcarlas como `por confirmar` y dirigir cualquier duda a WhatsApp.

## WhatsApp

Número oficial: `55-29-94-53-81`

URL base:

```text
https://wa.me/525529945381
```

Todos los CTAs de etapa 1 deben usar mensajes precargados y contexto del programa o página.

## Producción

La etapa 1 debe poder desplegarse como sitio estático/SSG. El contenido puede evolucionar después a CMS, blog, CRM y analítica avanzada.




