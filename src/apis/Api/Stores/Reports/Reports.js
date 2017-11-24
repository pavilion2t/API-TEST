/** @exports Api/Stores/Reports */

/**
 * Report Service
 * @exports Api/Stores/Reports
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Reports {
  constructor(http) {
    this.http = http;
  }
  /**
   * Get sales summary report for a Store.
   *
   * @example
   * client.api().store(1).reports.salesSummaryReport();
   * @param {Object} params - query params
   * @param {string} params.date_from - date start
   * @param {string} params.date_to - date end
   * @returns {Object} Sales summary report.
   */
  async salesSummaryReport(params) {
    const config = {
      normalizer: ({ data }) => data,
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/reports/sales_summary_report`, params, config);
    return data;
  }
}

export default Reports;
