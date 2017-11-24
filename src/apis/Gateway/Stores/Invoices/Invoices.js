import Transactions from './Transactions';
/**
 * Invoice Service
 * @exports Gateway/Stores/Invoices
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Invoices {
  constructor(http) {
    this.http = http;

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.void = this.void.bind(this);
    this.pay = this.pay.bind(this);
    this.get = this.get.bind(this);
  }
  /**
   * Create a Invoice.
   *
   * @example
   * client.gateway().store(1).invoices.create({
   *   order: {
   *     ...
   *   },
   * });
   * @param {Object} data - Order data.
   * @returns {Object} Order object.
   */
  async create(data) {
    const config = {
      normalizer: ({ invoice }) => invoice,
    };
    const response = await this.http.post(`/stores/${this.storeId}/invoices`, null, data, config);
    return response.data;
  }
  /**
   * Get a Invoice.
   *
   * @example
   * const params = {
   *   includes_voided: true,
   * };
   * client.gateway().store(1).invoice('123456').get(params);
   * @param {Object} params - Query params
   * @param {Object} params.includes_voided - Include voided transactions
   * @returns {Object} Order object.
   * @author Leo Li <leo.li@bindo.com>
   * @author Jerry.Luo <jerry.luo@bindo.com>
   */
  async get(params) {
    const config = {
      normalizer: ({ invoice }) => invoice,
    };
    const response = await this.http.get(`/stores/${this.storeId}/invoices/${this.orderNumber}`, params, config);
    return response.data;
  }
  /**
   * Update a Invoice.
   *
   * @example
   * client.gateway().store(1).invoice('123456').update({
   *   order: {
   *     ...
   *   },
   * });
   * @param {Object} data - Order data.
   * @returns {Object} Order object.
   */
  async update(data) {
    const config = {
      normalizer: ({ invoice }) => invoice,
    };
    const response = await this.http.put(`/stores/${this.storeId}/invoices/${this.orderNumber}`, null, data, config);
    return response.data;
  }
  /**
   * Void a Invoice.
   *
   * @example
   * client.gateway().store(1).invoice('123456').void({
   *   reason: 'System Test',
   * });
   * @param {Object} data - Order data.
   * @returns {Object} Order object.
   */
  async void(data) {
    const config = {
      normalizer: ({ invoice }) => invoice,
    };
    const response = await this.http.post(`/stores/${this.storeId}/invoices/${this.orderNumber}/void`, null, data, config);
    return response.data;
  }
  /**
   * Pay a Invoice.
   *
   * Note: Must add `X-USER-DEVICE-TYPE` = 'pos' to headers
   *
   * @example
   * client.gateway().store(1).invoice('123456').pay({
   *   ...
   * });
   * @param {Object} body - Order data.
   * @returns {Object} Order object.
   */
  async pay(body) {
    const config = {
      normalizer: ({ invoice }) => invoice,
    };
    const response = await this.http.post(`/stores/${this.storeId}/invoices/${this.orderNumber}/pay`, null, body, config);
    return response.data;
  }
  /**
   * Invoice returns.
   *
   * Note: Must add `X-USER-DEVICE-TYPE` = 'pos' to headers
   *
   * @example
   * client.gateway().store(1).invoice('123456').returns({
   *   "return": {
   *     "transactions_to_be_refunded": [
   *       {
   *         "transaction_id": 0,
   *         "amount": 0
   *       }
   *     ]
   *   }
   * });
   * @param {Object} data - Returns data.
   * @returns {Object} Order object.
   */
  async returns(data) {
    const config = {
      normalizer: ({ order }) => order,
    };
    const response = await this.http.post(`/stores/${this.storeId}/invoices/${this.orderNumber}/returns`, null, data, config);
    return response.data;
  }
  /**
   * Get transactions service instance.
   *
   * @example
   * // ...
   * @returns {Transactions} Transactions service.
   * @author Jerry.Luo <jerry.luo@bindo.com>
   */
  get transactions() {
    return this.transaction();
  }
  /**
   * Get transactions service instance with id.
   *
   * @example
   * // ...
   * @param {number} id - Transaction id.
   * @returns {Transactions} transactions service with id.
   * @author Jerry.Luo <jerry.luo@bindo.com>
   */
  transaction(id) {
    if (!this.transactionService) {
      this.transactionService = new Transactions(this.http);
    }
    this.transactionService.storeId = this.storeId;
    this.transactionService.orderNumber = this.orderNumber;
    this.transactionService.transactionId = id;
    return this.transactionService;
  }
}

export default Invoices;
