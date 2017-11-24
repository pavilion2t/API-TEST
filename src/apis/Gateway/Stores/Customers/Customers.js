/**
 * Customer Service
 * @exports Gateway/Stores/Customers
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Customers {
  constructor(http) {
    this.http = http;

    this.all = this.all.bind(this);
  }
  /**
   * Get Customers for a Store.
   *
   * @example
   * client.gateway().store(1).customers.all();
   * @returns {Array} All customers.
   */
  async all() {
    const config = {
      normalizer: ({ customers }) => customers,
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/customers`, null, config);
    return data;
  }
  /**
   * Get a Customer.
   *
   * @example
   * client.gateway().store(1).customer(1).get();
   * @returns {Object} Customer object.
   */
  async get() {
    const config = {
      normalizer: ({ customers }) => customers,
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/customers/${this.customerId}`, null, config);
    return data;
  }
}

export default Customers;
