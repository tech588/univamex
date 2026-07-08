# AGENTS.md

Guía para agentes que trabajen en el proyecto UNIVAMEX.

## Objetivo Del Producto

Construir una página moderna, intuitiva y fácil de usar que lleve a usuarios a pedir informes e inscribirse en UNIVAMEX. La conversión principal de etapa 1 es abrir WhatsApp oficial con un mensaje contextual.

## Reglas De Arquitectura

- La app Next.js vive en `univamex-web/`.
- La documentación del proyecto vive fuera de `univamex-web/`.
- No mover `UNIVAMEX_estructura_web.md`; es la fuente textual consolidada.
- No crear backend ni CMS en etapa 1.
- Mantener el contenido académico en datos TypeScript tipados para migración futura a CMS.
- Usar App Router y Server Components por defecto.
- Usar Client Components solo para interacciones como filtros, menú móvil o acordeones.

## Fuente Canónica

Usar `UNIVAMEX_estructura_web.md` como fuente inicial. Antes de públicar datos legales o académicos dudosos:

- RVOE de Comercio y Negocios Internacionales: validar `20253797` vs `20252397`.
- Ingeniería en IA y Big Data: validar RVOE/modalidades `20253798` y `20253799`.
- Derecho, Pedagogía e Ingeniería en Arte Digital y Videojuegos tienen variantes por modalidad.
- Modalidades como presencial, escolarizada, mixta, línea y no escolarizada aparecen mezcladas.

Cuando algo no esté confirmado, mostrar `por confirmar` y llevar la duda a WhatsApp.

## WhatsApp

Usar siempre el helper central de WhatsApp. No hardcodear enlaces sueltos en componentes.

- Número visible: `55-29-94-53-81`
- Número wa.me: `525529945381`
- Mensajes deben incluir página/programa cuando aplique.

Ejemplo de intención:

```text
Hola, quiero información sobre Licenciatura en Ingeniería en Inteligencia Artificial y Big Data en UNIVAMEX.
```

## UI/UX

Seguir `docs/UI_UX.md`.

- Paleta: azul autoridad, azul institucional, oro acento.
- Tipografía: Lexend para headings, Source Sans 3 para cuerpo.
- Estilo: educativo, moderno, confiable, claro.
- Evitar estética de startup IA con morados/rosas dominantes.
- Evitar claims no validados, métricas falsas, badges decorativos y secciónes sin contenido real.
- Usar imágenes realistas de estudiantes, aulas, tecnología, educación y servicios.

## Componentes Esperados

- Header con navegación básica y CTA.
- Hero con buscador de programas.
- Catálogo filtrable.
- Cards de programa.
- Bloque recurrente `IA en tu carrera`.
- Acordeones para plan de estudios, requisitos y FAQs.
- CTA fijo en móvil a WhatsApp.
- Footer con teléfono, WhatsApp, correo y Facebook.

## Calidad

Antes de declarar una tarea terminada:

- Ejecutar `npm run lint`.
- Ejecutar `npm run build`.
- Revisar responsive en ancho móvil y desktop.
- Probar enlaces de WhatsApp.
- Verificar que no haya texto placeholder.
- Verificar contraste, headings, labels y alt text.

## Git

El remoto del repo es:

```text
https://github.com/tech588/univamex.git
```

No revertir cambios ajenos. Si aparecen cambios inesperados, revisarlos y trabajar con ellos.




