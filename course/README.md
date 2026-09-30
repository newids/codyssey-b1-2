# React 첫걸음 — 3일 만에 메모 앱 만들기

React를 처음 접하는 사람을 위한 2시간 × 3일 과정의 교안, 실습 자료, 진행 자료.

## 수강생이라면

1. [과정 개요서](00-syllabus.md)로 일정을 확인한다.
2. 수업 전에 [사전 준비 안내](01-setup-guide.md)를 따라 설치와 실행 확인을 끝낸다.
3. 수업 때는 [실습 가이드](labs/README.md)를 열어 두고 따라간다.
4. 수업 뒤에는 [치트시트](handouts/cheatsheet.md)와 [복습 퀴즈](handouts/quiz.md)로 복습한다.
5. 과정을 마치면 [다음 단계](handouts/next-steps.md)를 본다.

## 강사라면

1. [과정 설계와 작성 계획](PLAN.md)에서 범위와 설계 의도를 확인한다.
2. 일자별 [진행 노트](instructor/)에 분 단위 진행표, 라이브 코딩 순서, 예상 질문이 있다.
3. [오류 대응집](instructor/troubleshooting.md)을 조교와 함께 읽어 둔다.
4. 수업 전에 실습 코드가 모두 빌드되는지 확인한다.

   ```bash
   cd course/code/memo-app
   npm install
   npm run verify
   ```

## 폴더 구성

```
course/
  PLAN.md               과정 설계와 문서 작성 계획
  00-syllabus.md        과정 개요서
  01-setup-guide.md     사전 준비 안내
  TOOLS.md              보조 도구 안내 (Marp, 그림 뷰어 HTML, StackBlitz)
  slides/               강의 교안 (day1–3.md), diagrams/ 에 아키텍처 그림 10종
  labs/                 실습 가이드 (lab0–7), images/ 에 단계별 완성 화면
  instructor/           강사용 진행 노트, 오류 대응집
  handouts/             치트시트, 복습 퀴즈, 다음 단계, 설문
  code/
    memo-app/           실습 프로젝트. 수강생은 이 폴더에서 작업한다
    checkpoints/        단계별 완성 코드 (starter, lab1–lab7). lab7이 최종본
```

## 교안을 슬라이드로 띄우기

`slides/day*.md`는 [Marp](https://marp.app) 형식이다. `---`로 슬라이드를 나눈다.

- VS Code: "Marp for VS Code" 확장을 설치하고 파일을 연 뒤 미리 보기를 띄운다.
- 파일로 내보내기: `npx @marp-team/marp-cli slides/day1.md --pdf --allow-local-files`

그림은 `slides/diagrams/`의 SVG 파일이다. 그림을 크게 띄우는 뷰어 HTML은 저장소에 넣지 않았고 필요할 때 다시 만든다.

Marp, 그림 뷰어, 설치가 안 될 때 쓰는 StackBlitz에 대한 설명은 [보조 도구 안내](TOOLS.md)에 있다.

## 실습 코드 다루기

```bash
cd course/code/memo-app
npm install
npm run dev                 # 개발 서버
npm run checkpoint lab3     # 실습 3까지 끝난 상태의 코드를 src로 가져온다 (기존 src는 백업된다)
npm run checkpoint starter  # 시작 상태로 되돌린다
npm run verify              # (강사용) 모든 체크포인트의 타입 검사와 빌드
```

| 체크포인트 | 상태 |
| --- | --- |
| `starter` | 실습 0, 1의 시작. 통짜 `App.tsx` |
| `lab1` | 컴포넌트로 나눔 |
| `lab2` | props와 목록 |
| `lab3` | 카드 펼치기, 중요 표시(카드 안 state) |
| `lab4` | 메모 추가·삭제, state를 `App`으로 끌어올림 |
| `lab5` | 빈 상태, 중요만 보기 |
| `lab6` | 작성 폼과 검증, 검색 |
| `lab7` | localStorage 저장, 팁 불러오기 (최종본) |

체크포인트에는 각 실습의 도전 과제까지 들어 있다.
