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

    c.setFillColor(white)
    c.rect(0, 0, width, height, stroke=0, fill=1)
    c.setFillColor(COLORS["navy"])
    c.rect(0, height - 68, width, 68, stroke=0, fill=1)
    c.setFillColor(COLORS["gold"])
    c.rect(0, height - 72, width, 4, stroke=0, fill=1)
    iw, ih = logo_size
    logo_h = 34
    logo_w = logo_h * iw / ih
    c.drawImage(str(TRIMMED_LOGO), 24, height - 52, logo_w, logo_h, mask="auto", preserveAspectRatio=True)
    c.setFillColor(white)
    c.setFont(bold, 7.5)
    c.drawRightString(width - 24, height - 28, "PLAN DE ESTUDIOS")
    c.setFillColor(HexColor("#BFCDE3"))
    c.setFont(regular, 5.8)
    c.drawRightString(width - 24, height - 41, "FORMACIÓN ACADÉMICA")

    title_size = 15 if len(title) < 58 else 12.8
    c.setFillColor(COLORS["navy"])
    c.setFont(bold, title_size)
    title_lines = fit_lines(title, bold, title_size, width - 48, 2)
    for index, line in enumerate(title_lines):
        c.drawString(24, height - 102 - index * (title_size + 2), line)
    subject_count = sum(len(period["items"]) for period in periods)
    meta_y = height - 120 - (len(title_lines) - 1) * (title_size + 2)
    period_word = "semestres" if "semestre" in str(periods[0]["title"]).lower() else "cuatrimestres"
    c.setFillColor(COLORS["muted"])
    c.setFont(regular, 7)
    c.drawString(24, meta_y, f"{len(periods)} {period_word}  |  {subject_count} asignaturas")

    margin = 24
    list_top = meta_y - 18
    list_bottom = 22
    row_gap = 4
    natural_heights = [70 if len(period["items"]) > 5 else 48 for period in periods]
    available = list_top - list_bottom - row_gap * (len(periods) - 1)
    scale = min(1, available / sum(natural_heights))
    row_heights = [height_value * scale for height_value in natural_heights]
    period_w = 111
    y_cursor = list_top

    for index, period in enumerate(periods):
        row_h = row_heights[index]
        y = y_cursor - row_h
        color = phase_color(str(period["phase"]), index, len(periods))
        c.setFillColor(COLORS["paper"])
        c.setStrokeColor(COLORS["line"])
        c.setLineWidth(0.55)
        c.roundRect(margin, y, width - 2 * margin, row_h, 7, stroke=1, fill=1)

        c.setFillColor(color)
        c.roundRect(margin, y, period_w, row_h, 7, stroke=0, fill=1)
        c.rect(margin + period_w - 7, y, 7, row_h, stroke=0, fill=1)
        c.setFillColor(white)
        c.setFont(bold, 11)
        c.drawString(margin + 8, y + row_h - 17, str(index + 1).zfill(2))
        period_title = fit_lines(str(period["title"]), bold, 6.4, period_w - 16, 2)
        centered_lines(c, period_title, margin, y + row_h - 29, period_w, bold, 6.4, white, 7.2)
        c.setFont(regular, 4.5)
        c.drawString(margin + 8, y + 6, str(period["phase"]).upper())

        subjects = period["items"]
        columns = 5
        rows = 2 if len(subjects) > 5 else 1
        subject_gap = 3
        subject_area_x = margin + period_w
        subject_w = (width - margin - subject_area_x - (columns - 1) * subject_gap) / columns
        subject_h = (row_h - 8 - (rows - 1) * 3) / rows
        for subject_index, subject in enumerate(subjects):
            subject_row, subject_column = divmod(subject_index, columns)
            sx = subject_area_x + subject_column * (subject_w + subject_gap)
            sy = y + row_h - 4 - (subject_row + 1) * subject_h - subject_row * 3
            c.setFillColor(white if subject_column % 2 == 0 else HexColor("#EAF0F6"))
            c.roundRect(sx, sy, subject_w, subject_h, 4, stroke=0, fill=1)
            font_size = 5.35 if rows == 1 else 4.75
            lines = fit_lines(str(subject), regular, font_size, subject_w - 8, 3)
            leading = font_size + 1.1
            text_y = sy + (subject_h + (len(lines) - 1) * leading) / 2 + 1.5
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
