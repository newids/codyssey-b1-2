import { describe, expect, it } from 'vitest';
import { createNoncePair } from '../google';

describe('createNoncePair', () => {
  it('64자 hex nonce 와 그 SHA-256 해시를 돌려준다', async () => {
    const { nonce, hashedNonce } = await createNoncePair();
    expect(nonce).toMatch(/^[0-9a-f]{64}$/);
    expect(hashedNonce).toMatch(/^[0-9a-f]{64}$/);
    expect(hashedNonce).not.toBe(nonce);
  });
  it('호출마다 다른 nonce 를 만든다', async () => {
    const a = await createNoncePair();
    const b = await createNoncePair();
    expect(a.nonce).not.toBe(b.nonce);
  });
});
