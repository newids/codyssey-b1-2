import { useCallback, useEffect, useState } from 'react';
import type { AsyncStatus } from '@/lib/types';

export interface AsyncState<T> {
  status: AsyncStatus;
  data: T;
  error: unknown;
  refetch: () => void;
}

/**
 * 모든 조회 흐름의 뼈대. fetcher의 참조가 바뀌면 다시 요청한다.
 * cleanup의 cancelled 플래그로 "떠난 화면"에 늦은 응답이 반영되는 것을 막는다.
 */
export function useAsync<T>(fetcher: () => Promise<T>, initialData: T, enabled = true): AsyncState<T> {
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState<unknown>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setStatus('idle');
      return;
    }
    let cancelled = false;
    setStatus('loading');
    setError(null);
    fetcher()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setStatus('success');
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err);
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [fetcher, enabled, tick]);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  return { status, data, error, refetch };
}
