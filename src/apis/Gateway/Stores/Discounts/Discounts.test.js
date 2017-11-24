import Discounts from './index';

jest.mock('../../../../common/HttpClient.js');
describe('discounts APIs', () => {
  test('all', async () => {
    const d1 = { discount: '' };
    const d2 = { discount: '' };
    const storeId = 1;
    await testAPI({
      case: {
        Service: Discounts,
        apiName: 'all',
        response: [d1, d2],
        serviceSetter: (service) => {
          service.storeId = storeId;
        },
      },
      expect: {
        method: 'get',
        path: `/stores/${storeId}/discounts`,
        data: [d1.discount, d2.discount],
      },
    });
  });
});
