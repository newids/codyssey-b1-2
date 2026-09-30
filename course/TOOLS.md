# 보조 도구 안내 — Marp, 그림 뷰어 HTML, StackBlitz

과정 자료를 보여 주거나 실행할 때 쓰는 보조 도구 세 가지. 셋 다 없어도 수업은 진행할 수 있다.

| 도구 | 쓰는 곳 | 없을 때 |
| --- | --- | --- |
| Marp | 교안을 슬라이드로 띄운다 | 교안 마크다운을 그대로 읽는다 |
| 그림 뷰어 HTML | 그림 한 장을 크게 띄운다 | SVG 파일을 브라우저로 연다 |
| StackBlitz | 설치가 안 되는 수강생의 대체 실습 환경 | 옆 사람과 짝으로 실습한다 |

## Marp — 교안을 슬라이드로

마크다운 파일을 발표용 슬라이드로 바꿔 주는 무료 도구다(https://marp.app). 교안 `slides/day1.md`–`day3.md`를 이 형식으로 썼다.

- **형식**: 파일 맨 위에 `marp: true`를 적고, `---` 한 줄로 슬라이드를 나눈다. 나머지는 보통 마크다운이다.
- **이 형식을 고른 이유**: 교안이 텍스트 파일이라 코드와 함께 버전 관리가 되고, 코드 예시를 고치기 쉽다. Marp 없이 GitHub에서 읽어도 내용은 다 보인다.

### 띄우는 방법

1. VS Code에서 "Marp for VS Code" 확장을 설치한다.
2. `slides/day1.md`를 열고 오른쪽 위의 미리 보기 버튼을 누른다.

### 파일로 내보내기

```bash
cd course
npx @marp-team/marp-cli slides/day1.md --pdf --allow-local-files    # PDF
npx @marp-team/marp-cli slides/day1.md --pptx --allow-local-files   # PowerPoint
```

`--allow-local-files`는 그림(SVG)과 화면 캡처(PNG)를 넣는 데 필요하다.

### 수업 전에 할 일

교안을 실제 슬라이드로 띄워 확인한 적이 없다. 한 번 띄워 보고 아래를 조정한다.

- 코드가 긴 슬라이드가 화면을 넘치는지. 넘치면 슬라이드를 둘로 나누거나 코드 줄 수를 줄인다.
- 그림 크기. `![w:900](diagrams/…svg)`의 `w:900`이 그림 폭(픽셀)이다. 숫자를 바꿔 맞춘다.
- 폭이 넓은 그림 3종(G1 전체 구조, G7 끌어올리기, G10 React Playground)의 화살표 라벨이 뒷자리에서 읽히는지.

## 그림 뷰어 HTML — 그림 한 장을 크게

`slides/diagrams/`의 그림은 archify라는 도구로 만들었다. 이 도구는 그림마다 두 가지를 내놓는다.

| 파일 | 용도 |
| --- | --- |
| `gNN-이름.svg` | 교안·가이드에 끼워 넣는 정지 그림. **저장소에 들어 있다** |
| `gNN-이름.html` | 그림 한 장을 브라우저에 단독으로 띄우는 뷰어. 확대, 어두운 화면 전환, 발표 모드가 된다. **저장소에 넣지 않는다** |

- 뷰어 HTML은 파일 하나가 약 800KB, 9개에 7MB라 저장소에서 뺐다. `slides/diagrams/.gitignore`가 `*.html`을 무시한다.
- 교안과 가이드는 SVG만 참조하므로 뷰어가 없어도 영향이 없다.
- 뷰어의 버튼과 메뉴는 영어다.
- G8(useEffect 실행 시점)은 손으로 그린 SVG라 뷰어가 없다.

### 그림만 크게 띄우고 싶을 때

뷰어 없이도 된다. SVG 파일을 브라우저 창에 끌어다 놓으면 그림만 크게 보인다.

### 뷰어를 다시 만들 때

```bash
cd course/slides/diagrams
sh src/build.sh                      # 전부
sh src/build.sh g10-react-playground # 하나만
```

필요한 것

- Node.js
- archify 스킬이 `~/.claude/skills/archify`에 설치돼 있어야 한다. 다른 위치면 `ARCHIFY=/경로/bin/archify.mjs sh src/build.sh`
- Python과 playwright(`pip install playwright && playwright install chromium`). HTML에서 SVG를 뽑는 데 쓴다

이 명령은 HTML과 함께 SVG도 다시 만든다. 그림 내용을 고칠 때도 같은 명령을 쓴다. `src/`의 JSON(또는 G8의 `.src.svg`)만 고치고 다시 돌린다. 자세한 규칙은 [slides/diagrams/README.md](slides/diagrams/README.md)에 있다.

## StackBlitz — 설치 없이 브라우저에서 실습

설치 없이 브라우저 안에서 Node.js 프로젝트를 실행해 주는 온라인 개발 환경이다(https://stackblitz.com). 브라우저 탭 하나에 편집기, 터미널, 미리 보기 화면이 함께 뜬다.

- **과정에서의 역할**: 노트북에 Node.js 설치가 끝내 안 되는 수강생을 위한 대체 환경이다. 기본은 각자 노트북에 설치하는 것이다.
- **여는 방법**: GitHub 저장소의 폴더를 주소로 바로 연다.

  ```
  https://stackblitz.com/github/newids/codyssey-b1-2/tree/main/course/code/memo-app
  ```

### 제약

| 제약 | 대응 |
| --- | --- |
| 자료가 GitHub `main` 브랜치에 있어야 주소가 열린다 | 과정 자료를 `main`에 병합한 뒤에 쓴다 |
| `memo-app` 폴더만 불러오므로 `npm run checkpoint`를 쓸 수 없다 | 뒤처지면 GitHub에서 `course/code/checkpoints/labN/src`의 파일을 복사해 붙인다 |
| 코드를 저장해 두려면 StackBlitz 계정(GitHub 로그인)이 필요하다 | 수업 중에는 탭을 닫지 않게 안내한다. 이어서 하려면 로그인 후 Fork 한다 |
| 크롬 계열 브라우저에서 가장 잘 동작한다 | Chrome 또는 Edge를 쓰게 한다 |

### 수업 전에 할 일

이 주소가 실제로 열리는지는 확인하지 못했다. 자료가 작업 브랜치에만 있었기 때문이다. `main`에 병합한 뒤 강사가 한 번 열어서 아래를 확인한다.

- [ ] 주소가 열리고 자동으로 `npm install`과 개발 서버가 실행된다
- [ ] 미리 보기에 메모 카드 3장이 보인다
- [ ] `src/App.tsx`의 글자를 고치면 미리 보기가 바뀐다

열리지 않으면 대체 환경 없이 짝 실습으로 진행한다([오류 대응집](instructor/troubleshooting.md)의 "설치가 끝내 안 될 때").
