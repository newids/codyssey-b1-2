---
name: React Playground
description: 느리게 흐르는 오로라 위에 떠 있는 서리 낀 OS 유리 — React 학습 SPA의 글래스모피즘 디자인 시스템
colors:
  ground: "oklch(96.5% 0.014 245)"
  aurora-cyan: "oklch(84% 0.11 210)"
  aurora-violet: "oklch(84% 0.10 300)"
  aurora-mint: "oklch(88% 0.09 165)"
  glass: "oklch(100% 0 0 / 0.55)"
  glass-strong: "oklch(100% 0 0 / 0.72)"
  glass-soft: "oklch(100% 0 0 / 0.35)"
  glass-border: "oklch(100% 0 0 / 0.75)"
  glass-border-edge: "oklch(60% 0.03 250 / 0.14)"
  glass-highlight: "oklch(100% 0 0 / 0.85)"
  plate: "oklch(100% 0 0 / 0.86)"
  ink: "oklch(21% 0.03 260)"
  ink-2: "oklch(38% 0.03 260)"
  ink-3: "oklch(44% 0.03 260)"
  line: "oklch(70% 0.02 250 / 0.28)"
  line-strong: "oklch(60% 0.03 250 / 0.42)"
  accent: "oklch(56% 0.13 220)"
  accent-strong: "oklch(44% 0.13 222)"
  accent-soft: "oklch(88% 0.06 215 / 0.7)"
  accent-ink: "oklch(100% 0 0)"
  success: "oklch(50% 0.14 155)"
  success-soft: "oklch(90% 0.07 155 / 0.75)"
  danger: "oklch(52% 0.19 27)"
  danger-soft: "oklch(92% 0.05 27 / 0.8)"
  warn: "oklch(60% 0.14 70)"
  warn-soft: "oklch(92% 0.07 85 / 0.8)"
  code-bg: "oklch(24% 0.035 262 / 0.92)"
  code-ink: "oklch(93% 0.02 90)"
typography:
  display:
    fontFamily: "Pretendard Variable, Pretendard, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1.5rem + 3.4vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Pretendard Variable, Pretendard, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 1.4rem + 2.2vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Pretendard Variable, Pretendard, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 1.2rem + 1vw, 1.9rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  subtitle:
    fontFamily: "Pretendard Variable, Pretendard, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1rem + 0.5vw, 1.3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Pretendard Variable, Pretendard, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "clamp(0.95rem, 0.9rem + 0.25vw, 1.05rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Pretendard Variable, Pretendard, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "clamp(0.8125rem, 0.78rem + 0.2vw, 0.9rem)"
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: "Pretendard Variable, Pretendard, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.01em"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "clamp(0.8125rem, 0.78rem + 0.2vw, 0.9rem)"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  sm: "8px"
  md: "14px"
  lg: "22px"
  xl: "30px"
  pill: "999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "clamp(3rem, 2rem + 4vw, 6rem)"
  gutter: "clamp(1rem, 0.5rem + 2.5vw, 2.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.72rem 1.3rem"
  button-primary-lg:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0.95rem 1.7rem"
  button-secondary:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.72rem 1.3rem"
  button-secondary-hover:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.accent-strong}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.72rem 1.3rem"
  button-ghost-hover:
    backgroundColor: "{colors.glass-soft}"
    textColor: "{colors.ink}"
  button-danger:
    backgroundColor: "{colors.danger-soft}"
    textColor: "{colors.danger}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.72rem 1.3rem"
  button-danger-hover:
    backgroundColor: "{colors.danger}"
    textColor: "#ffffff"
  card-glass:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.5}"
  card-glass-hover:
    backgroundColor: "{colors.glass-strong}"
  panel-glass:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "{spacing.5} {spacing.6}"
  plate-reading:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "{spacing.5} {spacing.6}"
  input:
    backgroundColor: "{colors.glass-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0.75rem 0.95rem"
  input-focus:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.ink}"
  badge-neutral:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.ink-2}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "0.22em 0.7em"
  badge-accent:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-strong}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "0.22em 0.7em"
  badge-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "0.22em 0.7em"
  badge-warn:
    backgroundColor: "{colors.warn-soft}"
    textColor: "{colors.warn}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "0.22em 0.7em"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.9rem"
  nav-link-active:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.ink}"
  header-bar:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 0.6rem 0.4rem 1rem"
    height: "3.6rem"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 0.7rem 0.7rem 1.2rem"
  code-block:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.code-ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.md}"
    padding: "{spacing.4} {spacing.5}"
---

# Design System: React Playground

## Overview

**Creative North Star: "오로라 위의 서리 유리 (Frosted Glass over a Slow Aurora)"**

React Playground는 학습자의 데스크톱 OS가 이미 쓰고 있는 재질 — 서리 낀 반투명 유리 — 로 만들어진 학습 사이트다. 크림색 종이 교과서도, 네온이 번지는 다크 해커 화면도 아니다. 화면은 네 개의 층으로 쌓인다. 층 0은 차가운 바탕(`--color-ground`) 위에서 React 하늘색·보라·민트 세 개의 오로라 필드가 60초 주기 한 개의 시계로 아주 느리게 흐른다. 층 1은 그 위에 떠 있는 유리 표면(`.glass`, `.glass-strong`) — 헤더·카드·패널이 여기에 산다. 층 2는 레슨 본문을 위한 86% 불투명 읽기 플레이트(`.plate`)로, 긴 글의 대비가 유리 효과보다 먼저다. 층 3은 잉크다.

밀도는 여유롭다. 표면은 넉넉한 라운드(22–30px)와 안쪽 1px 하이라이트, 부드러운 오프셋 그림자로 "떠 있음"을 말하고, 위계는 색이 아니라 **높이**(elevation)로 표현된다. 상태(맞음·틀림·오류·완료)는 원형 마크와 1px 링으로 그려지며, 행이나 카드를 색으로 채우지 않는다. 움직임은 배경만 흐르고 앞면은 정지해 있다 — 표면은 입력(호버·진입)에만 반응하고, 그마저 1–3px의 상승과 한 번의 페이지 진입으로 끝난다. `prefers-reduced-motion`이면 오로라를 포함해 모두 멈춘다.

확인된 시각적 거부: 크림 종이 텍스처, 네온 글로우, 호버 틸트·빛 반사, 헤딩 위 아이브로/키커, 이모지·유니코드 기호 아이콘, 코드 외 영역의 모노스페이스.

**Key Characteristics:**
- 4개 층(오로라 → 유리 → 플레이트 → 잉크)의 고정된 재질 순서
- 오로라 3필드가 공유하는 하나의 60초 드리프트 시계, 앞면은 정지
- 유리 = blur 18/26px + 흰색 55/72% (다크 9/11%) + 안쪽 1px 하이라이트 + 오프셋 그림자
- Pretendard 800, -0.03em 디스플레이; 숫자는 항상 tabular-nums; JetBrains Mono는 코드에만
- 상태는 마크(check · slash · alert)와 1px 링으로, 색 채우기 없이
- 액션·내비·배지·토스트는 pill, 표면은 22–30px 라운드
- 라이트/다크 모두 한 토큰 세트로, 다크에서 유리 가장자리 대비 강화

## Colors

차가운 청회색 바탕 위에 흰 유리를 겹치고, React 하늘색 계열 한 개의 액센트만 쓰는 팔레트다. 세 오로라 색은 배경에만 존재하고 UI 요소로 올라오지 않는다.

### Primary
- **React 하늘색 (accent)** (`--color-accent`): 포커스 링, 캐럿, 입력 포커스 테두리, 진행 바 그라디언트 시작점, 선택된 퀴즈 보기의 링. 상호작용의 "지금 여기" 표시.
- **깊은 하늘색 (accent-strong)** (`--color-accent-strong`): 기본 버튼의 단색 채움, 링크 색, 헤더 로고와 브랜드 강조어, 헤드라인의 강조 구절(`em`), 데모 카드의 count 칩. 액센트가 단색으로 채워지는 유일한 값.
- **하늘색 유리 (accent-soft)** (`--color-accent-soft`): 인라인 `code` 배경, 레슨 팁 박스, 데모 카드의 "켜진" 단계, 텍스트 선택(`::selection`), 포커스 글로우(4px). 단색이 아닌 "물든 유리"로 액센트를 넓게 깔 때.
- **액센트 위 잉크 (accent-ink)** (`--color-accent-ink`): accent-strong 채움 위 텍스트. 다크에서는 어두운 잉크로 반전된다.

### Neutral
- **차가운 바탕 (ground)** (`--color-ground`): body 배경이자 오로라 뒤의 캔버스. 토스트의 텍스트 색으로 반전 사용.
- **오로라 3필드 (aurora-cyan / aurora-violet / aurora-mint)** (`--aurora-1/2/3`): 층 0에만 존재. 라이트에서 85%, 다크에서 60% 불투명도, 70px 블러.
- **유리 (glass / glass-strong / glass-soft)** (`--glass-bg`, `--glass-bg-strong`, `--glass-bg-soft`): 세 단계 흰색 반투명. 카드·패널은 glass(55%), 헤더·활성 내비·호버된 카드·입력 포커스는 glass-strong(72%), 내비 세그먼트 트랙·입력 기본·퀴즈 보기·데모 단계 행은 glass-soft(35%). 다크에서는 9% / 11% / 4.5%.
- **유리 가장자리 (glass-border / glass-border-edge / glass-highlight)**: 바깥 1px 테두리(edge, 라이트 14% 청회, 다크 35% 검정), 안쪽 1px 링(border, 흰 75%/26%), 상단 1px 하이라이트(highlight, 흰 85%/34%). 세 값이 합쳐져 유리의 "두께"를 만든다.
- **읽기 플레이트 (plate)** (`--plate-bg`): 레슨 본문 전용 86% 불투명 표면(다크 88%).
- **잉크 3단계 (ink / ink-2 / ink-3)** (`--color-ink`, `--color-ink-2`, `--color-ink-3`): 본문·헤딩은 ink, 리드·설명·내비 기본은 ink-2, 메타(분, 번호, 플레이스홀더, 힌트)는 ink-3. ink-3는 유리 위 AA(4.5:1)를 위해 L 44%로 고정되어 있다.
- **선 (line / line-strong)** (`--color-line`, `--color-line-strong`): 목록 행 구분선·세그먼트 트랙·헤더 하단은 line(28%), 입력 테두리·토글·스크롤바 썸은 line-strong(42%).
- **코드 (code-bg / code-ink)**: 코드 블록만의 어두운 남색 유리(92% 불투명)와 따뜻한 밝은 잉크. 라이트·다크 모두 어둡다.

### Semantic
- **성공 (success / success-soft)**: 완료된 레슨 카드의 1px 링(55% 혼합), 정답 마크의 채움, 성공 배지, 매직 링크 발송 안내 박스.
- **위험 (danger / danger-soft)**: 오답 마크와 링, ErrorState 아이콘의 채움, 필수 표시(`*`), 입력 오류 테두리, 삭제 버튼(soft 채움 → 호버 시 단색).
- **주의 (warn / warn-soft)**: 레슨 난이도 "응용" 배지.

### Named Rules
**The Mark-Not-Flood Rule.** 상태는 원형 마크(check · slash · alert)의 채움과 1px 링(`inset 0 0 0 1px`)으로만 말한다. 정답·오답·오류·완료 어느 경우에도 행이나 카드 배경을 의미색으로 채우지 않는다. 배경이 바뀌는 곳은 마크 원 하나뿐이다.

**The One Solid Accent Rule.** `accent-strong` 단색 채움은 액션(primary 버튼)과 살아 있는 값(count 칩, 선택된 보기 마크, 켜진 단계 번호)에만 쓴다. 표면·배경·헤딩 블록을 액센트로 채우지 않는다. 넓은 면적은 `accent-soft`(물든 유리)다.

**The Aurora-Stays-Behind Rule.** `--aurora-1/2/3`는 층 0의 필드에만 쓴다. 버튼·배지·그라디언트 텍스트 등 UI 요소로 오로라 색을 끌어올리지 않는다.

## Typography

**Display Font:** Pretendard Variable (fallback Pretendard, Apple SD Gothic Neo, system-ui)
**Body Font:** Pretendard Variable (동일 패밀리, 웨이트로 구분)
**Label/Mono Font:** JetBrains Mono 400/600 (fallback ui-monospace, Menlo)

**Character:** 한 패밀리 두 얼굴. Pretendard를 800 웨이트와 -0.03em 자간으로 압축하면 한국 OS의 디스플레이 목소리가 되고, 400에 1.65 행간이면 긴 글의 본문이 된다. JetBrains Mono는 코드가 코드임을 알리는 신호로만 등장한다. 모든 헤딩은 `text-wrap: balance`와 `word-break: keep-all`로 한국어 줄바꿈을 지킨다.

### Hierarchy
- **Display** (800, `--text-3xl` clamp 2.3–4rem, 1.15, -0.03em): 홈 히어로의 두 줄 헤드라인 한 곳. 강조 구절은 `em`을 accent-strong 색으로.
- **Headline** (800, `--text-2xl` clamp 1.9–3rem, 1.15, -0.03em): 페이지 제목(`h1`, PageHeader, 레슨 제목)과 패널 밖 섹션 제목("이 사이트 자체가 교재입니다").
- **Title** (800, `--text-xl` clamp 1.4–1.9rem, 1.15, -0.03em): `h2` 기본값 — 패널 안 제목("8개 레슨", "라우팅 10개"), 레슨 본문 소제목, 로그인 카드 제목, 퀴즈 결과 점수.
- **Subtitle** (700, `--text-lg` clamp 1.1–1.3rem, 1.15, -0.015em): `h3` — 레슨 카드 제목, 상태 화면 제목. 리드 문단도 같은 크기에 400/ink-2.
- **Body** (400, `--text-md` clamp 0.95–1.05rem, 1.65): 기본 본문. 읽기 플레이트 안에서는 1.85 행간, 68ch 측정 폭(`--measure`).
- **Label** (600, `--text-sm` clamp 0.81–0.9rem, 1.4): 버튼, 내비 링크, 입력 레이블, 카드 서브타이틀, 메타 문장. 대문자 변환·자간 확장 없음.
- **Caption** (600, `--text-xs` clamp 0.75–0.81rem, 0.01em): 배지, 분/번호 메타, 힌트, 오류 문구.
- **Mono** (400, `--text-sm`, 1.7): 코드 블록·인라인 `code`·데모 단계의 코드 조각·글자수 카운터. 코드 블록 외 영역에서는 0.9em으로 본문에 맞춘다.

알려진 긴장: 패널 안 `h2`("8개 레슨")는 Title(`--text-xl`)이고 패널 밖 섹션 `h2`(`.how > h2`)는 Headline(`--text-2xl`)이다. 같은 태그가 두 크기를 갖는 것은 "패널 안은 한 단계 낮춘다"는 의도로 읽히지만 규칙으로 명문화되지는 않았다 — 새 화면에서는 이 관행을 따르되, 한 화면 안에서 두 크기의 `h2`가 나란히 서지 않게 한다.

### Named Rules
**The Mono-Is-Code Rule.** JetBrains Mono는 `code`, `pre`, `kbd`, 코드 조각, 글자수 카운터에만 쓴다. 라벨·메타·아이브로·번호에 모노를 쓰지 않는다.

**The Tabular Count Rule.** 화면에 보이는 모든 숫자(레슨 번호, 분, 진도 %, 퀴즈 점수, 노트 개수, count)는 `font-variant-numeric: tabular-nums`다. 숫자가 바뀌어도 폭이 흔들리지 않는다.

**The 68ch Plate Rule.** 레슨 본문은 `.plate` 안에서 `max-width: var(--measure)`(68ch)와 행간 1.85로 읽힌다. 플레이트 폭이 넓어져도 글은 넓어지지 않는다.

**The No-Eyebrow Rule.** 헤딩 위에 소문자·대문자 키커나 아이브로 라벨을 두지 않는다. 헤딩은 800 웨이트 자체가 위계다.

## Layout

컨테이너는 `min(100% - gutter*2, 72rem)`(`.container`)이며 거터는 1–2.5rem 사이에서 유동한다. 헤더는 컨테이너 안의 sticky pill(`top: var(--space-3)`, z-index 50)로 페이지와 함께 떠다니고, `main`은 위 2rem / 아래 3rem 패딩을 갖고 라우트가 바뀔 때마다 `.page-enter`(520ms, 14px 상승 + 6px 블러 해제)를 한 번 재생한다.

- **히어로**: 2열 그리드 `1.4fr / 1fr`, 간격 3rem, 900px 이하에서 1열. 왼쪽 텍스트, 오른쪽 데모 카드.
- **레슨 상세**: `1fr / 17rem` 2열, 간격 3rem; 오른쪽 사이드는 `sticky top: 5rem`. 900px 이하에서 1열 + sticky 해제.
- **목록 행**: 4열 그리드 `2.2rem / 1fr / 1fr / auto`(번호·제목·부제·배지), 640px 이하에서 부제 열 제거. 행은 `border-top: 1px line`로 나뉘고 첫 행은 선이 없다.
- **툴바**: `2fr / 1.4fr / auto`(검색·셀렉트·세그먼트), 760px 이하에서 1열.
- **모바일 헤더**: 767px 이하에서 pill이 22px 라운드로 바뀌고, 내비는 헤더 아래로 떨어지는 glass-strong 패널이 된다.

간격 리듬은 8단계 `--space-1..8`(0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / clamp 3–6rem)이다. 카드 내부 패딩은 space-3~6, 패널 내부는 `space-5 space-6`, 섹션 사이는 space-7~8. 유리 표면 안에서는 표면끼리 겹치지 않고(유리 위의 유리는 glass-soft 행 하나로만), 표면 간 간격은 space-5 이상을 지킨다.

브레이크포인트는 콘텐츠 기준 640 / 760 / 767 / 900 / 1200px이며 모두 max-width 방식(데스크톱 우선)이다. 1200px 이상에서 히어로 제목만 4rem으로 고정된다.

## Elevation & Depth

이 시스템의 깊이는 **재질**이다. 층은 backdrop-filter 블러, 흰색 불투명도, 안쪽 1px 하이라이트, 그리고 크게 퍼지는 청회색 오프셋 그림자 네 요소의 조합으로 정해지며, 그림자만으로 높이를 말하지 않는다. 위계는 곧 높이다: 바탕(0) → 유리 표면(1) → 읽기 플레이트(2) → 잉크(3). 같은 층 안에서의 강조는 glass-soft → glass → glass-strong 순의 불투명도 상승으로 표현되고, 호버는 표면을 1–3px 들어 올리면서 그림자를 `--glass-shadow-hover`로 키운다.

### 재질 클래스
- **`.glass`** (`--glass-bg` 55%, blur 18px + saturate 150%): 카드(`Card` 기본), 패널, 상태 화면, 목록 컨테이너. 바깥 1px `--glass-border-edge`, 안쪽 1px `--glass-border`, 상단 1px `--glass-highlight`, 그림자 `--glass-shadow`.
- **`.glass-strong`** (`--glass-bg-strong` 72%, blur 26px + saturate 160%): 헤더 바, 모바일 내비 패널. 같은 테두리·그림자 구성.
- **`.plate`** (`--plate-bg` 86%, blur 26px, saturate 없음): 레슨 본문. 안쪽 링(`--glass-border`) 없이 하이라이트만 — 유리보다 "종이에 가까운" 표면.
- **유리 위의 유리** (`--glass-bg-soft` 35% + `inset 0 0 0 1px --color-line`): 데모 단계 행, 퀴즈 보기, 내비 세그먼트 트랙, 입력 기본, usedIn 박스. 블러 없음 또는 10px.

### Shadow Vocabulary
- **떠 있는 표면** (`box-shadow: var(--glass-shadow)` = `0 14px 34px -14px oklch(35% 0.06 255 / 0.28), 0 2px 8px -2px oklch(35% 0.06 255 / 0.08)`): 모든 층 1·2 표면의 휴지 상태. 다크에서는 검정 60%/35%로 강화.
- **들어 올린 표면** (`var(--glass-shadow-hover)` = `0 22px 44px -16px … / 0.34, 0 4px 12px -4px … / 0.1`): 인터랙티브 카드 호버(`translateY(-3px)`), 토스트.
- **액센트 그림자** (`0 8px 20px -10px var(--color-accent-strong)`): primary 버튼과 켜진 데모 단계 아래에만 — 액센트 채움이 자기 색 그림자를 갖는다.
- **안쪽 하이라이트** (`inset 0 1px 0 var(--glass-highlight)`): 유리 표면·마크 원·활성 내비·토글 노브의 상단 1px. 유리의 "위쪽 면"을 그린다.
- **1px 링** (`inset 0 0 0 1px <line | accent | success | danger>`): 상태·선택·경계는 이 링으로 말한다. 오류 상태 화면은 유리 그림자 + danger 링.
- **얕은 안쪽 그림자** (`inset 0 1px 2px oklch(0% 0 0 / 0.04–0.1)`): 입력·진행 바 트랙·토글처럼 "파인" 컨트롤.

### Named Rules
**The Rank-Is-Elevation Rule.** 무엇이 더 중요한지는 불투명도와 그림자로 말한다(soft < glass < strong < plate). 색을 바꿔서 중요도를 표시하지 않는다.

**The Front-Plane-Still Rule.** 무한 반복 애니메이션은 층 0의 오로라(`drift`, 60s, alternate, transform만) 하나뿐이다. 유리 표면은 입력에만 반응한다 — 호버 1–3px 상승, 페이지 진입 1회, 토스트 진입 1회. 스피너와 스켈레톤 시머는 로딩 중에만 존재한다. `prefers-reduced-motion`이면 오로라를 포함해 전부 정지한다.

**The Glass-Is-Not-Fog Rule.** 유리는 항상 세 가장자리(edge · border · highlight)를 갖는다. 블러와 반투명만 있고 가장자리가 없는 표면은 안개이지 유리가 아니다. 다크 모드에서는 edge를 검정 35%로, highlight를 흰 34%로 올려 가장자리가 사라지지 않게 한다.

## Shapes

라운드는 다섯 단계 `--radius-sm/md/lg/xl/pill`(8 / 14 / 22 / 30 / 999px)이며 크기가 클수록 둥글다. **행동하는 것은 알약, 담는 것은 넓은 라운드**:

- **pill (999px)**: 모든 버튼, 헤더 바, 내비 링크와 세그먼트 트랙, 배지, 토스트, 테마 토글, 검색 입력, 셀렉트, 진행 바 트랙.
- **xl (30px)**: 페이지 단위 패널 — 데모 카드, 레슨 목록 패널, 교재 패널, 읽기 플레이트, 로그인 카드.
- **lg (22px)**: 카드(`Card`), 사이드 카드, 상태 화면, 스켈레톤 카드, 모바일 헤더/내비 패널.
- **md (14px)**: 표면 안의 행과 컨트롤 — 입력, 퀴즈 보기, 데모 단계, 팁 박스, 코드 블록, 해설, 목록 행 호버 영역.
- **sm (8px)**: 인라인 `code`, 포커스 링 모서리, 스켈레톤 라인, count 칩.
- **원형(50%)**: 마크(check · slash · alert), 단계 번호, 상태 아이콘 원, 토글 노브, 메뉴 버튼, 오로라 필드.

테두리는 언제나 1px이며, 바깥 테두리(`border`)와 안쪽 링(`inset box-shadow`)을 구분한다. 유리 표면은 둘 다, 유리 위 요소는 안쪽 링만 갖는다. 아이콘은 `Icon.tsx`의 24px 뷰박스, 2px 스트로크, 둥근 캡/조인 한 획 체계 — 이모지와 유니코드 기호는 쓰지 않는다.

## Components

### Buttons
**성격:** 단단한 알약. 호버에 1px 뜨고 누르면 0.98로 살짝 눌린다.
- **Shape:** 알약 (`--radius-pill`), 1px 투명 테두리, 600 웨이트, `line-height: 1`, 아이콘 간격 space-2.
- **Sizes:** sm `0.5rem 0.9rem` / md `0.72rem 1.3rem` (text-sm) / lg `0.95rem 1.7rem` (text-md).
- **Primary:** `accent-strong` 채움 + `accent-ink` 텍스트, 액센트색 그림자(`0 8px 20px -10px`)와 흰 25% 상단 하이라이트. 호버 시 그림자 확장.
- **Secondary (유리):** `glass-bg-strong` + blur 18px + `glass-border-edge` 테두리 + 상단 하이라이트. 호버 시 테두리와 텍스트가 accent로.
- **Ghost:** 투명, ink-2. 호버 시 glass-soft 배경 + ink.
- **Danger:** danger-soft 채움 + danger 텍스트. 호버 시 danger 단색 + 흰 텍스트 — 파괴적 동작만 색이 뒤집힌다.
- **Loading / Disabled:** `loading`이면 1em 원형 스피너(currentColor, 0.7s)가 아이콘 자리를 대신하고 비활성화. disabled는 opacity 0.55, transform 없음.
- **Focus:** 전역 `:focus-visible` — accent 2px 외곽선, 3px 오프셋.

### Badges
- **Style:** 알약, `--text-xs` 600, 0.01em, `0.22em 0.7em`. 흰 35% 안쪽 링.
- **Variants:** neutral(glass-strong + ink-2 + line 링) / accent / success / warn / danger — 모두 soft 채움 + 진한 텍스트. 레슨 난이도(입문·기본·응용)와 완료 표시에 쓴다.

### Cards / Containers
- **Corner Style:** `Card`는 lg(22px), 페이지 패널은 xl(30px).
- **Background:** `.glass`(55%). 페이지 패널·헤더는 `.glass-strong`.
- **Shadow Strategy:** 휴지 `--glass-shadow`; `interactive` 카드는 호버에 `translateY(-3px)` + `--glass-shadow-hover` + glass-strong으로 밝아짐(260ms ease-out). `:focus-within`에 accent 2px 외곽선.
- **Border:** 바깥 1px edge + 안쪽 1px 흰 링 + 상단 하이라이트.
- **Internal Padding:** sm `space-3 space-4` / md `space-5` / lg `space-6`.
- **완료 표시:** 완료된 레슨 카드는 안쪽 링을 success 55%로 바꾸고 번호를 success 색으로 — 배경은 그대로.

### Inputs / Fields
- **Style:** `glass-bg-soft` + blur 10px, 1px `line-strong` 테두리, md(14px) 라운드, `0.75rem 0.95rem`, 얕은 안쪽 그림자. 레이블은 text-sm 600 ink-2, 필수 표시는 danger `*`. 플레이스홀더·힌트는 ink-3. 검색 입력과 셀렉트만 알약.
- **Focus:** 외곽선 제거, 테두리 accent, 배경 glass-strong, `0 0 0 4px accent-soft` 글로우.
- **Error / Disabled:** `invalid`는 테두리 danger, 포커스 글로우 danger-soft, 오류 문구 text-xs 500 danger. 글자수 카운터는 모노 + tabular.
- **Textarea:** 최소 14rem, 1.7 행간, 세로 리사이즈.

### Navigation
- **Style:** sticky 알약 헤더(`.glass-strong`, 최소 3.6rem). 왼쪽 브랜드(로고 1.6rem accent-strong + "React **Playground**" 800/600), 가운데 세그먼트 트랙(glass-soft + line 링, 3px 패딩), 오른쪽 테마 토글과 로그인/아바타.
- **Link:** 알약, text-sm 600, ink-2. 호버 glass-soft + ink. **Active:** glass-strong + ink + 얕은 그림자 + 상단 하이라이트 — "눌린 유리 키".
- **Mobile (≤767px):** 헤더 22px 라운드, 원형 메뉴 버튼, 내비는 헤더 아래 glass-strong 패널로 `scaleY(0.96) translateY(-8px)` → 펼침(260ms).
- **세그먼트 재사용:** 노트 목록의 필터 세그먼트(`.segment`)가 같은 트랙/활성 문법을 쓴다.

### 상태 화면 (Loading / Error / Empty)
- 중앙 정렬 유리 박스(lg 라운드, `space-7 space-4` 패딩, 260ms 페이드인). 2.75rem 원형 마크(glass-strong + 하이라이트)에 스트로크 아이콘, text-lg 제목, ink-2 설명(최대 36ch), 액션 버튼.
- **Error:** 마크 원만 danger 단색 + 흰 alert 아이콘, 박스에 danger 1px 링. 배경은 유리 그대로.
- **Loading:** 2.25rem 링 스피너(line 트랙 + accent 상단, 0.8s) 또는 스켈레톤(glass-soft↔strong 시머 1.4s).

### Toast
- 하단 중앙 고정, 알약, `ink 88%` 반투명 + blur 14px, ground 색 텍스트, text-sm 500, `--glass-shadow-hover`. success/error는 각각 의미색 88%로 채우고 흰 텍스트. 260ms ease-out-expo로 16px 상승 진입. 닫기 버튼은 흰 12% 원.

### 진행 바 · 테마 토글
- 진행 바: 0.65rem 알약 트랙(glass-soft + 안쪽 그림자 + line 링), accent→accent-strong 그라디언트 채움을 `scaleX`로 520ms 전환. 값은 tabular 700.
- 테마 토글: 3.25×1.85rem 알약, glass-soft + line-strong 테두리, 유리 노브가 `translateX(1.4rem)` 260ms ease-out-expo로 이동. 해/달 스트로크 아이콘.

### 코드 블록
- `code-bg` 남색 유리(blur 10px) + `code-ink`, md 라운드, `space-4 space-5`, 모노 text-sm 1.7. 유리 그림자 + 흰 12% 상단 하이라이트. 인라인 `code`는 accent-soft 배경, sm 라운드.

### 시그니처: 데모 카드와 퀴즈 (state-as-mark)
- **FlowDemo 카드** (홈 오른쪽, xl 라운드 `.glass`): 세 단계 행(`이벤트 → 상태 변경 → 리렌더링`)이 glass-soft + line 링으로 누워 있다가, 버튼을 누르면 순서대로 **켜진다** — accent-soft 배경, accent 1px 링, 액센트 그림자, `translateX(4px)`; 번호 원이 accent-strong 단색으로. count 칩은 accent-strong sm 라운드에 `pop`(0.6→1, 260ms ease-out-expo). 각 행 오른쪽에 모노 코드 조각.
- **퀴즈 보기**: glass-soft 행 + line 테두리, md 라운드. 호버 accent 테두리 + 2px 이동. 선택은 accent 링 + 마크 원 accent-strong. 채점 후 정답은 success 링 + success 마크(check), 오답은 danger 링 + danger 마크(slash). 해설 박스는 glass-soft에 success/danger 링. 행 배경은 결코 채워지지 않는다.

## Do's and Don'ts

### Do:
- **Do** 새 표면은 `.glass` / `.glass-strong` / `.plate` 셋 중 하나를 붙이고, 세 가장자리(edge · border · highlight)와 `--glass-shadow`를 그대로 가져간다.
- **Do** 긴 본문은 `.plate` 안에 `max-width: var(--measure)`(68ch), 행간 1.85로 놓는다.
- **Do** 상태는 원형 마크(check · slash · alert) + `inset 0 0 0 1px <의미색>` 링으로 그린다.
- **Do** 모든 숫자에 `font-variant-numeric: tabular-nums`를 준다.
- **Do** 액션·내비·배지·토스트는 `--radius-pill`, 카드는 `--radius-lg`, 페이지 패널은 `--radius-xl`, 표면 안 행·입력은 `--radius-md`.
- **Do** 전환은 `--dur-fast`(140ms) / `--dur-base`(260ms) / `--dur-slow`(520ms)와 `--ease-out` / `--ease-out-expo`만 쓰고, transform·opacity·filter만 애니메이션한다.
- **Do** 호버는 표면을 1px(버튼) 또는 3px(카드) 들어 올리고 그림자를 `--glass-shadow-hover`로 키운다.
- **Do** 아이콘은 `Icon.tsx`의 2px 스트로크 체계에 추가한다.
- **Do** 다크 모드 값은 `tokens.css`의 `[data-theme='dark']`와 `prefers-color-scheme` 두 블록에 동일하게 넣는다.

### Don't:
- **Don't** 행·카드·패널 배경을 success/danger/warn 단색이나 soft로 채워 상태를 표시하지 않는다 — 마크와 링뿐이다.
- **Don't** `--aurora-1/2/3`를 UI 요소에 쓰지 않는다. 오로라는 층 0에만 산다.
- **Don't** 오로라 외에 무한 반복 애니메이션을 두지 않는다. 호버 틸트, 빛 반사, 글로우 펄스는 이 세계의 것이 아니다.
- **Don't** 헤딩 위에 아이브로/키커 라벨, 대문자 자간 확장 라벨을 두지 않는다.
- **Don't** 코드가 아닌 텍스트에 JetBrains Mono를 쓰지 않는다.
- **Don't** 가장자리(edge · border · highlight) 없는 블러 표면을 만들지 않는다.
- **Don't** 이모지·유니코드 기호를 아이콘으로 쓰지 않는다.
- **Don't** 유리 위에 유리 표면을 겹쳐 쌓지 않는다. 표면 안의 강조는 glass-soft 행 + line 링 한 겹까지다.
- **Don't** `--color-ink-3`보다 밝은 잉크로 유리 위 본문을 쓰지 않는다 (AA 4.5:1 경계).
