import { useEffect, useState } from 'react';

/** 검색어처럼 빠르게 바뀌는 값을 delay ms 뒤에 반영 — 요청 횟수를 줄인다 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
