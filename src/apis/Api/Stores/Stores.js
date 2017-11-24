import Reports from './Reports';

/**
 * Store Service
 * @exports Api/Stores
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Stores {
  constructor(http) {
    this.http = http;
  }
  /**
   * Get report service instance.
   *
   * @example
   * // ...
   * @returns {Reports} Report service.
   */
  get reports() {
    const reportService = new Reports(this.http);
    reportService.storeId = this.storeId;
    return reportService;
  }
}

export default Stores;
