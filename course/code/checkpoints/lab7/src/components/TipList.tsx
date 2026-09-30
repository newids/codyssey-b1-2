import { useEffect, useState } from 'react';
import { fetchTips } from '../api/tips';
import type { Tip } from '../types';

type Status = 'loading' | 'success' | 'error';

// 주소를 '/tips-empty.json' 으로 바꾸면 빈 상태를,
// '/tips-wrong.json' 처럼 없는 주소로 바꾸면 에러 상태를 볼 수 있다.
const TIPS_URL = '/tips.json';

export default function TipList() {
  const [status, setStatus] = useState<Status>('loading');
  const [tips, setTips] = useState<Tip[]>([]);
  // 도전 과제(실습 7): 다시 시도
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // 응답이 오기 전에 이 컴포넌트가 사라지거나 요청을 다시 보내면 이전 응답은 무시한다.
    let isCancelled = false;

    fetchTips(TIPS_URL)
      .then((data) => {
        if (isCancelled) return;
        setTips(data);
        setStatus('success');
      })
      .catch((error: unknown) => {
        if (isCancelled) return;
        console.error('팁을 불러오지 못했습니다.', error);
        setStatus('error');
      });

    return () => {
      isCancelled = true;
    };
  }, [retryCount]);

  function handleRetry() {
    setStatus('loading');
    setRetryCount(retryCount + 1);
  }

  return (
    <section className="tips">
      <h2 className="tips-title">오늘의 React 팁</h2>

      {status === 'loading' && (
        <p className="state" role="status">
          불러오는 중…
        </p>
      )}

      {status === 'error' && (
        <div className="state is-error" role="alert">
          <p>팁을 불러오지 못했습니다.</p>
          <button type="button" className="btn" onClick={handleRetry}>
            다시 시도
          </button>
        </div>
      )}

      {status === 'success' && tips.length === 0 && (
        <p className="state">아직 등록된 팁이 없습니다.</p>
      )}

      {status === 'success' && tips.length > 0 && (
        <ul className="tip-list">
          {tips.map((tip) => (
            <li key={tip.id} className="tip-item">
              <strong>{tip.title}</strong>
              <span>{tip.summary}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
