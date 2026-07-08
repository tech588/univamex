# PRD - UNIVAMEX Etapa 1

## Resumen

UNIVAMEX necesita una web moderna y de públicación rápida para transformar su información académica en una experiencia de orientación e inscripción. La etapa 1 será estática, SEO-friendly y preparada para evolucionar a CMS, blog, CRM y analítica.

## Objetivo

Llevar a aspirantes, tutores y profesionistas a contactar a UNIVAMEX por WhatsApp oficial para pedir informes, resolver dudas e iniciar su proceso de inscripción.

## Usuarios

- Aspirantes de bachillerato y sus tutores.
- Aspirantes a licenciatura que comparan carrera, duración, modalidad y campo laboral.
- Profesionistas interésados en maestrías o doctorado.
- Personas que llegan desde búsqueda, redes sociales, anuncios o recomendación.

## Alcance Etapa 1

Incluye:

- Home con hero, buscador de programas, CTA a WhatsApp, oferta por nivel y diferenciador de IA.
- Catálogo de oferta académica con filtros por nivel, área y modalidad.
- Landings por nivel: bachilleratos, licenciaturas y posgrados.
- Páginas individuales de programa.
- Admisiónes con requisitos por nivel.
- Contacto con teléfono, WhatsApp, correo y Facebook.
- SEO básico por ruta.
- Imágenes realistas de stock o generadas por IA.

No incluye:

- CMS real.
- Blog.
- CRM.
- Pagos.
- Login.
- Formularios persistidos en base de datos.
- Clínica psicopedagógica, hasta tener copy validado.

## Conversión Principal

Abrir WhatsApp oficial con mensaje precargado.

Número visible: `55-29-94-53-81`

URL base:

```text
https://wa.me/525529945381
```

## Requisitos Funcionales

- El usuario puede buscar y filtrar programas.
- El usuario puede abrir una página de programa desde el catálogo.
- Cada página de programa muestra nombre, nivel, área, modalidad, duración, RVOE, descripción, IA aplicada, campo laboral, plan, requisitos y CTA.
- El usuario puede contactar por WhatsApp desde cualquier página clave.
- Las dudas sobre costos, becas, horarios, ubicación o fechas de inicio llevan a WhatsApp.
- Los datos no confirmados se muestran como `por confirmar`.

## Requisitos No Funcionales

- Next.js App Router con SSG.
- TypeScript estricto donde sea práctico.
- Tailwind CSS.
- Accesibilidad AA.
- Imágenes optimizadas con `next/image`.
- Layout mobile-first.
- Sin placeholders visibles.
- Build y lint deben pasar antes de públicar.

## Contenido

Fuente principal: `UNIVAMEX_estructura_web.md`.

Programas iniciales:

- 3 bachilleratos.
- Licenciaturas listadas en el documento.
- 2 maestrías.
- 1 doctorado.

## Riesgos

- Inconsistencias en RVOE y modalidades.
- Faltan costos, becas, ubicación, horarios y fechas de inicio.
- No hay galería oficial validada.
- No hay política de privacidad confirmada para formularios.

## Criterios De Aceptacion

- Se puede navegar de Home a catálogo, programa, admisiónes y contacto.
- Todos los CTAs principales abren WhatsApp con mensaje contextual.
- Cada programa tiene URL estable.
- El catálogo filtra correctamente.
- La web se ve profesional en móvil y desktop.
- `npm run lint` y `npm run build` pasan.




