import Client from './index';
import { Context } from './common';
import { Main, Gateway, Api } from './apis';

jest.mock('./common');

test('client initialize correctly', () => {
  const onSuccess = () => {};
  const onError = () => {};
  const onRequest = () => {};
  const camelize = true;
  const client = new Client({
    onSuccess,
    onError,
    onRequest,
    camelize,
  });
  expect(client.config).toEqual({
    onSuccess,
    onError,
    onRequest,
    camelize,
  });
});

test('client setOnRequest forwards to HttpClient instances', () => {
  const onRequest = () => {};
  const client = new Client();
  client.main();
  client.setOnRequest(onRequest);
  expect(client.main().http.setOnRequest.mock.calls[0][0]).toBe(onRequest);
});

test('client lazy init services', () => {
  Context.mockClear();
  const client = new Client();
  expect(client.main()).toBeInstanceOf(Main);

  expect(client.gateway()).toBeInstanceOf(Gateway);

  expect(client.api()).toBeInstanceOf(Api);
});

describe('client.main receive different versions', () => {
  const client = new Client();
  beforeEach(() => {
    Context.mockClear();
  });
  test('client.main default as v2 api', () => {
    client.main();
    expect(Context.mock.calls[0][0].base).toBe('/api/v2');
  });
  test('client.main v1 set base as /api/v1', () => {
    client.main('v1');
    expect(Context.mock.calls[0][0].base).toBe('/api/v1');
  });
});
