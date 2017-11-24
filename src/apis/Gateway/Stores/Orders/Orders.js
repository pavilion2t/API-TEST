import Recipients from './Recipients/index';
import Transactions from './Transactions/index';

/**
 * Order Service
 * @exports Gateway/Stores/Orders
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Orders {
  constructor(http) {
    this.http = http;

    this.create = this.create.bind(this);
  }
  /**
   * Create a Order and pay
   *
   * Note: Must add `X-USER-DEVICE-TYPE` = 'pos' to headers
   *
   * @example
   * client.gateway().store(storeId).orders.create({
   *   ... // Order and payment data
   * });
   * @param {Object} data - Order and payment data.
   * @returns {Object} Order object.
   */
  async create(data) {
    const config = {
      normalizer: ({ order }) => order,
    };
    const response = await this.http.post(`/stores/${this.storeId}/orders`, null, data, config);
    return response.data;
  }
  /**
   * Get Orders(correspondence) for a Store.
   *
   * @deprecated Please use `client.gateway().store(1).orderCorrespondences.list();`
   * @example
   * // ...
   * @param {Object} params - query params
   * @param {string} params.page - page number
   * @param {string} params.per_page - data per page
   * @returns {Object} Object.paging - paging.
   * @returns {Array} Object.list - correspondence array list.
   */
  async correspondences(params) {
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
  /**
   * Get recipients service instance.
   *
   * @example
   * // ...
   * @returns {Recipients} Recipients service.
   * @author Yori Zhao <yori.zhao@bindo.com>
   */
  get recipients() {
    return this.recipient();
  }
  /**
   * Get recipients service instance with id.
   *
   * @example
   * // ...
   * @param {number} id - recipient id.
   * @returns {Recipients} recipients service with id.
   * @author Yori Zhao <yori.zhao@bindo.com>
   */
  recipient(id) {
    if (!this.recipientService) {
      this.recipientService = new Recipients(this.http);
    }
    this.recipientService.storeId = this.storeId;
    this.recipientService.orderNumber = this.orderNumber;
    this.recipientService.recipientId = id;
    return this.recipientService;
  }
  /**
   * Get transactions service instance.
   *
   * @example
   * // ...
   * @returns {Transactions} Transactions service.
   * @author Leo Li <leo.li@bindo.com>
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
   * @author Leo Li <leo.li@bindo.com>
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

export default Orders;
