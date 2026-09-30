#!/bin/sh
# 사용: sh src/build.sh [gNN-이름 ...]   (인자 없으면 src/*.json 전부)
# archify 스펙(JSON) → validate → deliver(HTML) → SVG 내보내기
set -u
ARCHIFY="${ARCHIFY:-$HOME/.claude/skills/archify/bin/archify.mjs}"
cd "$(dirname "$0")/.." || exit 1
[ $# -eq 0 ] && set -- $(ls src/g*.json | xargs -n1 basename | sed 's/\.json$//')
failed=""
built=""
for name in "$@"; do
  type=$(node -e 'console.log(require(process.argv[1]).diagram_type)' "$PWD/src/$name.json")
  if node "$ARCHIFY" deliver "$type" "src/$name.json" "$name.html" --quality showcase --json > /dev/null 2>&1; then
    echo "deliver ok   $name ($type)"; built="$built $name"
  else
    echo "deliver FAIL $name ($type) — 원인: node \$ARCHIFY validate $type src/$name.json --quality showcase"; failed="$failed $name"
  fi
done
[ -n "$built" ] && python3 src/export-svg.py $built ${PREVIEW_DIR:+--preview "$PREVIEW_DIR"}
# 손으로 쓴 SVG(src/*.src.svg)는 archify SVG의 스타일을 빌려 쓰므로 맨 뒤에 만든다
python3 src/build-hand-svg.py || failed="$failed hand-svg"
[ -z "$failed" ] || { echo "실패:$failed"; exit 1; }
