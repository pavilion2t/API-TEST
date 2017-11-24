/**
 * Customer Service
 * @exports Analytics/Stores/Customers
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Customers {
  constructor(http) {
    this.http = http;
  }
  /**
   * Get Customer highlights.
   *
   * @example
   * client.analytics().store(1).customer(1).highlights();
   * @returns {Object} Customer reward status object.
   */
  async highlights() {
    const { data } = await this.http.get(`/stores/${this.storeId}/customers/${this.customerId}/customer_highlight`);
    return data;
  }
  /**
   * Get Customer reward status
   *
   * @example
   * client.analytics().store(1).customer(1).rewardStatus();
   * @returns {Object} Customer reward status object.
   */
  async rewardStatus() {
    const { data } = await this.http.get(`/stores/${this.storeId}/customers/${this.customerId}/reward_status`);
    return data;
  }
}

export default Customers;
