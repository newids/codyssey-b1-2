/** Supabase/네트워크 에러를 사용자에게 보여줄 한 줄 문장으로 바꾼다. */
export function toUserMessage(error: unknown): string {
  if (!error) return '알 수 없는 오류가 발생했습니다.';
  const raw =
    typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : typeof error === 'object' && 'message' in error
          ? String((error as { message: unknown }).message)
          : '';

  if (/Failed to fetch|NetworkError|network/i.test(raw)) {
    return '네트워크 연결을 확인해 주세요. 요청에 실패했습니다.';
  }
  if (/row-level security|permission|not allowed|401|403|JWT/i.test(raw)) {
    return '권한이 없습니다. 로그인 상태를 확인해 주세요.';
  }
  if (/not found|PGRST116|0 rows/i.test(raw)) {
    return '요청한 데이터를 찾을 수 없습니다.';
  }
  return raw ? `요청에 실패했습니다. (${raw})` : '요청에 실패했습니다. 다시 시도해 주세요.';
}
