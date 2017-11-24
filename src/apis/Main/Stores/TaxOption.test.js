import TaxOption from './TaxOption';

describe('tax option API', () => {
  test('all', async () => {
    const tax_option = {};
    await testAPI({
      case: {
        Service: TaxOption,
        apiName: 'all',
        response: [{ tax_option }],
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/382/tax_options',
        params: {
          per_page: 999,
        },
        data: [tax_option],
      },
    });
  });
});
