/**
 * Party Service
 * @exports Gateway/Stores/Parties
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Parties {
  constructor(http) {
    this.http = http;

    this.all = this.all.bind(this);
    this.update = this.update.bind(this);
    this.clear = this.clear.bind(this);
  }
  /**
   * Get Parties for a Store.
   *
   * @example
   * // ...
   * @returns {Array} All party.
   */
  async all() {
    const config = {
      normalizer: ({ parties }) => parties,
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/parties`, null, config);
    return data;
  }

  /**
   * Get Parties.
   *
   * @example
   * const params = {
   *   page: 1,
   *   per_page: 15,
   * };
   * client.gateway().store(1).parties.list(params);
   * @param {Object} params - Query params.
   * @param {string} params.page - Page.
   * @param {string} params.per_page - Per page
   * @returns {Object} Object.paging - paging.
   * @returns {Array} Object.list - Parties List.
   */
  async list(params) {
    const config = {
      normalizer: ({ parties }) => parties,
      parseLink: true,
    };
    const { data, headers } = await this.http.get(`/stores/${this.storeId}/parties`, params, config);
    return {
      paging: headers.link,
      list: data,
    };
  }
  /**
   * Update a Party.
   *
   * @example
   * // ...
   * @param {Object} params - Party data.
   */
  async update(params) {
    const { data } = await this.http.put(`/stores/${this.storeId}/parties/${this.partyId}`, params);
    return data;
  }
  /**
   * Clear a Party.
   *
   * @example
   * client.gateway().store(1).party(111111).clear();
   * @returns {Object} party info.
   * @author Yori Zhao <yori.zhao@bindo.com>.
   */
  async clear() {
    const { data } = await this.http.put(`/stores/${this.storeId}/parties/${this.partyId}/clear`);
    return data;
  }
}

export default Parties;
