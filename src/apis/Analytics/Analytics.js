import Stores from './Stores';
import BaseApi from '../BaseApi';

function getContext(version, env) {
  const useGoVersion = version.startsWith('go');
  const base = `/${version.replace('go', '')}`;

  if (!useGoVersion) {
    return {
      base,
      host: env === 'production' ? 'analytics.bindo.com' : 'analytics.trybindo.com',
    };
  }
  switch (env) {
    case 'dev':
      return { base, host: 'dev-analytics.bindo.io' };
    case 'staging':
      return { base, host: 'try-analytics.bindo.io' };
    case 'production':
      return { base, host: 'analytics.bindo.io' };
    default:
      // Ignore
      break;
  }
  throw new Error(`Env: "${env}" unsupported.`);
}

/**
 * Analytics API
 * @module Analytics
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Analytics extends BaseApi {
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

export default Analytics;
