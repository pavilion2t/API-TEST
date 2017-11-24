import Main from './index';
import BaseApi from '../BaseApi';
import Stores from './Stores';
import Product from './Product';

jest.mock('../BaseApi');
const httpConfig = {};
const env = 'staging';
let main;

describe('Main initialize', () => {
  test('version v2 config', () => {
    main = new Main(httpConfig, 'v2', env);
    expect(BaseApi).lastCalledWith(httpConfig, {
      host: 'trybindo.com',
      base: '/api/v2',
    });
  });
  test('version go config', () => {
    main = new Main(httpConfig, 'gov2', env);
    expect(BaseApi).lastCalledWith(httpConfig, {
      host: 'try-main.bindo.io',
      base: '/api/v2',
    });
  });
  test('set http and bind login', () => {
    const mockLogin = jest.spyOn(Main.prototype, 'login').mockImplementation(() => {});
    main = new Main(httpConfig, 'v2', env);
    main.login.call();
    expect(mockLogin.mock.instances[0]).toBe(main);
    mockLogin.mockRestore();
  });
});

describe('Main features', () => {
  beforeEach(() => {
    main = new Main(httpConfig, 'v2', env);
  });

  test('main.login', () => {
    main.http.post.mockReturnValueOnce(Promise.resolve({}));
    const data = {
      username: 'xxx',
      password: '123456',
    };
    main.login(data);
    const res = {
      user: {
        name: 'x',
      },
    };
    expect(main.http).toMatchAPI(['post', '/login', null, data, {
      res,
      result: { name: 'x' },
    }]);
  });

  test('main.forgotPassword', () => {
    main.http.get.mockReturnValueOnce(Promise.resolve({}));
    const data = {};
    main.forgotPassword(data);
    expect(main.http).toMatchAPI(['get', '/forgot_password', data]);
  });

  test('main.stores', () => {
    expect(main.stores).toBeInstanceOf(Stores);
    expect(main.stores.storeId).toBe(undefined);
  });

  test('main.store(id)', () => {
    const store = main.store(1);
    expect(store).toBeInstanceOf(Stores);
    expect(store.storeId).toBe(1);
  });

  test('main.products', () => {
    expect(main.products).toBeInstanceOf(Product);
  });
});
