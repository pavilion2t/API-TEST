/**
 * Modifier Sets Service
 * @exports Main/Stores/ModifierSets
 * @class
 * @author Yori Zhao <yori.zhao@bindo.com>
 */
class ModifierSets {
  constructor(http) {
    this.http = http;
    this.list = this.list.bind(this);
    this.all = this.all.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Get ModifierSets.
   *
   * @example
   * const params = {
   *   page: 1,
   *   per_page: 15,
   * };
   * client.main().store(1).modifierSets.list(params);
   * @param {Object} params - Query params.
   * @param {string} params.page - Page.
   * @param {string} params.per_page - Per page
   * @returns {Object} Object.paging - paging.
   * @returns {Array} Object.list - ModifierSet List.
   */
  async list(params) {
    const config = {
      normalizer: data => data.modifier_sets,
      parseLink: true,
    };
    const { data, headers } = await this.http.get(`/stores/${this.storeId}/modifier_sets`, params, config);
    return {
      paging: headers.link,
      list: data,
    };
  }

  async all(params) {
    const config = {
      normalizer: data => data.modifier_set,
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/modifier_sets/106`, params, config);
    return data;
  }

  async delete() {
    const config = {
      normalizer: data => data.listing,
    };
    const { data } = await this.http.delete(`/stores/${this.storeId}/modifier_sets/${this.id}`, null, config);
    return data;
  }
}

export default ModifierSets;
