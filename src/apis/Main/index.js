import BaseApi from '../BaseApi';
import Stores from './Stores';
import Product from './Product';

function getContext(version, env) {
  const useGoVersion = version.startsWith('go');
  const base = `/api/${version.replace('go', '')}`;

  if (!useGoVersion) {
    return {
      base,
      host: env === 'production' ? 'bindo.com' : 'trybindo.com',
    };
  }
  switch (env) {
    case 'dev':
      return { base, host: 'dev-main.bindo.io' };
    case 'staging':
      return { base, host: 'try-main.bindo.io' };
    case 'production':
      return { base, host: 'main.bindo.io' };
    default:
      // Ignore
      break;
  }
  throw new Error(`Env: "${env}" unsupported.`);
}


/**
 * Main API
 * @exports Main
 * @class
 * @author Green Qu <green.qu@bindo.com>
 */
class Main extends BaseApi {
  constructor(config, version, env) {
    super(config, getContext(version, env));

    this.login = this.login.bind(this);
    this.store = this.store.bind(this);
  }
  /**
   * @example
   * client.main().login({
   *   client_id: '...',
   *   client_secret: '...',
   *   username: 'xxx@bindo.com',
   *   password: 'bindo000',
   *   grant_type: 'password',
   * });
   * @param {Object} params - Login params.
   * @param {string} params.client_id - Client id (generate by backend team).
   * @param {string} params.client_secret - Client secret (generate by backend team).
   * @param {string} params.username - Username (Bindo ID / Email).
   * @param {string} params.password - Password.
   * @param {string} params.grant_type - Grant type (please use `password`).
   * @returns {Object} User object.
   */
  async login(params) {
    const config = {
      normalizer: ({ user }) => user,
    };
    const { data } = await this.http.post('/login', null, params, config);
    return data;
  }
  /**
   * @example
   * client.main().forgotPassword({
   *   client_id: '...',
   *   client_secret: '...',
   *   identifier: 'xxx@bindo.com',
   * });
   * @param {Object} params - Forgot password params.
   * @param {string} params.client_id - Client id (generate by backend team).
   * @param {string} params.client_secret - Client secret (generate by backend team).
   * @param {string} params.identifier - Identifier (Bindo ID / Email).
   */
  async forgotPassword(params) {
    const { data } = await this.http.get('/forgot_password', params);
    return data;
  }
  /**
   * Get store instance in plurality mode.
   *
   * @example
   * // ...
   * @type {Stores}
   * @see module:Main/Stores~Stores
   */
  get stores() {
    return this.store();
  }
  /**
   * Get store instance in singular mode, with id.
   *
   * @example
   * // ...
   * @param {number | Array<number>} id - Store id.
   * @returns {Store} Store service instance.
   */
  store(id) {
    if (!this.storeInstance) {
      this.storeInstance = new Stores(this.http);
    }
    if (Array.isArray(id)) { id = id.join(','); }
    this.storeInstance.storeId = id;
    return this.storeInstance;
  }
  /**
   * Get product service.
   *
   * @example
   * // ...
   * @type {Product}
   * @see module:Main/Product~Product
   */
  get products() {
    if (!this.productService) {
      this.productService = new Product(this.http);
    }
    return this.productService;
  }
}

export default Main;
