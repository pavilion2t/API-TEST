import CustomFields from './CustomFields';

describe('attributes APIs', () => {
  test('get all attributes of an item', async () => {
    const cf1 = {};
    const cf2 = {};
    await testAPI({
      case: {
        Service: CustomFields,
        apiName: 'all',
        response: { custom_fields: [cf1, cf2] },
        serviceSetter: (service) => {
          service.storeId = 1;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/1/custom_fields',
        params: {
          per_page: 100,
          page: 1,
        },
        data: [cf1, cf2],
      },
    });
  });
});
