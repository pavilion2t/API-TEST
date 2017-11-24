import Tables from './Tables';

describe('Tables APIs', () => {
  test('all', async () => {
    const params = {};
    const table = {};
    const data = [{ table }, { table }];
    await testAPI({
      case: {
        Service: Tables,
        apiName: 'all',
        args: [params],
        response: data,
        serviceSetter: (service) => {
          service.storeId = 1;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/1/tables',
        params,
        data: [table, table],
      },
    });
  });
});
