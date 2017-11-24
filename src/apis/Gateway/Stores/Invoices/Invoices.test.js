import Invoices from './Invoices';

describe('invoices APIs', () => {
  test('get', async () => {
    const params = {
      includes_voided: true,
    };
    const invoide = {};
    await testAPI({
      case: {
        Service: Invoices,
        apiName: 'get',
        args: [params],
        response: { invoice: invoide },
        serviceSetter: (service) => {
          service.storeId = 1;
          service.orderNumber = '123456';
        },
      },
      expect: {
        method: 'get',
        path: '/stores/1/invoices/123456',
        params,
        data: invoide,
      },
    });
  });
});
