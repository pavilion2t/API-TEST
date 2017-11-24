
/**
 * Order Correspondences Service
 * @exports Gateway/Stores/OrderCorrespondences
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class OrderCorrespondences {
  constructor(http) {
    this.http = http;

    this.list = this.list.bind(this);
  }
  /**
   * Get order correspondences for a Store.
   *
   * @example
   * client.gateway().store(1).orderCorrespondences.list({
   *   ... // Other query params
   * });
   * @param {Object} params - Query params
   * @param {string} params.page - Page number
   * @param {string} params.per_page - Per page
   * @param {string} params.shipping_method - Shipping method
   * @param {string} params.create_at - create at
   * @param {string} params.sales_page - Sales page
   * @returns {Object} Object.paging - paging
   * @returns {Array} Object.list - order correspondence array list.
   */
  async list(params) {
    const config = {
      normalizer: data => data.order_correspondences,
      parseLink: true,
    };
    const { data, headers } = await this.http.get(`/stores/${this.storeId}/order_correspondences`, params, config);
    return {
      paging: headers.link,
      list: data,
    };
  }
}

export default OrderCorrespondences;
