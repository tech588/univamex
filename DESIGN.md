# Sistema de diseño responsive de UNIVAMEX

Este documento es la referencia canónica para mantener el frontend compacto, legible y consistente sin alterar la identidad visual institucional ni el contenido académico.

## Principios

- La interfaz debe ayudar a comparar programas y llegar a admisiones con contexto.
- En móvil se prioriza densidad útil: menos espacio ornamental, controles táctiles claros y contenido académico progresivo.
- Una card solo se usa cuando agrupa una entidad o acción real. Los textos breves relacionados se presentan como filas, listas divididas, pestañas o acordeones.
- No se inventan testimonios, métricas, RVOE, modalidades, beneficios ni descripciones para llenar espacio.
- WhatsApp siempre usa el helper central y un mensaje contextual.

## Color y tipografía vigente

- Azul institucional principal: `#04215e`.
- Azul de acción: `#1e40af`.
- Oro de acento: `#e7a928`; para texto pequeño sobre fondo claro se usa `#b45309`.
- Fondos: blanco, `#f8fafc`, `#f3f6fb` y azul muy claro `#eff6ff`.
- El runtime actual conserva Atkinson Hyperlegible para cuerpo y Noto Serif Display / Source Serif 4 para títulos editoriales. Cambiar familias tipográficas requiere una tarea visual separada.

## Escala responsive

| Propiedad | Móvil `<640` | Tablet `640–1023` | Desktop `>=1024` |
| --- | --- | --- | --- |
| Gutter horizontal | 16 px | 24 px | 40 px |
| Padding vertical normal | 40 px | 56 px | 64–80 px según contexto |
| Padding vertical compacto | 28–36 px | 40–48 px | 40–56 px |
| Gap entre bloques | 16–24 px | 24–32 px | 32–40 px |
| Padding de card | 12–16 px | 20–24 px | 20–24 px |
| Altura mínima de control | 44 px | 44–48 px | 44–48 px |
| Header | 68 px | 84 px | 84 px |

Los breakpoints siguen Tailwind: `sm 640`, `md 768`, `lg 1024`, `xl 1280`.

## Ritmo tipográfico

- H1 móvil: normalmente `2–2.15rem`, `line-height 1.02`; debe caber en un máximo práctico de tres líneas.
- H2 móvil: `1.75rem`, `line-height 1.04`.
- Cuerpo móvil: `0.875–1rem`, `line-height 1.25–1.5` según longitud.
- Se reducen márgenes superiores a 8–20 px en móvil; las escalas amplias solo se recuperan desde `sm` o `lg`.
- No usar `leading-8` en textos móviles breves ni padding de 24–32 px para una sola frase.

## Fichas de programa

- El hero académico mantiene metadata en una cuadrícula 2×2 y acciones en una fila de dos columnas en móvil.
- `Resumen del programa` usa texto editorial y un bloque nativo `<details>` para “¿Este programa es para ti?”. Las filas se separan con divisores, no con cards individuales.
- `IA en tu carrera`, `Perfil de egreso` y `Campo laboral` viven en `ProgramInsights`. Son tres pestañas accesibles con equivalencia clic, touch y teclado (`←`, `→`, `Home`, `End`).
- Los paneles usan listas numeradas compactas. Todo el contenido permanece en el DOM aunque un panel esté oculto.
- Cada panel puede abrir WhatsApp con una pregunta contextual; nunca se envía un mensaje automáticamente.
- El plan de estudios usa tres datos compactos, periodos colapsables y asignaturas con padding reducido. La descarga PDF aparece como acción final después del último periodo.

## Componentes y cards

- Las cards de programas conservan imagen, nivel, modalidad, descripción, metadata y acciones porque representan una entidad navegable.
- En móvil, sus imágenes usan una relación más baja, el cuerpo tiene 16 px de padding y las dos acciones comparten fila.
- Datos cortos relacionados deben usar una cuadrícula 2×2, lista dividida o rail horizontal antes que cards verticales independientes.
- Los acordeones usan 16 px de padding móvil y 20 px desde tablet.

## Accesibilidad e interacción

- Estados `hover`, `focus-visible`, teclado y touch deben conducir a la misma información.
- Los objetivos táctiles mantienen al menos 44×44 px.
- El contenido no puede depender solo de hover.
- Las pestañas declaran `tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls` y foco gestionado.
- Se respeta `prefers-reduced-motion`; las animaciones existentes no deben bloquear navegación ni lectura.
- El botón flotante de WhatsApp usa `safe-area-inset-bottom` y un tamaño móvil de 48 px para no tapar controles.

## Verificación

- Ejecutar `npm.cmd run lint`, `npm.cmd run test:frontend` y `npm.cmd run build`.
- Revisar 390×844, 768×1024 y 1440×960.
- En cada ficha comprobar: H1, metadata 2×2, resumen colapsable, pestañas, navegación por teclado, plan de estudios, ausencia de overflow y enlace contextual de WhatsApp.
- Auditar las rutas del sitemap en móvil y revisar errores de consola.
