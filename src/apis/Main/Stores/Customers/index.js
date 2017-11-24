import Activities from './Activities';

/**
 * Customer Service
 * @exports Main/Stores/Customers
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Customers {
  constructor(http) {
    this.http = http;

    this.activity = this.activity.bind(this);
    this.all = this.all.bind(this);
    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  /**
   * Get activity service instance.
   *
   * @example
   * // ...
   * @returns {Activities} Activity service.
   */
  get activities() {
    return this.activity();
  }
  /**
   * Get activity service instance, with id.
   *
   * @example
   * // ...
   * @param {number} id - Activity id.
   * @returns {Activities} Activity service with id.
   */
  activity(id) {
    if (!this.customerService) {
      this.customerService = new Activities(this.http);
    }
    this.customerService.storeId = this.storeId;
    this.customerService.customerId = this.customerId;
    this.customerService.activityId = id;
    return this.customerService;
  }
  /**
   * Get Customers for a Store.
   *
   * @example
   * client.main().customers.all();
   * @returns {Array} All customer.
   */
  async all() {
    const { list } = await this.list(null);
    return list;
  }
  /**
   * Get Customers for a Store.
   *
   * @example
   * const params = {
   *   filters: [
   *     'name__contain__abc',
   *   ],
   *   order_by: 'name',
   * };
   * client.main().store(1).customers.list(params);
   * @param {Object} params - Query params.
   * @param {Array} params.filters - Filters.
   * @param {Array} params.order_by - Accept `id`, `name`, `last_check_in_at`.
   * @returns {Array} Customers.
   */
  async list(params) {
    const config = {
      normalizer: data => data.map(({ customer }) => customer),
      parseLink: true,
    };
    const { data, headers } = await this.http.get(`/stores/${this.storeId}/customers`, params, config);
    return {
      paging: headers.link,
      list: data,
    };
  }
  /**
   * Create a Customer.
   *
   * @example
   * const params = {
   *   name: 'Leo Li',
   *   email: 'leo.li@bindo.com',
   *   gender: 1,
   * };
   * client.main().store(1).customers.create(params);
   * @param {Object} params - A customer object.
   * @param {string} params.name - Name.
   * @param {string} params.email - Email.
   * @param {string} params.mobile - Mobile.
   * @param {string} params.phone - Phone.
   * @param {string} params.home_phone - Home phone.
   * @param {string} params.address - Address.
   * @param {string} params.billing_address - Billing address.
   * @param {string} params.shipping_address - Shipping address.
   * @param {number} params.gender - Gender, 1 as male, 2 as female.
   * @param {string} params.date_of_birth - Date of birth, format: `MM-DD`, eg. `09-27`.
   * @param {string} params.notes - Notes.
   * @returns {Object} Customer object.
   */
  async create(params) {
    const config = {
      normalizer: ({ customer }) => customer,
    };
    const { data } = await this.http.post(`/stores/${this.storeId}/customers`, null, { customer: params }, config);
    return data;
  }
  /**
   * Get a Customer.
   *
   * @example
   * client.main().store(1).customer(1).get();
   * @returns {Object} Customer object.
   */
  async get() {
    const config = {
      normalizer: ({ customer }) => customer,
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/customers/${this.customerId}`, null, config);
    return data;
  }
  /**
   * Update a customer.
   *
   * @example
   * const params = {
   *   name: 'xxx',
   * };
   * client.main().store(1).customer(1).update(params);
   * @param {Object} params - A customer object.
   * @param {string} params.name - Name.
   * @param {string} params.email - Email.
   * @returns {Object} Customer object.
   */
  async update(params) {
    const config = {
      normalizer: ({ customer }) => customer,
    };
    const { data } = await this.http.put(`/stores/${this.storeId}/customers/${this.customerId}`, null, { customer: params }, config);
    return data;
  }
  /**
   * Delete a customer.
   *
   * @example
   * client.main().store(1).customer(1).delete();
   */
  async delete() {
    const { data } = await this.http.delete(`/stores/${this.storeId}/customers/${this.customerId}`, null);
    return data;
  }
}

export default Customers;
