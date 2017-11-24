/**
 * FavoriteTabs Service
 * @exports Main/Stores/FavoriteTabs
 * @class
 * @author Yori Zhao <yori.zhao@bindo.com>
 */
class FavoriteTabs {
  constructor(http) {
    this.http = http;
    this.list = this.list.bind(this);
  }

  /**
   * Get FavoriteTabs.
   *
   * @example
   * const params = {
   *   page: 1,
   *   per_page: 15,
   *   with_details: true
   * };
   * client.main().store(1).favoriteTabs.list(params);
   * @param {Object} params - Query params.
   * @param {string} params.page - Page.
   * @param {string} params.per_page - Per page
   * @param {string} params.with_details - FavoriteTab details info
   * @returns {Object} Object.paging - paging.
   * @returns {Array} Object.list - FavoriteTab List.
   */
  async list(params) {
    const config = {
      normalizer: data => data.map(({ favorite_tab: favoriteTab }) => favoriteTab),
      parseLink: true,
    };
    const { data, headers } = await this.http.get(`/stores/${this.storeId}/favorite_tabs`, params, config);
    return {
      paging: headers.link,
      list: data,
    };
  }
}

export default FavoriteTabs;
