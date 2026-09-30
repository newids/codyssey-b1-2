#!/usr/bin/env python3
"""손으로 쓴 SVG(src/*.src.svg)에 archify 와 같은 스타일·글꼴을 넣어 완성본을 만든다.

사용: python3 src/build-hand-svg.py
기준 스타일은 archify 로 내보낸 g01-web-app.svg 의 <style> 을 그대로 가져온다.
그래서 g01-web-app.svg 가 먼저 만들어져 있어야 한다(sh src/build.sh).
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STYLE_DONOR = ROOT / "g01-web-app.svg"
PLACEHOLDER = "/*ARCHIFY_STYLE*/"


def donor_style() -> str:
    if not STYLE_DONOR.exists():
        raise FileNotFoundError(f"{STYLE_DONOR.name} 가 없습니다. 먼저 sh src/build.sh 를 실행하세요.")
    match = re.search(r"<style[^>]*>(.*?)</style>", STYLE_DONOR.read_text(encoding="utf-8"), flags=re.S)
    if not match:
        raise ValueError(f"{STYLE_DONOR.name} 에서 <style> 을 찾지 못했습니다.")
    return match.group(1)


def main() -> int:
    style = donor_style()
    sources = sorted((ROOT / "src").glob("*.src.svg"))
    for source in sources:
        text = source.read_text(encoding="utf-8")
        if PLACEHOLDER not in text:
            raise ValueError(f"{source.name} 에 {PLACEHOLDER} 표시가 없습니다.")
        out = ROOT / source.name.replace(".src.svg", ".svg")
        out.write_text(text.replace(PLACEHOLDER, style), encoding="utf-8")
        print(f"ok {out.name} ({out.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
