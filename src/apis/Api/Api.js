import BaseApi from '../BaseApi';
import Stores from './Stores';

function getContext(version, env) {
  const useGoVersion = version.startsWith('go');

  if (!useGoVersion) {
    return {
      host: env === 'production' ? 'api.bindo.com' : 'api.trybindo.com',
    };
  }
  switch (env) {
    case 'dev':
      return { host: 'dev-api.bindo.io' };
    case 'staging':
      return { host: 'try-api.bindo.io' };
    case 'production':
      return { host: 'api.bindo.io' };
    default:
      // Ignore
      break;
  }
  throw new Error(`Env: "${env}" unsupported.`);
}

/**
 * Api(secondary domain, e.g. api.domain.com) API
 * @module Api
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Api extends BaseApi {
  constructor(config, version, env) {
    super(config, getContext(version, env));
  }
  setOnRequest(onRequest) {
    this.http.setOnRequest(onRequest);
  }
  /**
   * Get Store service instance.
   *
   * @example
   * // ...
   * @returns {Stores} Store service.
   */
  get stores() {
    return this.store();
  }
  /**
   * Get Store service instance, with id.
   *
   * @example
   * // ...
   * @param {number} id - Store id.
   * @returns {Stores} Store service with id.
   */
  store(id) {
    if (!this.storeService) {
      this.storeService = new Stores(this.http);
    }
    this.storeService.storeId = id;
    return this.storeService;
  }
}

export default Api;
