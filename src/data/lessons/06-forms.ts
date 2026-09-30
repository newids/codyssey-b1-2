import type { Lesson } from './types';

export const forms: Lesson = {
  slug: 'forms',
  order: 6,
  title: '폼 — controlled input과 검증',
  subtitle: '입력값을 state가 소유한다',
  minutes: 20,
  level: '응용',
  summary: 'input의 value를 state에 묶으면 검증·미리보기·제출 상태를 모두 React가 다룰 수 있다.',
  usedIn: ['src/components/notes/NoteForm.tsx', 'src/lib/validation.ts', 'src/hooks/useNoteForm.ts'],
  blocks: [
    { type: 'p', text: '폼은 사용자가 데이터를 "만드는" 곳이다. 노트 작성 화면을 열어 제목을 입력해 보면 오른쪽 미리보기 카드가 글자마다 따라 바뀐다. 입력창의 값을 React state가 쥐고 있기 때문에 가능한 일이다.' },

    { type: 'h', text: 'controlled input — 값의 주인이 state' },
    { type: 'p', text: '보통의 HTML 입력창은 자기 값을 스스로 기억한다. 값이 필요하면 나중에 input.value를 읽는다. 이 방식에서는 "지금 입력된 값"을 React가 모르기 때문에, 입력 도중에 검증하거나 미리보기를 그릴 수 없다.' },
    { type: 'p', text: 'controlled input은 반대다. 입력창에게 "네 값은 state가 정한다"고 알려 주고(value), 사용자가 타이핑하면 state를 바꾼다(onChange). 입력창은 state를 보여 주는 거울이 된다.' },
    { type: 'code', lang: 'tsx', caption: '두 줄이 한 쌍이다', code: `const [title, setTitle] = useState('');\n\n<input\n  value={title}                                  // state → 입력창 (보여 주기)\n  onChange={(e) => setTitle(e.target.value)}    // 입력창 → state (받아 적기)\n/>` },
    { type: 'p', text: '글자 하나를 치면: onChange 발생 → setTitle 호출 → 리렌더링 → value에 새 title이 들어감. 3번 레슨의 이벤트 → 상태 → 렌더링 흐름 그대로다. value만 쓰고 onChange를 빼먹으면 state가 안 바뀌므로 입력창이 "얼어붙어" 아무것도 입력되지 않는다.' },


    { type: 'h', text: '검증은 "계산"이다' },
    { type: 'p', text: '에러 메시지를 state로 따로 두고 입력할 때마다 setErrors로 맞추는 방식은 값과 에러가 어긋나기 쉽다. 에러는 값에서 "계산되는" 것이다. 2번 레슨에서 본 "다른 값에서 계산할 수 있으면 state가 아니다"의 실제 사례다.' },
    { type: 'code', lang: 'ts', caption: 'lib/validation.ts — UI를 모르는 순수 함수', code: `export function validateNote(input: NoteInput): NoteErrors {\n  const errors: NoteErrors = {};\n  const title = input.title.trim();\n  if (!title) errors.title = '제목을 입력해 주세요.';\n  else if (title.length < 2) errors.title = '제목은 2자 이상이어야 합니다.';\n  // … 내용도 같은 방식\n  return errors;\n}\n\n// 훅에서는 값이 바뀔 때만 다시 계산\nconst errors = useMemo(() => validateNote(values), [values]);` },
    { type: 'p', text: 'validateNote는 값을 받아 에러 객체를 돌려줄 뿐, 화면을 전혀 모른다. 이런 함수를 순수 함수라고 하며, 브라우저 없이 테스트할 수 있다. 이 사이트의 validation.test.ts가 그 예다.' },

    { type: 'h', text: '에러를 "언제" 보여 줄 것인가' },
    { type: 'p', text: '빈 폼을 열자마자 "제목을 입력해 주세요"가 빨갛게 떠 있으면 불쾌하다. 첫 글자를 치자마자 "2자 이상이어야 합니다"가 뜨는 것도 마찬가지다. 에러는 항상 계산하되, 보여 주는 시점을 고른다.' },
    { type: 'list', items: [
      '타이핑 중 — 검증은 하되 에러는 아직 보이지 않는다.',
      '입력창을 떠날 때(blur) — 그 필드를 "다뤘다(touched)"고 기록하고, 그 필드의 에러를 보인다.',
      '제출 버튼을 눌렀을 때 — 모든 필드를 touched로 만들어 남은 에러를 전부 보인다. 에러가 있으면 서버로 보내지 않는다.',
    ] },

    { type: 'code', lang: 'tsx', caption: 'components/notes/NoteForm.tsx', code: `<Input\n  label="제목"\n  value={values.title}\n  onChange={(e) => setField('title', e.target.value)}\n  onBlur={() => touch('title')}\n  error={visibleErrors.title}\n  required\n/>\n<Button type="submit" loading={submitStatus === 'loading'}>저장</Button>` },

    { type: 'h', text: '제출의 네 가지 상태' },
    { type: 'p', text: '저장 버튼을 누른 뒤 서버 응답이 오기까지는 시간이 걸린다. 그동안 버튼이 그대로면 사용자는 "눌린 건가?" 하고 한 번 더 누르고, 노트가 두 개 생긴다. 제출도 데이터 조회와 같은 네 상태를 가진다.' },
    { type: 'list', items: [
      'idle — 아직 제출하지 않음.',
      'loading — 제출 중. 버튼을 비활성화하고 스피너와 "저장 중…"을 보인다.',
      'success — 성공. 상세 페이지로 이동하고 "저장했습니다" 알림을 띄운다.',
      'error — 실패. 폼은 그대로 두고(입력한 내용이 날아가면 안 된다) 상단에 이유를 보인다.',
    ] },
    { type: 'tip', text: '검증 로직은 validateNote() 같은 순수 함수로 빼면 UI 없이 테스트할 수 있다. 그리고 클라이언트 검증은 "친절"이지 "보안"이 아니다. 서버(이 사이트는 DB의 check 제약과 RLS)도 같은 규칙을 가져야 한다.' },
  ],
  quiz: [
    { id: 'f1', question: 'controlled input이란?', choices: ['readonly 입력창', 'value와 onChange가 state에 묶인 입력창', 'ref로 읽는 입력창', '서버가 제어하는 입력창'], answerIndex: 1, explanation: 'state가 값의 단일 출처(single source of truth)가 된다.' },
    { id: 'f2', question: '에러 메시지를 타이핑 즉시 보이지 않고 blur 후에 보이는 이유는?', choices: ['성능 때문', '첫 글자부터 빨간 에러가 뜨면 사용자 경험이 나쁘기 때문', 'React 제약', '검증이 느려서'], answerIndex: 1, explanation: 'touched 상태로 "사용자가 그 필드를 다뤘는가"를 추적해 적절한 시점에 보여준다.' },
    { id: 'f3', question: '제출 중 버튼을 비활성화하는 가장 중요한 이유는?', choices: ['예뻐서', '중복 제출 방지와 진행 중임을 알리기 위해', '메모리 절약', '접근성 규정'], answerIndex: 1, explanation: '두 번 클릭하면 노트가 두 개 생긴다. loading 상태를 UI로 드러내야 한다.' },
    { id: 'f4', question: 'input에 value만 주고 onChange를 빼먹으면?', choices: ['정상 입력된다', '입력창이 얼어붙어 아무것도 입력되지 않는다', '자동으로 state가 갱신된다', '페이지가 새로고침된다'], answerIndex: 1, explanation: 'state가 바뀌지 않으니 리렌더링돼도 value가 그대로다. value와 onChange는 한 쌍이다.' },
  ],
};
