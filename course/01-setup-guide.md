# 사전 준비 안내

수업 전에 아래 4단계를 끝내 주세요. 15–20분 걸립니다.
막히면 [설치가 안 될 때](#설치가-안-될-때)를 보고, 그래도 안 되면 수업 10분 전에 와서 강사에게 알려 주세요.

## 1. Node.js 설치

React 프로젝트를 실행하는 데 필요한 프로그램입니다.

1. https://nodejs.org 에서 **LTS** 버전을 받아 설치합니다. 설치 중 나오는 선택지는 모두 기본값으로 둡니다.
2. 터미널을 엽니다.
   - Windows: 시작 메뉴에서 "PowerShell" 검색
   - macOS: Spotlight(⌘ + Space)에서 "터미널" 검색
3. 아래 명령을 입력합니다.

   ```bash
   node --version
   ```

   `v20.19.0` 이상의 숫자가 나오면 됩니다. (`v22`, `v24`도 됩니다.)

## 2. VS Code 설치

코드를 읽고 고치는 편집기입니다.

1. https://code.visualstudio.com 에서 받아 설치합니다.
2. 한국어 메뉴를 원하면 VS Code 왼쪽의 확장(네모 4개 아이콘)에서 "Korean Language Pack"을 설치합니다.

## 3. 실습 자료 받기

강사가 알려 준 방법 중 하나로 받습니다.

- **zip 파일**: 받은 파일의 압축을 풉니다. 경로에 한글이나 공백이 없는 곳(예: `C:\work`, `~/work`)에 두는 것이 안전합니다.
- **Git**: `git clone https://github.com/newids/codyssey-b1-2.git`

## 4. 실행 확인

1. VS Code에서 **파일 → 폴더 열기**로 `course/code/memo-app` 폴더를 엽니다.
2. VS Code 메뉴 **터미널 → 새 터미널**을 엽니다.
3. 아래 명령을 차례로 입력합니다.

   ```bash
   npm install
   npm run dev
   ```

4. 터미널에 나온 주소(보통 `http://localhost:5173`)를 브라우저에서 엽니다.
5. "학습 메모"라는 제목과 메모 카드 3장이 보이면 준비가 끝났습니다.
6. 서버를 끄려면 터미널에서 `Ctrl + C`를 누릅니다.

## JavaScript 자가 점검

아래 코드가 무엇을 하는지 대략 짐작되면 충분합니다. 낯선 것이 절반을 넘으면 수업 전에 MDN의 "JavaScript 첫걸음"을 한 번 훑어보세요.

```js
// 1. 변수
const title = '메모';

// 2. 함수
function add(a, b) {
  return a + b;
}

// 3. 화살표 함수
const double = (n) => n * 2;

// 4. 객체
const note = { id: 1, title: '첫 메모' };
console.log(note.title);

// 5. 배열
const numbers = [1, 2, 3];

// 6. map — 배열의 각 항목을 바꿔 새 배열을 만든다
const doubled = numbers.map((n) => n * 2); // [2, 4, 6]

// 7. filter — 조건에 맞는 항목만 남긴 새 배열을 만든다
const big = numbers.filter((n) => n > 1); // [2, 3]

// 8. 스프레드 — 배열이나 객체를 펼쳐서 새로 만든다
const more = [0, ...numbers]; // [0, 1, 2, 3]
const updated = { ...note, title: '고친 메모' };

// 9. 삼항 연산자
const label = numbers.length > 0 ? '있음' : '없음';

// 10. 템플릿 문자열
const message = `메모 ${numbers.length}개`;
```

## 설치가 안 될 때

| 증상 | 해결 |
| --- | --- |
| `node` 명령을 찾을 수 없다고 나온다 | 터미널을 모두 닫았다가 다시 엽니다. 그래도 안 되면 컴퓨터를 다시 시작합니다. |
| Windows에서 `npm` 실행 시 "스크립트를 실행할 수 없습니다" | PowerShell 대신 "명령 프롬프트(cmd)"에서 실행합니다. VS Code 터미널 오른쪽 위 `+` 옆 화살표에서 "Command Prompt"를 고를 수 있습니다. |
| `npm install`이 오래 멈춰 있다 | 회사·학교 네트워크가 막는 경우가 있습니다. 다른 네트워크(휴대폰 테더링)로 시도합니다. |
| `npm install`에서 `EACCES` 또는 권한 오류 | 폴더를 문서 폴더나 홈 폴더 아래로 옮겨서 다시 실행합니다. `sudo`는 쓰지 않습니다. |
| 브라우저에 아무것도 안 나온다 | 터미널에 나온 주소가 `5173`이 아닐 수 있습니다. 터미널의 주소를 그대로 복사해서 엽니다. |
| 위 방법으로 해결되지 않는다 | 설치 없이 브라우저에서 실습할 수 있는 대체 환경(StackBlitz)을 수업 때 안내합니다. |
