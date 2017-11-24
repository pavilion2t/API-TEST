/**
 * GiftCard Service
 * @exports Gateway/Stores/GiftCards
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class GiftCards {
  constructor(http) {
    this.http = http;

    this.verify = this.verify.bind(this);
  }
  /**
   * Verify gift card are available.
   *
   * @example
   * // ...
   * @param {Object} data - Gift card info.
   * @returns {Object} Verify result.
   */
  async verify(data) {
    const response = await this.http.post(`/stores/${this.storeId}/gift_cards/verify`, null, data);
    return response.data;
  }
}

export default GiftCards;
