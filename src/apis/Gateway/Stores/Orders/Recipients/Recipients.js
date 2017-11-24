/**
 * Recipients Service
 * @exports Gateway/Stores/Orders/Recipients
 * @class
 * @author Yori Zhao <yori.zhao@bindo.com>
 */
class Recipients {
  constructor(http) {
    this.http = http;
  }

  /**
   * Send Receipt to email.
   *
   * @example
   * const body = {
   *   email: 'xxx@xxx.com',
   * };
   * client.gateway().store(1).order('123456789').recipients.sendToEmail(body);
   * @param {Object} body - post params.
   * @param {string} body.email - send Email.
   * @returns {Object} result - success or fail.
   */
  async sendToEmail(body) {
    const { data } = await this.http.post(`/stores/${this.storeId}/orders/${this.orderNumber}/recipients`, null, body);
    return data;
  }
}

export default Recipients;
