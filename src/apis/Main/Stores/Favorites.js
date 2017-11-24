/**
 * Favorite Service
 * @exports Main/Stores/Favorites
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Favorites {
  constructor(http) {
    this.http = http;

    this.list = this.list.bind(this);
  }
  /**
   * Get Favorites for a Store.
   *
   * @example
   * const params = {
   *   page: 1,
   *   per_page: 15,
   * };
   * client.main().store(1).favorites.list(params);
   * @param {Object} params - Query params.
   * @param {string} params.page - Page.
   * @param {string} params.per_page - Per page
   * @returns {Array} Favorite List.
   */
  async list(params) {
    const config = {
      normalizer: data => data.map(({ favorite }) => favorite),
      parseLink: true,
    };
    const { data, headers } = await this.http.get(`/stores/${this.storeId}/favorites`, params, config);
    return {
      paging: headers.link,
      list: data,
    };
  }
}

export default Favorites;
