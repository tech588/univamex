from __future__ import annotations

import re
import shutil
from pathlib import Path

from docx import Document
from PIL import Image as PILImage
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
OUTPUT_DIR = ROOT / "output" / "pdf" / "planes-estudio"
PUBLIC_DIR = ROOT / "public" / "pdf" / "planes-estudio"
LOGO = ROOT / "public" / "logos" / "Logo Horizontal" / "blanco.png"
TRIMMED_LOGO = ROOT / "tmp" / "pdfs" / "univamex-logo-white-optimized.png"

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

COLORS = {
    "navy": HexColor("#071F4B"),
    "gold": HexColor("#D7A928"),
    "ink": HexColor("#14213D"),
    "muted": HexColor("#5F6B7C"),
    "paper": HexColor("#F7F9FC"),
    "line": HexColor("#DCE4EF"),
    "basic": HexColor("#1B6CA8"),
    "professional": HexColor("#0B7A75"),
    "specialization": HexColor("#C58B14"),
}


def register_fonts() -> tuple[str, str]:
    regular = Path("C:/Windows/Fonts/arial.ttf")
    bold = Path("C:/Windows/Fonts/arialbd.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("UI", regular))
        pdfmetrics.registerFont(TTFont("UI-Bold", bold))
        return "UI", "UI-Bold"
    return "Helvetica", "Helvetica-Bold"


def prepare_logo() -> tuple[int, int]:
    TRIMMED_LOGO.parent.mkdir(parents=True, exist_ok=True)
    with PILImage.open(LOGO).convert("RGBA") as image:
        bbox = image.getchannel("A").getbbox()
        trimmed = image.crop(bbox) if bbox else image
        trimmed.thumbnail((1200, 280), PILImage.Resampling.LANCZOS)
        trimmed.save(TRIMMED_LOGO, optimize=True)
        return trimmed.size


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
        raise ValueError(f"Plan incompleto: {path}")
    return title, periods


def phase_color(phase: str, index: int, total: int):
    normalized = phase.lower()
    if "básico" in normalized or "plan de estudios" in normalized and index < total / 3:
        return COLORS["basic"]
    if "profesional" in normalized or "plan de estudios" in normalized and index < total * 2 / 3:
        return COLORS["professional"]
    return COLORS["specialization"]


def fit_lines(text: str, font: str, size: float, width: float, max_lines: int = 3):
    words, lines, current = text.split(), [], ""
    for word in words:
        trial = f"{current} {word}".strip()
        if pdfmetrics.stringWidth(trial, font, size) <= width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    if len(lines) > max_lines:
        lines = lines[:max_lines]
        while pdfmetrics.stringWidth(lines[-1] + "…", font, size) > width and lines[-1]:
            lines[-1] = lines[-1][:-1]
        lines[-1] += "…"
    return lines


def centered_lines(c, lines, x, y, width, font, size, color, leading):
    c.setFillColor(color)
    c.setFont(font, size)
    for line_index, line in enumerate(lines):
        c.drawCentredString(x + width / 2, y - line_index * leading, line)


def create_pdf(title: str, periods: list[dict[str, object]], target: Path, logo_size: tuple[int, int]):
    regular, bold = "UI", "UI-Bold"
    width, height = A4
    c = canvas.Canvas(str(target), pagesize=A4)
    c.setTitle(f"Plan de estudios - {title}")
    c.setAuthor("Colegio Universitario del Valle de México - UNIVAMEX")
    subject_count = sum(len(period["items"]) for period in periods)
    period_word = "semestres" if "semestre" in str(periods[0]["title"]).lower() else "cuatrimestres"
    row_heights = [126 if len(period["items"]) > 5 else 93 for period in periods]
    pages: list[list[tuple[int, dict[str, object], float]]] = []
    current_page: list[tuple[int, dict[str, object], float]] = []
    current_height = 0
    page_capacity = 565
    row_gap = 7
    for index, (period, row_h) in enumerate(zip(periods, row_heights)):
        needed = row_h + (row_gap if current_page else 0)
        if current_page and current_height + needed > page_capacity:
            pages.append(current_page)
            current_page = []
            current_height = 0
            needed = row_h
        current_page.append((index, period, row_h))
        current_height += needed
    if current_page:
        pages.append(current_page)

    iw, ih = logo_size
    for page_index, page_periods in enumerate(pages):
        c.setFillColor(white)
        c.rect(0, 0, width, height, stroke=0, fill=1)
        c.setFillColor(COLORS["navy"])
        c.rect(0, height - 88, width, 88, stroke=0, fill=1)
        c.setFillColor(COLORS["gold"])
        c.rect(0, height - 93, width, 5, stroke=0, fill=1)
        logo_h = 49
        logo_w = logo_h * iw / ih
        c.drawImage(str(TRIMMED_LOGO), 27, height - 69, logo_w, logo_h, mask="auto", preserveAspectRatio=True)
        c.setFillColor(white)
        c.setFont(bold, 11)
        c.drawRightString(width - 27, height - 35, "PLAN DE ESTUDIOS")
        c.setFillColor(HexColor("#BFCDE3"))
        c.setFont(regular, 7.5)
        c.drawRightString(width - 27, height - 51, "FORMACIÓN ACADÉMICA")

        title_size = 18 if len(title) < 58 else 15
        title_lines = fit_lines(title, bold, title_size, width - 54, 2)
        c.setFillColor(COLORS["navy"])
        c.setFont(bold, title_size)
        title_y = height - 128
        for title_index, line in enumerate(title_lines):
            c.drawString(27, title_y - title_index * (title_size + 3), line)
        meta_y = title_y - 22 - (len(title_lines) - 1) * (title_size + 3)
        c.setFillColor(COLORS["muted"])
        c.setFont(regular, 9)
        c.drawString(27, meta_y, f"{len(periods)} {period_word}  |  {subject_count} asignaturas")
        c.drawRightString(width - 27, meta_y, f"Página {page_index + 1} de {len(pages)}")

        margin = 27
        period_w = 135
        y_cursor = meta_y - 24
        for period_index, period, row_h in page_periods:
            y = y_cursor - row_h
            color = phase_color(str(period["phase"]), period_index, len(periods))
            c.setFillColor(COLORS["paper"])
            c.setStrokeColor(COLORS["line"])
            c.setLineWidth(0.7)
            c.roundRect(margin, y, width - 2 * margin, row_h, 9, stroke=1, fill=1)
            c.setFillColor(color)
            c.roundRect(margin, y, period_w, row_h, 9, stroke=0, fill=1)
            c.rect(margin + period_w - 9, y, 9, row_h, stroke=0, fill=1)
            c.setFillColor(white)
            c.setFont(bold, 17)
            c.drawString(margin + 11, y + row_h - 25, str(period_index + 1).zfill(2))
            period_title = fit_lines(str(period["title"]), bold, 8.8, period_w - 22, 2)
            centered_lines(c, period_title, margin, y + row_h - 43, period_w, bold, 8.8, white, 10.5)
            c.setFont(regular, 6)
            c.drawString(margin + 11, y + 10, str(period["phase"]).upper())

            subjects = period["items"]
            columns = 5
            subject_rows = 2 if len(subjects) > 5 else 1
            subject_gap = 4
            subject_area_x = margin + period_w
            subject_w = (width - margin - subject_area_x - (columns - 1) * subject_gap) / columns
            subject_h = (row_h - 12 - (subject_rows - 1) * 5) / subject_rows
            for subject_index, subject in enumerate(subjects):
                subject_row, subject_column = divmod(subject_index, columns)
                sx = subject_area_x + subject_column * (subject_w + subject_gap)
                sy = y + row_h - 6 - (subject_row + 1) * subject_h - subject_row * 5
                c.setFillColor(white if subject_column % 2 == 0 else HexColor("#EAF0F6"))
                c.roundRect(sx, sy, subject_w, subject_h, 5, stroke=0, fill=1)
                font_size = 8 if subject_rows == 1 else 7.3
                lines = fit_lines(str(subject), regular, font_size, subject_w - 10, 5)
                leading = font_size + 1.5
                text_y = sy + (subject_h + (len(lines) - 1) * leading) / 2 + 2
                centered_lines(c, lines, sx, text_y, subject_w, regular, font_size, COLORS["ink"], leading)
            y_cursor = y - row_gap
        c.showPage()
    c.save()


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    register_fonts()
    logo_size = prepare_logo()
    generated = []
    for path in sorted(DOCS.glob("00[2-5].*/*.docx")):
        if path.name.startswith("Información"):
            continue
        title, periods = extract_plan(path)
        slug = PROGRAM_SLUGS.get(title)
        if not slug:
            raise KeyError(f"No existe slug para {title!r}")
        output = OUTPUT_DIR / f"{slug}.pdf"
        create_pdf(title, periods, output, logo_size)
        shutil.copy2(output, PUBLIC_DIR / output.name)
        generated.append(slug)
    missing = set(PROGRAM_SLUGS.values()) - set(generated)
    if missing:
        raise ValueError(f"Faltan planes: {sorted(missing)}")
    print(f"Generados {len(generated)} planes de estudio")


if __name__ == "__main__":
    main()
