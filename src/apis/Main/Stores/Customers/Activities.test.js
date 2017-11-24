import Activities from './Activities';
import HttpClient from '../../../../common/HttpClient';

jest.mock('../../../../common/HttpClient');

describe('Activities APIs', () => {
  test('list', async () => {
    const http = new HttpClient();
    const activity = {};
    const list = [activity];
    http.get.mockReturnValueOnce({
      data: list,
      headers: {
        link: { page: 1, total: 10 },
      },
    });
    const activityService = new Activities(http);
    activityService.storeId = 1;
    activityService.customerId = 2;
    const params = { page: 1 };
    const activityList = await activityService.list(params);
    expect(http).toMatchAPI(['get', '/stores/1/customers/2/activities', params, {
      res: { customer_activities: list },
      result: list,
    }]);
    expect(activityList).toMatchObject({
      paging: {
        page: 1,
        total: 10,
      },
      list,
    });
  });
});
