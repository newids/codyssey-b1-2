# 아키텍처 그림 (G1–G10)

교안·실습 가이드·치트시트에서 같이 쓰는 그림 10종이다. 목록과 쓰임새는 `course/PLAN.md` 5절에 있다.

마크다운에는 SVG를 넣는다. 밝은 테마로 고정되어 있고 글꼴이 파일 안에 들어 있어 따로 설치할 것이 없다.

```markdown
![웹 앱 전체 구조](g01-web-app.svg)
```

## 그림 목록

| # | 이미지 (마크다운용) | 소스 | 방식 | 보여 주는 것 |
| --- | --- | --- | --- | --- |
| G1 | `g01-web-app.svg` | `src/g01-web-app.json` | archify architecture | 사용자 → 브라우저(React SPA) ↔ 백엔드, 배포. 빨간 점선이 이 과정에서 배우는 범위 |
| G2 | `g02-tsx-to-browser.svg` | `src/g02-tsx-to-browser.json` | archify architecture | `.tsx` → 타입 검사 → Vite 변환 → 브라우저 실행 → 화면. 브라우저는 TypeScript를 모른다 |
| G3 | `g03-imperative-vs-declarative.svg` | `src/g03-imperative-vs-declarative.json` | archify architecture | 위: 직접 DOM 조작, 아래: React. 같은 클릭이 두 방식에서 어떻게 흐르는지 |
| G4 | `g04-component-tree.svg` | `src/g04-component-tree.json` | archify architecture | 메모 앱 컴포넌트 트리. 빨간 점선 상자(`NoteForm`, `TipList`)는 3일 차에 추가 |
| G5 | `g05-props-flow.svg` | `src/g05-props-flow.json` | archify architecture | `App`(notes) → `NoteList`(notes) → `NoteCard`(note). 위에서 아래로만, props는 읽기 전용 |
| G6 | `g06-event-state-render.svg` | `src/g06-event-state-render.json` | archify architecture | 클릭 → 이벤트 핸들러 → `setState` → 리렌더링 → 새 화면 순환 |
| G7 | `g07-lifting-state.svg` | `src/g07-lifting-state.json` | archify architecture | state 끌어올리기 전/후. 데이터는 내려가고(`notes`, `note`) 함수 호출은 올라온다(`onToggleImportant`, `onDelete`) |
| G8 | `g08-use-effect-timing.svg` | `src/g08-use-effect-timing.src.svg` | 손으로 쓴 SVG | 렌더링 → 화면 반영 → effect 실행, 의존성 배열 세 경우의 실행 여부 표 |
| G9 | `g09-async-states.svg` | `src/g09-async-states.json` | archify architecture | `TipList`의 `status`: loading → success(목록/빈 상태) 또는 error → 다시 시도 |
| G10 | `g10-react-playground.svg` | `src/g10-react-playground.json` | archify architecture | 이 저장소 앱의 구조. ① 라우팅 ② 커스텀 훅 ③ 전역 상태 ④ 백엔드 ⑤ 배포 |

G8을 뺀 아홉 개는 같은 이름의 `.html`(archify 뷰어: 확대, 검색, 어두운 테마, 발표 모드)도 만들어진다. 뷰어 HTML은 용량이 커서(9개 7MB) 저장소에 넣지 않으며(`.gitignore`), 필요하면 아래 `build.sh`로 다시 만든다. 뷰어의 버튼과 범례 제목은 영어로 나온다. archify가 한국어 UI를 지원하지 않기 때문이고, SVG에서는 범례 제목만 "범례"로 바꿔 넣었다.

## 공통 규칙

색은 열 개 그림에서 같은 뜻으로 쓴다.

| 색 | 뜻 |
| --- | --- |
| 하늘색 | 화면 · 컴포넌트 |
| 초록 | 실행되는 코드 (핸들러, 훅, API 함수) |
| 보라 | 데이터 · state (state를 가진 컴포넌트 포함) |
| 노랑 | 도구 · 배포 (Vite, 호스팅, Vercel) |
| 빨강 | 주의 · 인증 (오류가 잡히는 곳, 문제가 생기는 곳) |
| 주황 | 이벤트 |
| 회색 | 사용자 · 바깥 |

화살표는 초록 실선이 주된 흐름(데이터가 내려가는 방향 포함), 회색 실선이 보조 흐름, 보라 점선이 호출·전달(함수 호출이 올라옴, 다시 시도, 배포), 빨강 점선이 문제가 생기는 길이다. 주황 점선 상자는 영역, 빨간 점선 상자는 강조 범위다.

G2·G3·G6·G9는 흐름이나 상태 전이지만 archify의 workflow/lifecycle 타입을 쓰지 않았다. 두 타입은 레인 폭과 글자 크기가 고정이라 프로젝터에서 글자가 작아졌고, 나머지 그림과 노드 모양도 달라졌다. 그래서 architecture 타입 하나로 통일했다.

## 다시 만들기

필요한 것: Node.js, archify 스킬(`~/.claude/skills/archify`), Python 3 + playwright(`pip install playwright && playwright install chromium`).

```bash
cd course/slides/diagrams

# 전부 다시 만들기: validate → deliver(HTML) → SVG 내보내기 → G8 조립
sh src/build.sh

# 하나만
sh src/build.sh g05-props-flow

# PNG 미리보기까지 (눈으로 확인용, 저장소에 넣지 않는다)
PREVIEW_DIR=/tmp/diagram-preview sh src/build.sh
```

단계별로 돌릴 때:

```bash
ARCHIFY=~/.claude/skills/archify/bin/archify.mjs
node $ARCHIFY validate architecture src/g05-props-flow.json --quality showcase --json
node $ARCHIFY deliver  architecture src/g05-props-flow.json g05-props-flow.html --quality showcase --json
python3 src/export-svg.py g05-props-flow     # HTML → 밝은 테마 SVG
python3 src/build-hand-svg.py                # G8: src/*.src.svg → *.svg
```

- `src/export-svg.py`는 archify 뷰어의 Export → SVG를 눌러 받은 파일에서 세 가지만 고친다: 밝은 테마 고정, 한글 글꼴 추가, 범례 제목 한글화.
- `src/build-hand-svg.py`는 G8 소스에 `g01-web-app.svg`의 스타일과 글꼴을 넣는다. 그래서 G1이 먼저 만들어져 있어야 한다.
- 그림을 고칠 때는 `src/`의 JSON(또는 G8의 `.src.svg`)만 고치고 `build.sh`를 다시 돌린다. `.html`과 `.svg`는 직접 고치지 않는다.
- validate가 실패하면 출력의 `diagnostics`가 어느 선·라벨이 문제인지와 고칠 좌표를 알려 준다.

## 확인한 것

- 아홉 개 모두 `validate --quality showcase` 통과(9개 검사, 오류·경고 0), `deliver` 성공.
- 아홉 개 HTML 모두 `archify visual-check` 통과(1440×900, 1600×1000, 1920×1080, 2048×1320에서 스크롤 없이 한 화면에 들어옴). 어두운 테마는 G10 한 장만 눈으로 확인했다.
- SVG 열 개를 `<img>`로 1600px 폭에 띄워 PNG로 찍어 확인: 글자 겹침·잘림·한글 깨짐 없음.

## G10의 근거 (2026-09-30 기준 코드)

| 그림 속 상자 | 확인한 코드 |
| --- | --- |
| `src/App.tsx` 라우트 10개 | `src/App.tsx`의 `<Route>` 10개, 그중 3개는 `ProtectedRoute` 아래 |
| `src/pages` 10개 | `src/pages/*Page.tsx` 10개 |
| `src/hooks` 7개 | `useAsync`, `useNotes`, `useNoteForm`, `useDebounce`, `useLessonProgress`, `useQuizAttempts`, `useOpenNoteComposer` |
| `src/context` | `AuthContext`, `ThemeContext`, `ToastContext`. `App.tsx`에서 Provider로 앱 전체를 감싼다 |
| `src/lib/api + supabase.ts` | `notes.ts`, `progress.ts`, `auth.ts`가 `src/lib/supabase.ts`의 클라이언트를 쓴다 |
| Supabase Auth | `auth.ts`의 Google 로그인·이메일 링크, `AuthContext`의 세션 구독 |
| Supabase DB 테이블 4개 | `supabase/migrations`의 `profiles`, `notes`, `lesson_progress`, `quiz_attempts` |
| Vercel | `vercel.json` (`framework: vite`, SPA rewrite) |

그림에서 줄인 것: `AuthContext`는 실제로 `src/lib/supabase.ts` 클라이언트를 거쳐 세션을 구독한다(그림에는 Context → Supabase Auth로 바로 그렸다). 페이지와 컴포넌트가 쓰기 작업에서 `src/lib/api`를 직접 부르는 경우도 있는데(`NoteEditPage`, `NoteComposer` 등) 그 화살표는 넣지 않았다.
