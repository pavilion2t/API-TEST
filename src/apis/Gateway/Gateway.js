import Stores from './Stores';
import BaseApi from '../BaseApi';

function getContext(version, env) {
  const useGoVersion = version.startsWith('go');
  const base = `/${version.replace('go', '')}`;

  if (!useGoVersion) {
    return {
      base,
      host: env === 'production' ? 'gateway.bindo.com' : 'gateway.trybindo.com',
    };
  }
  switch (env) {
    case 'dev':
      return { base, host: 'dev-gatewary.bindo.io' };
    case 'staging':
      return { base, host: 'try-gatewary.bindo.io' };
    case 'production':
      return { base, host: 'gatewary.bindo.io' };
    default:
      // Ignore
      break;
  }
  throw new Error(`Env: "${env}" unsupported.`);
}

/**
 * Gateway API
 * @module Gateway
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Gateway extends BaseApi {
  constructor(config, version, env) {
    super(config, getContext(version, env));
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
   *  Get Store service instance, with id.
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

export default Gateway;
