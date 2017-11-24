/**
 * Transaction Service
 * @exports Gateway/Stores/Invoices/Transactions
 * @class
 * @author Jerry.Luo <jerry.luo@bindo.com>
 */
class Transactions {
  constructor(http) {
    this.http = http;
    this.addTips = this.addTips.bind(this);
    this.void = this.void.bind(this);
  }
  /**
   * Transaction Add Tips
   *
   * @author Jerry.Luo <jerry.luo@bindo.com>
   * @example
   * const data = {
   *   transaction: {
   *     tips_amount: 3,
   *   },
   * };
   * client.gateway().store(1).invoice('123456').transaction(1).addTips(data);
   * @param {Object} data - Tips data
   * ```
   * {
   *   transaction: {
   *     tips_amount: 3,
   *   },
   * };
   * ```
   * @returns {Object} object.
   */
  async addTips(data) {
    const config = {
      normalizer: ({ transaction }) => transaction,
    };
    const { transactionId } = this;
    const response = await this.http.put(`/stores/${this.storeId}/invoices/${this.orderNumber}/transactions/${transactionId}`, null, data, config);
    return response.data;
  }
  /**
   * Transaction void
   *
   * @author Jerry.Luo <jerry.luo@bindo.com>
   * @example
   * client.gateway().store(1).invoice('123456').transaction(1).void();
   */
  async void() {
    const config = {
      normalizer: ({ transaction }) => transaction,
    };
    const { transactionId } = this;
    const response = await this.http.put(`/stores/${this.storeId}/invoices/${this.orderNumber}/transactions/${transactionId}/void`, null, config);
    return response.data;
  }
}

export default Transactions;
