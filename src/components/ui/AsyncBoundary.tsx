import type { ReactNode } from 'react';
import type { AsyncStatus } from '@/lib/types';
import { toUserMessage } from '@/lib/errors';
import { Loading, type LoadingProps } from './Loading';
import { ErrorState } from './ErrorState';
import { EmptyState, type EmptyStateProps } from './EmptyState';

export interface AsyncBoundaryProps {
  status: AsyncStatus;
  error?: unknown;
  /** success인데 결과가 비었는지 — 부모가 판단해 넘긴다 */
  isEmpty?: boolean;
  onRetry?: () => void;
  loading?: LoadingProps;
  empty?: EmptyStateProps;
  children: ReactNode;
}

/** 로딩/에러/빈/성공 4분기를 한 곳에 — 모든 핵심 화면이 이 컴포넌트를 통과한다 */
export function AsyncBoundary({ status, error, isEmpty = false, onRetry, loading, empty, children }: AsyncBoundaryProps) {
  if (status === 'idle' || status === 'loading') return <Loading {...loading} />;
  if (status === 'error') return <ErrorState message={toUserMessage(error)} onRetry={onRetry} />;
  if (isEmpty) return <EmptyState {...empty} />;
  return <>{children}</>;
}
