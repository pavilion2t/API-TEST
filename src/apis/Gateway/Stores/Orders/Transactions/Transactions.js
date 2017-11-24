/**
 * Transaction Service
 * @exports Gateway/Stores/Orders/Transactions
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Transactions {
  constructor(http) {
    this.http = http;

    this.processSignature = this.processSignature.bind(this);
  }
  /**
   * Process signature
   *
   * @example
   * client.gateway().store(1).order('123456').transaction(1).processSignature({
   *   signature_data: '...' // Image Base64 String
   * });
   * @param {Object} data - Signature data
   * @returns {Object} Order object
   */
  async processSignature(data) {
    const config = {};
    const response = await this.http.post(`/stores/${this.storeId}/orders/${this.orderNumber}/transactions/${this.transactionId}/process_signature`, null, data, config);
    return response.data;
  }
}

export default Transactions;
