from __future__ import annotations

import json
import re
import sys
from contextlib import redirect_stdout
from pathlib import Path

from docx import Document


PROGRAM_SLUGS = {
    "Bachillerato en Informática Administrativa": "bachillerato-informatica-administrativa",
    "Bachillerato en Trabajo Social": "bachillerato-trabajo-social",
    "Bachillerato en Turismo": "bachillerato-turismo",
    "Licenciatura en Administración": "licenciatura-administracion",
    "Licenciatura en Arquitectura": "licenciatura-arquitectura",
    "Licenciatura en Comercio y Negocios Internacionales": "comercio-negocios-internacionales",
    "Licenciatura en Comunicación y Medios Digitales": "comunicacion-medios-digitales",
    "Licenciatura en Criminología y Criminalística": "criminologia-criminalistica",
    "Licenciatura en Derecho": "licenciatura-derecho",
    "Licenciatura en Diseño Gráfico y Multimedia": "diseno-grafico-multimedia",
    "Licenciatura en Ingeniería en Arte Digital y Videojuegos": "ingenieria-arte-digital-videojuegos",
    "Licenciatura en Ingeniería en Inteligencia Artificial y Big Data": "ingenieria-ia-big-data",
    "Licenciatura en Ingeniería en Sistemas Computacionales": "ingenieria-sistemas-computacionales",
    "Licenciatura en Mercadotecnia Digital y Redes Sociales": "mercadotecnia-digital-redes-sociales",
    "Licenciatura en Pedagogía": "licenciatura-pedagogia",
    "Licenciatura en Psicología": "licenciatura-psicologia",
    "Licenciatura en Turismo": "licenciatura-turismo",
    "Maestría en Educación": "maestria-educacion",
    "Maestría en Juicios Orales": "maestria-juicios-orales",
    "Doctorado en Educación, Neurociencias y Perspectiva de Género": "doctorado-educacion-neurociencias-genero",
}


def clean_subject(value: str) -> str:
    value = re.sub(r"^[-•]\s*", "", value.strip())
    return value[:-1] if value.endswith(".") else value


def extract_plan(path: Path) -> tuple[str, list[dict[str, object]]]:
    lines = [" ".join(paragraph.text.split()) for paragraph in Document(path).paragraphs]
    title = next((line[2:] for line in lines if line.startswith("# ")), path.stem)
    start = next(
        index
        for index, line in enumerate(lines)
        if line.lower() in {"## plan de estudio", "## plan de estudios"}
    )
    phase = "Plan de estudios"
    periods: list[dict[str, object]] = []
    current: dict[str, object] | None = None

    for line in lines[start + 1 :]:
        if line.startswith("## "):
            phase = line[3:]
        elif line.startswith("### "):
            current = {"title": line[4:], "phase": phase, "items": []}
            periods.append(current)
        elif line.startswith(("- ", "• ")) and current:
            current["items"].append(clean_subject(line))

    if not periods or any(not period["items"] for period in periods):
        raise ValueError(f"Incomplete study plan in {path}")
    return title, periods


def quote(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


plans: dict[str, list[dict[str, object]]] = {}
for path in sorted(Path("docs").rglob("*.docx")):
    if path.name.startswith("Información") or path.name == "Precios.docx":
        continue
    title, periods = extract_plan(path)
    slug = PROGRAM_SLUGS.get(title)
    if not slug:
        raise KeyError(f"No slug mapping for {title!r} from {path}")
    plans[slug] = periods

missing = set(PROGRAM_SLUGS.values()) - set(plans)
if missing:
    raise ValueError(f"Missing plans: {sorted(missing)}")

def emit() -> None:
    print('import type { StudyBlock } from "@/types/content";')
    print()
    print("// Generated from the ignored reference DOCX files in docs/.")
    print("export const studyPlans: Record<string, StudyBlock[]> = {")
    for slug, periods in plans.items():
        print(f"  {quote(slug)}: [")
        for period in periods:
            print("    {")
            print(f"      title: {quote(period['title'])},")
            print(f"      phase: {quote(period['phase'])},")
            print("      items: [")
            for subject in period["items"]:
                print(f"        {quote(subject)},")
            print("      ],")
            print("    },")
        print("  ],")
    print("};")


if len(sys.argv) == 2:
    with Path(sys.argv[1]).open("w", encoding="utf-8", newline="\n") as output:
        with redirect_stdout(output):
            emit()
else:
    emit()
