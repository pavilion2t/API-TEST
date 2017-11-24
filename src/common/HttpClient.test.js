import Client from './HttpClient';
import Context from './Context';
import Res from './Res';
import parseHeaderLink from './parseHeaderLink';

jest.unmock('./HttpClient');
jest.mock('./parseHeaderLink');

const context = new Context({
  schema: 'https',
  host: 'trybindo.com',
  base: '/api/v2',
});

describe('request', () => {
  test('when success return response', async () => {
    const response = {
      user: {
        access_token: 'mock_token_here',
        belongs_to_courier: false,
        belongs_to_internal: false,
        belongs_to_reseller: false,
        email: 'green.qu@bindo.com',
        full_name: 'Green Qu',
        id: 11159,
        is_admin: false,
        is_inventory_manager: false,
        is_staff: false,
        name: 'Green Q.',
      },
    };
    fetch.mockResponseOnce(JSON.stringify(response), { status: 200 });

    expect.assertions(2);
    const client = new Client(context);
    const res = await client.request('/login', { a: 1 }, {
      method: 'POST',
      body: {
        username: 'green.qu@bindo.com',
        password: 'bindo123',
      },
    });
    expect(res.data).toEqual(response);
    expect(fetch.mock.calls).toEqual([[
      'https://trybindo.com/api/v2/login?a=1',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'green.qu@bindo.com',
          password: 'bindo123',
        }),
      },
    ]]);
  });

  test('when request fail, throw an Error', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: '401 Unauthorized' }), {
      status: 401,
      statusText: 'Unauthorized',
    });
    const client = new Client(context);

    expect.assertions(1);
    try {
      await client.request('/login');
    } catch (e) {
      expect(e.response.data).toEqual({ message: '401 Unauthorized' });
    }
  });

  test('config.parseLink triggers parseHeaderLink call', async () => {
    const response = {};
    fetch.mockResponseOnce(JSON.stringify(response), { status: 200 });
    const http = new Client(context);
    await http.request('/', null, {}, { parseLink: true });
    expect(parseHeaderLink.mock.calls.length).toBe(1);
  });
});

describe('interceptors', () => {
  test('onSuccess interceptor invoked when request success', async () => {
    const onSuccess = jest.fn();
    fetch.mockResponseOnce(JSON.stringify({ hello: 'test onSuccess' }), { status: 200 });
    const client = new Client(context, { onSuccess });
    await client.request();
    expect(onSuccess.mock.calls.length).toBe(1);
    expect(onSuccess.mock.calls[0][0]).toBeInstanceOf(Res);
  });
  test('onError interceptor invoked when request fail', async () => {
    const onError = jest.fn();
    fetch.mockResponseOnce(JSON.stringify({ message: 'error' }), { status: 404 });
    const client = new Client(context, { onError });
    try {
      await client.request();
    } catch (err) {
      expect(onError.mock.calls.length).toBe(1);
      expect(onError.mock.calls[0][0]).toMatchObject({
        message: 'error',
      });
    }
  });
  test('onRequest interceptor invoked when request about to emit', async () => {
    const onRequest = jest.fn();
    onRequest.mockReturnValue({
      url: 'https://trybindo.com/api/v2',
      options: {},
    });
    fetch.mockResponseOnce(JSON.stringify({ hello: 'world' }), { status: 200 });
    const client = new Client(context, { onRequest });
    await client.request();
    expect(onRequest.mock.calls.length).toBe(1);
  });
});

describe('stringify params', () => {
  test('basic correctly', () => {
    let params = { a: 1, b: 'c' };
    expect(Client.strParams(params)).toBe('?a=1&b=c');

    params = {};
    expect(Client.strParams(params)).toBe('');
  });
  test('null or undefined value omitted', () => {
    let e;
    const params = {
      a: 1, b: 'c', d: null, e,
    };
    expect(Client.strParams(params)).toBe('?a=1&b=c');
  });
  test('array values', () => {
    const params = { a: [1, 2], x: [] };
    expect(Client.strParams(params)).toBe('?a[]=1&a[]=2');
  });
});
