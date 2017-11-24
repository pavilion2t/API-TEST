import Favorites from './Favorites';

describe('Favorites APIs', () => {
  test('list', async () => {
    const favorite = {};
    const data = [{ favorite }];
    const link = JSON.stringify({ page: 1 });
    const params = { x: 'x' };
    await testAPI({
      case: {
        Service: Favorites,
        apiName: 'list',
        args: [params],
        response: { data, headers: { link } },
        serviceSetter: (service) => {
          service.storeId = 1;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/1/favorites',
        params,
        data: {
          paging: {
            page: 1,
          },
          list: [favorite],
        },
      },
    });
  });
});
