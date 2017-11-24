import Reports from './Reports';
import HttpClient from '../../../../common/HttpClient';

jest.mock('../../../../common/HttpClient');

describe('Reports APIs', () => {
  test('salesSummaryReport', async () => {
    const http = new HttpClient();
    const data = {};
    http.get.mockReturnValueOnce(Promise.resolve({ data }));
    const reportService = new Reports(http);
    reportService.storeId = 1;
    const result = await reportService.salesSummaryReport();
    expect(http).toMatchAPI(['get', '/stores/1/reports/sales_summary_report', undefined, {
      res: { data },
      result: data,
    }]);
    expect(result).toBe(data);
  });
});
