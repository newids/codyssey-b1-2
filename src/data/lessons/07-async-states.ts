import type { Lesson } from './types';

export const asyncStates: Lesson = {
  slug: 'async-states',
  order: 7,
  title: '로딩 · 에러 · 빈 상태를 통일하기',
  subtitle: '모든 화면이 같은 패턴을 쓴다',
  minutes: 16,
  level: '응용',
  summary: 'status 하나로 4가지 화면을 결정하고, 그 분기를 컴포넌트 하나에 모은다.',
  usedIn: ['src/components/ui/AsyncBoundary.tsx', 'src/components/ui/Loading.tsx', 'src/components/ui/ErrorState.tsx', 'src/components/ui/EmptyState.tsx'],
  blocks: [
    { type: 'p', text: '서버에서 데이터를 가져오는 화면은 "데이터가 있는 화면" 하나만 있는 게 아니다. 택배를 생각해 보자. 배송 중일 수도 있고, 도착했을 수도 있고, 분실됐을 수도 있고, 도착했는데 상자가 비어 있을 수도 있다. 화면도 이 네 경우를 모두 그릴 수 있어야 한다.' },

    { type: 'h', text: '네 가지 상태와 다섯 번째 화면' },
    { type: 'list', items: [
      'idle — 아직 요청하지 않았다.',
      'loading — 요청을 보냈고 응답을 기다리는 중이다. 스피너나 뼈대(스켈레톤)를 보인다.',
      'success — 응답이 왔다. 데이터를 보인다.',
      'error — 실패했다. 이유와 "다시 시도" 버튼을 보인다.',
    ] },
    { type: 'p', text: '그리고 success 안에 숨어 있는 다섯 번째 화면이 있다. 요청은 성공했는데 결과가 0건인 경우, 빈 상태(empty)다. 가장 자주 빠뜨린다. 개발할 때는 늘 테스트 데이터가 있으니 빈 화면을 볼 일이 없기 때문이다. 그런데 새로 가입한 사용자가 처음 보는 화면이 바로 이 빈 상태다.' },

    { type: 'h', text: 'boolean 두 개가 아니라 status 하나' },
    { type: 'p', text: '처음에는 isLoading과 isError 두 개의 boolean으로 시작하기 쉽다. 그런데 boolean 두 개는 네 가지 조합을 만들고, 그중에는 말이 안 되는 것이 있다.' },
    { type: 'code', lang: 'ts', caption: '불가능한 상태가 생긴다', code: `// 잘못된 예: boolean 두 개\nisLoading: true,  isError: true    // 로딩 중이면서 실패? 어느 화면을 그려야 하지?\n\n// 올바른 예: 문자열 하나 — 상태는 항상 정확히 하나\ntype AsyncStatus = 'idle' | 'loading' | 'success' | 'error';` },

    { type: 'h', text: '분기를 한 곳에 모은다' },
    { type: 'p', text: '페이지마다 if (loading) … else if (error) … 를 직접 쓰면 어떤 페이지는 스피너 모양이 다르고, 어떤 페이지는 빈 상태를 빼먹고, 어떤 페이지는 "다시 시도" 버튼이 없다. 이 사이트는 그 분기를 AsyncBoundary 컴포넌트 하나에 모았다.' },
    { type: 'code', lang: 'tsx', caption: 'components/ui/AsyncBoundary.tsx — 전체 코드가 이게 전부다', code: `export function AsyncBoundary({ status, error, isEmpty, onRetry, empty, children }) {\n  if (status === 'idle' || status === 'loading') return <Loading />;\n  if (status === 'error') return <ErrorState message={toUserMessage(error)} onRetry={onRetry} />;\n  if (isEmpty) return <EmptyState {...empty} />;\n  return <>{children}</>;\n}` },
    { type: 'p', text: '목록·상세·수정·프로필·레슨 상세 다섯 페이지가 이 컴포넌트 하나를 쓴다. 스피너 모양이나 에러 문구를 바꾸고 싶으면 한 파일만 고치면 다섯 페이지가 함께 바뀐다. 1번 레슨의 "반복되면 컴포넌트"가 화면 조각뿐 아니라 "패턴"에도 적용된 것이다.' },

    { type: 'h', text: '에러 메시지는 사람의 말로' },
    { type: 'p', text: '서버가 돌려주는 에러는 "new row violates row-level security policy" 같은 문장이다. 사용자에게 그대로 보여 주면 아무 도움이 안 된다. toUserMessage 함수가 이것을 "네트워크 연결을 확인해 주세요", "권한이 없습니다", "데이터를 찾을 수 없습니다" 세 종류의 문장으로 번역한다.' },
    { type: 'p', text: '좋은 에러 메시지는 두 가지를 말한다. 무엇이 잘못됐는지, 그리고 사용자가 무엇을 할 수 있는지. 그래서 에러 화면에는 항상 "다시 시도" 버튼이 있다. 이 버튼은 훅이 돌려준 refetch()를 부른다.' },

    { type: 'tip', text: '화면을 만들 때 "데이터가 있는 경우"부터 만들지 말고, 빈 상태 → 로딩 → 에러 → 성공 순서로 만들어 보자. 빠뜨리는 상태가 없어진다.' },
  ],
  quiz: [
    { id: 'a1', question: '비동기 UI에서 흔히 빠뜨리는 상태는?', choices: ['loading', 'error', '빈 결과(empty)', 'success'], answerIndex: 2, explanation: '요청은 성공했지만 데이터가 0건인 경우. 빈 화면 대신 안내와 행동(작성하기)을 보여줘야 한다.' },
    { id: 'a2', question: 'isLoading/isError 두 boolean 대신 status 하나를 쓰는 이유는?', choices: ['짧아서', '불가능한 상태 조합을 없애기 위해', 'TypeScript 때문', '성능'], answerIndex: 1, explanation: '상태는 항상 정확히 하나여야 한다. 문자열 유니온 타입이 그걸 보장한다.' },
    { id: 'a3', question: '로딩/에러/빈 상태를 컴포넌트 하나로 모으면 얻는 것은?', choices: ['빠른 요청', '페이지마다 다른 디자인', '일관성과 수정 지점 단일화', '자동 재시도'], answerIndex: 2, explanation: '다섯 페이지가 같은 컴포넌트를 쓰니 문구·모양·접근성을 한 곳에서 관리한다.' },
    { id: 'a4', question: '좋은 에러 화면이 반드시 포함해야 하는 것은?', choices: ['서버가 준 원문 에러', '무엇이 잘못됐는지와 사용자가 할 수 있는 행동', '개발자 연락처', '에러 코드 번호'], answerIndex: 1, explanation: '원인을 사람의 말로 알리고, "다시 시도"처럼 다음 행동을 준다.' },
  ],
};
