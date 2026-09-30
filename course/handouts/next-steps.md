# 다음 단계

3일 동안 배운 것은 브라우저 안에서 화면을 만드는 부분이다. 아래 그림의 나머지 부분을 하나씩 채워 가면 된다.

![React Playground 아키텍처](../slides/diagrams/g10-react-playground.svg)

## 1주 차 — 배운 것 다지기

| 할 일 | 자료 |
| --- | --- |
| 3일 차 내용 복습 | React Playground 레슨 4(useEffect), 6(폼), 7(로딩·에러·빈 상태)과 퀴즈 |
| 메모 앱에 수정 기능 넣기 | 카드에 "수정" 버튼 → 제목을 입력칸으로 바꾸기 → 저장. `map`으로 해당 메모만 바꾼다 |
| 완성 코드 설명하기 | `npm run checkpoint lab7`의 `App.tsx`를 위에서 아래로 읽으며 각 줄이 하는 일을 말해 본다 |

## 2주 차 — 화면을 여러 개로: 라우팅

- 읽기: React Playground 레슨 5 "라우팅 — URL이 곧 상태"
- 코드 보기: 이 저장소의 `src/App.tsx` — 주소와 페이지 컴포넌트를 짝짓는 `<Route>` 목록
- 해 보기: 메모 앱에 `/`(목록)와 `/notes/:id`(메모 하나) 두 화면을 만든다
- 도구: React Router — https://reactrouter.com

## 3주 차 — 반복을 묶기: 커스텀 훅

- 읽기: React Playground 레슨 8 "커스텀 훅으로 흐름 묶기"
- 코드 보기: `src/hooks/useAsync.ts` — 실습 7의 `TipList`에 있던 status, 데이터, effect가 그대로 들어 있다
- 해 보기: `TipList`의 요청 부분을 `useTips()`라는 함수로 빼낸다

## 4주 차 — 어디서든 쓰는 데이터: 전역 상태

- 코드 보기: `src/context/AuthContext.tsx` — 로그인한 사용자 정보를 앱 전체에 제공한다. `useAuth()`로 꺼내 쓴다
- 해 보기: 메모 앱에 밝은/어두운 테마 전환을 Context로 만든다
- 기준: props를 세 단계 넘게 그대로 전달만 하고 있다면 Context를 떠올린다. 그 전에는 state 끌어올리기로 충분하다
- 자료: https://ko.react.dev/learn/passing-data-deeply-with-context

## 5주 차 — 서버에 저장하기: 백엔드

- 코드 보기: `src/lib/api/notes.ts` — 메모를 조회·등록·수정·삭제하는 함수. 컴포넌트는 이 함수만 부른다
- 해 보기: Supabase 무료 프로젝트를 만들고 메모 앱의 `storage.ts`를 Supabase 요청으로 바꾼다
- 알아 둘 것: 요청은 실패할 수 있고 시간이 걸린다. 실습 7에서 배운 네 가지 상태가 모든 화면에 필요해진다
- 자료: `docs/SETUP.md`(이 저장소의 Supabase 설정 과정), https://supabase.com/docs

## 6주 차 — 세상에 내놓기: 배포

- 해 보기: 메모 앱을 GitHub에 올리고 Vercel에 연결한다. 코드를 올릴 때마다 자동으로 다시 배포된다
- 확인: `npm run build`가 내 컴퓨터에서 통과해야 배포도 된다. 타입 오류가 있으면 빌드가 멈춘다
- 자료: `docs/GUIDE.md`의 배포 부분, https://vercel.com/docs

## TypeScript는 언제 더 배우나

이 과정에서는 읽는 법만 익혔다. 아래 상황이 되면 조금씩 더 찾아본다.

- 빨간 밑줄 메시지를 읽어도 뜻을 모르겠을 때
- 다른 사람이나 AI 도구가 쓴 코드에 `<T>`, `interface`, `as` 같은 표기가 나올 때

자료: TypeScript 공식 핸드북의 "일상적인 타입" — https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html

## 막혔을 때 볼 곳

| 자료 | 주소 |
| --- | --- |
| React 공식 문서(한국어) | https://ko.react.dev |
| 자습서: 틱택토 게임 | https://ko.react.dev/learn/tutorial-tic-tac-toe |
| React로 사고하기 | https://ko.react.dev/learn/thinking-in-react |
| 이 과정의 치트시트 | [cheatsheet.md](cheatsheet.md) |
