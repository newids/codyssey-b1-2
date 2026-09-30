import type { Note } from '../types';

// 처음 화면에 보여 줄 예시 메모 (실습 2부터 쓴다)
export const sampleNotes: Note[] = [
  {
    id: 1,
    title: '컴포넌트는 함수다',
    body: '화면의 한 조각을 돌려주는 함수를 컴포넌트라고 한다. 이름은 대문자로 시작한다. 큰 화면을 작은 컴포넌트로 나누면 같은 조각을 여러 곳에서 다시 쓸 수 있고, 고칠 때도 그 조각만 보면 된다.',
    isImportant: true,
  },
  {
    id: 2,
    title: 'props는 부모가 준다',
    body: '부모 컴포넌트가 자식에게 넘기는 값이다. 자식은 읽기만 하고 고치지 않는다. 같은 컴포넌트라도 props가 다르면 다른 내용을 보여 준다. 함수에 넘기는 인자와 같다고 생각하면 쉽다.',
    isImportant: false,
  },
  {
    id: 3,
    title: 'state가 바뀌면 다시 그린다',
    body: 'set 함수로 state를 바꾸면 React가 컴포넌트를 다시 실행해서 화면을 새로 계산한다. 화면의 요소를 직접 찾아서 고칠 필요가 없다. 우리는 state만 바꾸고, 화면은 React가 맞춰 준다.',
    isImportant: false,
  },
];
