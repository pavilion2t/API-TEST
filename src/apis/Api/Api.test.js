import Api from './Api';
import BaseApi from '../BaseApi';
import Stores from './Stores';

jest.mock('../BaseApi');
const httpConfig = {};
const env = 'staging';
let api;

describe('Api initialize', () => {
  test('version v2', () => {
    api = new Api(httpConfig, '', env);
    expect(BaseApi).lastCalledWith(httpConfig, {
      host: 'api.trybindo.com',
    });
  });
  test('version go', () => {
    api = new Api(httpConfig, 'go', env);
    expect(BaseApi).lastCalledWith(httpConfig, {
      host: 'try-api.bindo.io',
    });
  });
});

describe('Api features', () => {
  beforeEach(() => {
    api = new Api(httpConfig, '', env);
  });

  test('api.stores', () => {
    expect(api.stores).toBeInstanceOf(Stores);
    expect(api.stores.storeId).toBe(undefined);
  });

  test('api.store(id)', () => {
    const store = api.store(1);
    expect(store).toBeInstanceOf(Stores);
    expect(store.storeId).toBe(1);
  });
});
