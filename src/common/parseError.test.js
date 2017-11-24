import parseError from './parseError';

test('parse error with response', async () => {
  const blob = new Blob([JSON.stringify({ message: 'error' }, null, 2)], { type: 'application/json' });
  const init = {
    status: 503,
    statusText: 'Fail',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-Custom-Header': 'custom-value',
    },
  };
  const fetchReq = { url: 'https://xxx.com/request/path' };
  const fetchRes = new Response(blob, init);
  const e = await parseError(fetchReq, fetchRes);
  expect(e.response).toMatchObject({
    data: { message: 'error' },
  });
  expect(e.message).toBe('error');
  expect(e.request).toBe(fetchReq);
});
