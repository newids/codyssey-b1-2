// 이 앱에서 다루는 데이터의 "모양"을 적어 둔 파일.
// TypeScript는 이 모양과 다른 데이터를 쓰면 실행하기 전에 알려 준다.

/** 메모 하나 */
export type Note = {
  id: number;
  title: string;
  body: string;
  isImportant: boolean;
};

/** 오늘의 React 팁 하나 (3일 차 실습 7에서 쓴다) */
export type Tip = {
  id: number;
  title: string;
  summary: string;
};
