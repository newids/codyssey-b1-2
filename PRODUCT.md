# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **코디세이 평가자·멘토** — 데스크톱 브라우저에서 배포 URL을 열어 미션 요구사항(라우팅·CRUD·폼·상태·배포)이 충족되는지 검토하고 구술 평가를 진행한다. 첫인상과 "이벤트 → 상태 → 렌더링" 흐름의 시연이 중요하다.
- **학습자(제작자 본인)** — 노트북으로 React 레슨 8개를 읽고, 연습 문제를 풀고, 배운 것을 학습 노트로 남긴다. 반복 방문하며 진도·퀴즈 점수를 확인한다. 긴 본문의 가독성이 중요하다.

(사용자 확인: 2026-09-23, 두 대상 모두)

## Product Purpose

React의 컴포넌트·상태·이벤트·비동기 렌더링을 "이 사이트 자체가 교재"가 되도록 설계한 학습 SPA. Codyssey B1-2 미션 "버튼 누르면 화면이 스르륵 바뀌는 요즘 웹사이트 만들기"의 제출물이다. 성공은 (1) 평가자가 배포 URL에서 모든 요구사항을 확인할 수 있고, (2) 학습자가 레슨을 끝까지 읽고 노트를 남기는 것.

## Positioning

레슨 본문이 이 사이트의 실제 소스 파일을 가리킨다(`usedIn`). 배우는 개념과 만든 코드가 같은 저장소에 있어, 다른 React 튜토리얼이 복사할 수 없는 "교재 = 결과물" 구조다.

## Operating Context

- 배포: https://codyssey-b1-2-react.vercel.app (Vercel), 백엔드 Supabase(서울).
- 평가 흐름: 홈 → 레슨 목록/상세 → 퀴즈 → 로그인 → 노트 등록/수정/삭제 → 프로필. 문서 `docs/EVALUATION.md`의 QA 시나리오 28개가 검토 순서다.
- 학습 흐름: 레슨 읽기(10~18분) → 연습 문제 → 노트 작성 → 진도 확인.

## Capabilities and Constraints

- React 18 + TypeScript + Vite + React Router 6 + Supabase. 라우트 10개, 보호 라우트 3개.
- 핵심 데이터는 학습 노트(notes) CRUD. 진도·퀴즈 점수는 부가 데이터. 레슨 본문은 정적(`src/data/lessons.ts`).
- 로그인: Google(GIS + signInWithIdToken), 이메일 매직 링크.
- 다크/라이트 모드 둘 다 지원하며 토글과 시스템 설정을 따른다 — 유지.
- 콘텐츠·문구·라우트·기능은 리디자인에서 바뀌지 않는다. CSS Modules + CSS 커스텀 프로퍼티(oklch) 구조 유지.
- 성능 예산: gzip JS < 300 kB, 애니메이션은 transform/opacity/filter만.
- 미션 제약: "UI 고퀄리티보다 React 구조와 데이터 흐름이 우선" — 디자인이 기능 시연을 가리면 안 된다.

## Brand Commitments

- 이름: React Playground. 로고는 React 원자 모양 SVG(`public/favicon.svg`).
- 사용자가 리디자인 방향을 고정함(2026-09-23): **글래스모피즘**, 비주얼 이펙트는 과하지 않게. 표면(헤더·카드·패널)에 블러/반투명 유리, 배경은 색 번짐이 **아주 느리게(약 60초 주기) 흐르는** 정도까지 허용, `prefers-reduced-motion`이면 정지. 호버 틸트·빛 반사 같은 효과는 선택하지 않음.
- 한국어 UI.

## Evidence on Hand

- 레슨 8개 본문·퀴즈 24문항(실제 콘텐츠, `src/data/lessons.ts`).
- 스크린샷 `images/screenshots/` (이전 디자인 기준).
- 사용자 노트 데이터는 없음(빈 상태가 기본). 가짜 노트·후기·수치를 만들지 않는다.

## Product Principles

1. 기능 시연이 먼저다 — 로딩/에러/빈 상태, 폼 검증, 페이지 전환이 한눈에 보여야 한다.
2. 레슨 본문은 오래 읽는 텍스트다 — 대비와 행간이 유리 효과보다 우선한다.
3. 교재와 결과물이 같다 — 화면의 요소가 레슨에서 말한 개념을 증명해야 한다.
4. 절제 — 효과는 위계를 설명할 때만 쓰고, 장식으로 쓰지 않는다.

## Accessibility & Inclusion

- 키보드 포커스 링, aria 속성, `prefers-reduced-motion` 준수(기존 유지).
- 유리 표면 위 본문 텍스트는 WCAG AA 대비(4.5:1)를 만족해야 한다.
