# 오류 대응집 (강사·조교용)

수업 중 자주 나오는 문제와 해결 방법. 실습별 오류는 각 실습 가이드의 "막혔을 때" 표에도 있다.

원칙: 한 사람에게 3분 넘게 붙잡히지 않는다. 3분 안에 안 풀리면 체크포인트를 받게 하고 수업 뒤에 본다.

```bash
npm run checkpoint lab3   # 실습 3까지 끝난 상태로 맞춘다. 기존 src는 src.backup-날짜-시간 폴더로 옮겨진다
```

## 1. 환경 문제

| 증상 | 원인 | 해결 |
| --- | --- | --- |
| `node: command not found` / `'node'은(는) 내부 또는 외부 명령…이 아닙니다` | 설치 후 터미널을 다시 열지 않았다 | 터미널(또는 VS Code)을 완전히 닫았다 연다. 안 되면 재부팅 |
| Node 버전이 18 이하 | 오래된 Node | LTS를 다시 설치한다. Vite 5는 Node 18 이상, 과정 기준은 20 이상 |
| PowerShell: `이 시스템에서 스크립트를 실행할 수 없으므로 npm.ps1 파일을 로드할 수 없습니다` | 실행 정책 | VS Code 터미널을 Command Prompt로 바꾼다. 또는 `npm.cmd install`처럼 `.cmd`를 붙인다 |
| `npm install`이 멈춰 있거나 `ETIMEDOUT`, `ECONNRESET` | 네트워크, 프록시 | 휴대폰 테더링으로 바꾼다. 강의실 네트워크가 막히면 `node_modules`를 USB로 나눠 주는 것도 방법이다(같은 운영체제끼리만) |
| `EACCES: permission denied` | 권한이 없는 폴더 | 프로젝트를 홈 폴더 아래로 옮긴다. `sudo npm install`은 쓰지 않는다 |
| `EPERM` / 파일이 사용 중 (Windows) | 백신이나 다른 프로그램이 잡고 있다 | VS Code와 터미널을 닫고 `node_modules`를 지운 뒤 다시 설치한다 |
| `Port 5173 is in use` | 개발 서버가 이미 떠 있다 | 문제없다. Vite가 5174 등 다른 포트를 쓴다. 터미널에 나온 주소를 연다 |
| `npm run dev`에서 `Missing script: "dev"` | 터미널 위치가 다르다 | `cd course/code/memo-app`. VS Code에서 `memo-app` 폴더를 직접 여는 것이 안전하다 |
| 저장해도 화면이 안 바뀐다 | 저장 안 됨, 다른 폴더를 고치는 중 | 탭의 ● 표시 확인. 백업 폴더(`src.backup-…`)의 파일을 고치고 있지 않은지 확인 |
| 경로에 한글·공백이 있어 오류 | 일부 도구가 처리 못 함 | `C:\work\memo-app`처럼 영문 경로로 옮긴다 |
| `npm run checkpoint` 실패: `src 폴더를 옮기지 못했습니다` | 개발 서버나 편집기가 파일을 잡고 있다(Windows) | 개발 서버를 끄고(`Ctrl + C`) 다시 실행한다 |

### 설치가 끝내 안 될 때

1. 옆 사람과 짝으로 진행한다. 한 사람이 조작하고 한 사람이 가이드를 읽는다. 실습마다 역할을 바꾼다.
2. 브라우저 대체 환경(StackBlitz)을 쓴다. 자세한 설명은 [보조 도구 안내](../TOOLS.md)에 있다.
   - 실습 자료가 GitHub 기본 브랜치에 올라가 있어야 한다.
   - 주소: `https://stackblitz.com/github/newids/codyssey-b1-2/tree/main/course/code/memo-app`
   - 이 환경에서는 `npm run checkpoint`를 쓸 수 없다(상위 폴더의 `checkpoints`가 없다). 뒤처지면 GitHub에서 `course/code/checkpoints/labN/src`의 파일을 복사해 붙인다.
   - **수업 전에 강사가 이 주소가 열리는지 한 번 확인한다.** 이 문서를 쓰는 시점에는 확인하지 못했다.

## 2. 코드 오류 — 증상으로 찾기

### 화면이 하얗게 비었다

| 확인 | 원인 |
| --- | --- |
| 브라우저 콘솔(F12)에 빨간 오류가 있다 | 메시지의 파일 이름과 줄 번호를 본다 |
| 오류가 없다 | 컴포넌트 이름이 소문자(`<noteList />`)이거나, `return`이 빠졌거나, `return` 다음 줄에 괄호 없이 JSX를 썼다 |
| `… is not defined` | import가 빠졌다 |
| `does not provide an export named 'default'` | 컴포넌트 파일에 `export default`가 빠졌다 |

### 브라우저에 빨간 오류 창이 떴다

| 메시지 | 원인 |
| --- | --- |
| `Failed to resolve import "./components/…"` | 파일 경로나 이름(대소문자)이 다르다 |
| `Unexpected token`, `Expected corresponding JSX closing tag` | 태그를 닫지 않았다. 오류가 가리키는 줄보다 위를 본다 |
| `Adjacent JSX elements must be wrapped in an enclosing tag` | 가장 바깥 태그가 둘 이상이다 |
| `Too many re-renders` | `onClick={handleClick()}`처럼 괄호를 붙였다 |
| `Invalid hook call` / `Rendered more hooks than…` | `useState`/`useEffect`를 조건문이나 핸들러 안에서 불렀다 |
| `Objects are not valid as a React child` | `{note}`처럼 객체를 통째로 그리려 했다. `{note.title}`로 |

### VS Code의 빨간 밑줄 (타입 오류)

화면은 돌아가더라도 밑줄은 없애고 넘어가게 한다. 메시지는 VS Code 언어 설정에 따라 한국어 또는 영어로 나온다.

| 메시지 (한국어 / 영어) | 뜻 | 해결 |
| --- | --- | --- |
| `'X' 속성이 … 형식에 없지만 'Props' 형식에서 필수입니다` / `Property 'X' is missing in type … but required in type 'Props'` | 컴포넌트를 쓰는 곳에서 props를 안 줬다 | 부모에서 `X={…}`를 넘긴다 |
| `'X' 속성이 'Props' 형식에 없습니다` / `Property 'X' does not exist on type …` | 받는 쪽 `Props`에 선언이 없다 | 자식의 `type Props`에 추가한다 |
| `'string' 형식은 'number' 형식에 할당할 수 없습니다` / `Type 'string' is not assignable to type 'number'` | 값의 종류가 다르다 | `count="3"` → `count={3}` |
| `'X' 이름을 찾을 수 없습니다` / `Cannot find name 'X'` | import가 없거나 오타 | import 추가 |
| `매개 변수 'x'에는 암시적으로 'any' 형식이 포함됩니다` / `Parameter 'x' implicitly has an 'any' type` | 함수 인자의 타입이 없다 | 가이드대로 `(id: number)`처럼 적는다 |
| `'X'이(가) 선언은 되었지만 해당 값이 읽히지는 않았습니다` / `'X' is declared but its value is never read` | 안 쓰는 변수·import (밑줄이 아니라 흐리게 표시) | 지워도 되고 그대로 둬도 실행에는 문제없다 |

### 동작이 이상하다

| 증상 | 원인 |
| --- | --- |
| 버튼을 눌러도 화면이 안 바뀐다 | set 함수를 안 불렀거나, 배열을 `push`로 고쳤다 |
| 페이지를 열자마자 핸들러가 실행된다(메모가 다 지워진다 등) | `onClick={onDelete(note.id)}` → `onClick={() => onDelete(note.id)}` |
| 삭제하면 전부 지워진다 | `filter` 조건이 `===`로 돼 있다 |
| 입력칸에 글자가 안 쳐진다 | `value`만 있고 `onChange`가 없다 |
| 폼을 제출하면 화면이 깜빡이고 입력이 사라진다 | `event.preventDefault()`가 없다 |
| 화면에 `0`이 찍힌다 | `{notes.length && …}` → `{notes.length > 0 && …}` |
| 콘솔에 `Each child in a list should have a unique "key" prop` | `map` 안 요소에 `key`가 없다 |
| 새로 고치면 메모가 초기화된다 | `useState<Note[]>(loadNotes)`와 저장 effect 확인 |
| 메모가 이상한 값으로 저장됐다 | 개발자 도구 → Application → Local Storage → `memo-app:notes` 삭제 후 새로 고침 |

## 3. 정상인데 질문이 나오는 것

| 현상 | 설명 |
| --- | --- |
| `console.log`가 두 번씩 찍힌다 | 개발 모드의 `StrictMode`가 컴포넌트와 effect를 일부러 두 번 실행한다. 배포판에서는 한 번 |
| Network 탭에 `tips.json` 요청이 2번 | 같은 이유 |
| 없는 주소(`/tips-wrong.json`)인데 상태 코드가 200이다 | Vite 개발 서버는 없는 주소에 `index.html`을 돌려준다. JSON으로 읽다가 실패해서 에러 상태가 된다 |
| 타입 오류가 있는데 화면은 나온다 | 개발 서버는 타입 검사를 하지 않는다. 검사는 편집기와 `npm run build`가 한다 |
| `npm install` 뒤 `vulnerabilities` 경고 | 개발 도구의 알려진 취약점 안내다. 실습에는 영향이 없다. `npm audit fix --force`는 실행하지 않는다 |
| `setState` 직후 값을 찍으면 예전 값이다 | set 함수는 다음 렌더링에 반영된다 |

## 4. 강사용 점검 명령

```bash
cd course/code/memo-app
npm run verify              # 모든 체크포인트의 타입 검사와 빌드
npm run checkpoint starter  # 시작 상태로 되돌리기
```
