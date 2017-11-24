/**
 * Customer Activity Service
 * @exports Main/Stores/Customers/Activities
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Activities {
  constructor(http) {
    this.http = http;

    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
  }
  /**
   * Get Activities for a Customer.
   *
   * @example
   * client.main().store(1).customer(1).activities.list();
   * @param {Object} params - paging params
   * @param {number} params.page - page.
   * @param {number} params.per_page - item count per page.
   * @returns {Array} All activity.
   */
  async list(params) {
    const config = {
      normalizer: ({ customer_activities: activities }) => activities,
      parseLink: true,
    };
    const { data, headers } = await this.http.get(`/stores/${this.storeId}/customers/${this.customerId}/activities`, params, config);
    return {
      paging: headers.link,
      list: data,
    };
  }
  /**
   * Create a Customer activity.
   *
   * @example
   * const data = {
   *   activity_type: 1,
   * };
   * client.main().store(1).customer(1).activities.create(data);
   * @param {Object} params - A customer object.
   * @param {number} params.activity_type - Activity type, `1`: `check-in`, `2`: `check-out`.
   * @returns {Object} Activity object.
   */
  async create(params) {
    const config = {
      normalizer: ({ customer_activity: activity }) => activity,
    };
    const { data } = await this.http.post(`/stores/${this.storeId}/customers/${this.customerId}/activities`, null, { customer_activity: params }, config);
    return data;
  }
}

export default Activities;
