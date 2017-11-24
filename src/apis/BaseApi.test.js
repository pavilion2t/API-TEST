import BaseApi from './BaseApi';
import { HttpClient, Context } from '../common';

jest.mock('../common');

const httpConfig = {};
const contextConfig = {};
const baseApi = new BaseApi(httpConfig, contextConfig);

test('BaseApi initialize correctly', () => {
  expect(Context.mock.calls[0][0]).toBe(contextConfig);
  expect(HttpClient.mock.calls[0]).toEqual([Context.mock.instances[0], httpConfig]);
  expect(baseApi.http).toBe(HttpClient.mock.instances[0]);
});

test('baseApi.setOnRequest forward setOnRequest to http', () => {
  const onRequest = jest.fn();
  baseApi.setOnRequest(onRequest);
  expect(baseApi.http.setOnRequest.mock.calls[0][0]).toBe(onRequest);
});
