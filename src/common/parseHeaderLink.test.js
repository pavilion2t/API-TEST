import parseHeaderLink from './parseHeaderLink';
import Res from './Res';

describe('parse Link in response header', () => {
  test('parse', async () => {
    const paging = { page: 1, total_pages: 1 };
    const blob = new Blob([JSON.stringify({ hello: 'world' }, null, 2)], { type: 'application/json' });
    const init = {
      status: 200,
      statusText: 'Success',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-Custom-Header': 'custom-value',
        Link: JSON.stringify(paging),
      },
    };
    const fetchRes = new Response(blob, init);
    const res = await Res.parse(fetchRes);
    const link = parseHeaderLink(res.headers);
    expect(link).toMatchObject({
      page: 1,
      total_pages: 1,
    });
  });
});
