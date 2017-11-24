/**
 * Email Templates
 * @exports Gateway/Stores/EmailTemplates
 * @class
 * @author Jerry.Luo <jerry.luo@bindo.com>
 */
class EmailTemplates {
  constructor(http) {
    this.http = http;
    this.all = this.all.bind(this);
  }
  /**
   * Get all email templates for a Store.
   *
   * @example
   * const params = {
   *   last_updated_at: '2017-05-20T11:31:17+08:00'
   * }
   * client.main().store(1).emailTemplates.all(params);
   * @param {Object} params - Query params.
   * @returns {Array} All Email Templates.
   * @author Jerry.Luo <jerry.luo@bindo.com>
   */
  async all(params) {
    const response = await this.http.get(`/stores/${this.storeId}/email_templates`, params);
    return response.data;
  }
}

export default EmailTemplates;
