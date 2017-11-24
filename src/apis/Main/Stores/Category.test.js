import Category from './Category';

describe('Category API', () => {
  test('all', async () => {
    const category = {};
    await testAPI({
      case: {
        Service: Category,
        apiName: 'all',
        response: [{ category }],
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        path: '/stores/382/categories',
        method: 'get',
        params: {
          per_page: 100,
          page: 1,
        },
        data: [category],
      },
    });
  });
});
