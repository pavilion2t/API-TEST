/**
 * Customer Activity Service
 * @exports Main/Stores/Associates
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Associates {
  constructor(http) {
    this.http = http;

    this.all = this.all.bind(this);
  }
  /**
   * Get Associates for a Store.
   *
   * @example
   * const params = {
   *   with_deleted: true,
   * };
   * client.main().store(1).associates.all();
   * @param {Object} params - Query params
   * @param {bool} params.with_deleted - With deleted
   * @returns {Array} All associate.
   */
  async all(params) {
    const config = {
      normalizer: data => data.map(({ user }) => user),
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/associates`, params, config);
    return data;
  }
}

export default Associates;
