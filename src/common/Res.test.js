import Res from './Res';

test('Response init correctly', async () => {
  const blob = new Blob([JSON.stringify({ hello: 'world' }, null, 2)]);
  const init = {
    status: 200,
    statusText: 'Success',
  };
  const fetchRes = new Response(blob, init);
  const response = await Res.parse(fetchRes);
  expect(response.data).toEqual({ hello: 'world' });
  expect(response.status).toBe(200);
  expect(response.statusText).toBe('Success');
  expect(response.headers).toEqual({});
});

test('Response get headers correctly', async () => {
  const blob = new Blob([JSON.stringify({ hello: 'world' }, null, 2)], { type: 'application/json' });
  const init = {
    status: 200,
    statusText: 'Success',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-Custom-Header': 'custom-value',
    },
  };
  const fetchRes = new Response(blob, init);
  const response = await Res.parse(fetchRes);
  expect(response.headers).toEqual({
    'content-type': 'application/json;charset=utf-8',
    'x-custom-header': 'custom-value',
  });
});
