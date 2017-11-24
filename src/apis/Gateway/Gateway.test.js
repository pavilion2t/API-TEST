import Gateway from './Gateway';
import BaseApi from '../BaseApi';
import Stores from './Stores';

jest.mock('../BaseApi');
const httpConfig = {};
const env = 'staging';
let gateway;

describe('Gateway initialize', () => {
  test('version v2', () => {
    gateway = new Gateway(httpConfig, 'v2', env);
    expect(BaseApi).lastCalledWith(httpConfig, {
      host: 'gateway.trybindo.com',
      base: '/v2',
    });
  });
  test('version go', () => {
    gateway = new Gateway(httpConfig, 'gov2', env);
    expect(BaseApi).lastCalledWith(httpConfig, {
      host: 'try-gatewary.bindo.io',
      base: '/v2',
    });
  });
});

describe('Gateway features', () => {
  beforeEach(() => {
    gateway = new Gateway(httpConfig, 'v2', env);
  });

  test('gateway.stores', () => {
    expect(gateway.stores).toBeInstanceOf(Stores);
    expect(gateway.stores.storeId).toBe(undefined);
  });

  test('gateway.store(id)', () => {
    const store = gateway.store(1);
    expect(store).toBeInstanceOf(Stores);
    expect(store.storeId).toBe(1);
  });
});
