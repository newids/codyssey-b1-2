#!/usr/bin/env python3
"""archify HTML → 밝은 테마 고정 SVG 로 내보낸다.

사용: python3 src/export-svg.py [gNN-이름 ...]   (인자 없으면 *.html 전부)
필요: pip install playwright && playwright install chromium

archify 뷰어의 Export → SVG 를 그대로 눌러 받은 뒤 두 가지만 고친다.
1) 루트 <svg> 에 data-theme="light" 를 붙여 밝은 테마로 고정한다.
2) font-family 에 한글 글꼴을 추가한다.
3) 범례 제목 "Legend" 를 "범례" 로 바꾼다(archify 뷰어 UI는 한국어를 지원하지 않는다).
--preview <dir> 를 주면 <img> 로 띄운 PNG 미리보기도 저장한다(눈으로 확인용).
"""
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
KOREAN_FONTS = "'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', 'Noto Sans CJK KR', "
PREVIEW_WIDTH = 1600
LEGEND_HEADING = re.compile(r"(<text[^>]*>)Legend<")


def lock_light_theme(svg_text: str) -> str:
    locked = re.sub(r"<svg\b", '<svg data-theme="light"', svg_text, count=1)
    locked = locked.replace("'Noto Sans Mono CJK SC'", KOREAN_FONTS + "'Noto Sans Mono CJK SC'")
    return LEGEND_HEADING.sub(r"\g<1>범례<", locked)


def export_one(browser, name: str) -> Path:
    html = ROOT / f"{name}.html"
    if not html.exists():
        raise FileNotFoundError(html)
    context = browser.new_context(color_scheme="light", accept_downloads=True,
                                  viewport={"width": 1600, "height": 1000})
    page = context.new_page()
    page.goto(html.as_uri())
    page.click("#btn-export")
    with page.expect_download() as download_info:
        page.click('#export-menu [data-format="svg"]')
    raw = Path(download_info.value.path()).read_text(encoding="utf-8")
    context.close()
    out = ROOT / f"{name}.svg"
    out.write_text(lock_light_theme(raw), encoding="utf-8")
    return out


def preview(browser, svg: Path, out_dir: Path) -> None:
    page = browser.new_page(viewport={"width": PREVIEW_WIDTH, "height": 900})
    host = out_dir / f"{svg.stem}.preview.html"
    host.write_text(
        f'<body style="margin:0;background:#fff"><img src="{svg.as_uri()}" style="width:{PREVIEW_WIDTH}px;display:block"></body>',
        encoding="utf-8",
    )
    page.goto(host.as_uri())
    page.wait_for_timeout(300)
    page.locator("img").screenshot(path=str(out_dir / f"{svg.stem}.png"))
    page.close()


def main(argv: list[str]) -> int:
    preview_dir = None
    if "--preview" in argv:
        i = argv.index("--preview")
        preview_dir = Path(argv[i + 1])
        preview_dir.mkdir(parents=True, exist_ok=True)
        argv = argv[:i] + argv[i + 2:]
    only_preview = "--preview-only" in argv
    argv = [a for a in argv if a != "--preview-only"]
    names = argv or sorted(p.stem for p in ROOT.glob("g*.html"))
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for name in names:
            svg = ROOT / f"{name}.svg" if only_preview else export_one(browser, name)
            print(f"ok {svg.name} ({svg.stat().st_size // 1024} KB)")
            if preview_dir:
                preview(browser, svg, preview_dir)
        browser.close()
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
