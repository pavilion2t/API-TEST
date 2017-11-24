import Rooms from './Rooms';

describe('Rooms APIs', () => {
  test('all', async () => {
    const params = {};
    const room = {};
    const data = [{ room }];
    await testAPI({
      case: {
        Service: Rooms,
        apiName: 'all',
        args: [params],
        response: data,
        serviceSetter: (service) => {
          service.storeId = 1;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/1/rooms',
        params,
        data: [room],
      },
    });
  });
});
