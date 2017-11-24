/**
 * Discount Service
 * @exports Gateway/Stores/Discounts
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Discounts {
  constructor(http) {
    this.http = http;

    this.all = this.all.bind(this);
  }
  /**
   * Get Discounts for a Store.
   *
   * @example
   * const params = {
   *   last_updated_at: '2017-05-20T11:31:17+08:00'
   * }
   * client.gateway().store(1).discounts.all(params);
   * @param {Object} params - Query params.
   * @returns {Array} All discounts.
   */
  async all(params) {
    const config = {
      normalizer: data => data.map(({ discount }) => discount),
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/discounts`, params, config);
    return data;
  }
}

export default Discounts;
