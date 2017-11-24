/**
 * Table Service
 * @exports Gateway/Stores/Tables
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Tables {
  constructor(http) {
    this.http = http;

    this.all = this.all.bind(this);
  }
  /**
   * Get Tables for a Store.
   *
   * @example
   * const params = {
   *   last_updated_at: '2017-05-20T11:31:17+08:00'
   * };
   * client.gateway().store(1).tables.all(params);
   * @param {Object} params - Query params.
   * @returns {Array} Table List.
   */
  async all(params) {
    const config = {
      normalizer: data => data.map(({ table }) => table),
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/tables`, params, config);
    return data;
  }
}

export default Tables;
