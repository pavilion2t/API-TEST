import OrderCorrespondences from './OrderCorrespondences';

describe('OrderCorrespondences APIs', () => {
  test('list', async () => {
    const params = {
      page: 1,
      per_page: 15,
    };
    const orderCorrespondence = {};
    const data = { order_correspondences: [orderCorrespondence] };
    const link = JSON.stringify({ page: 1 });
    await testAPI({
      case: {
        Service: OrderCorrespondences,
        apiName: 'list',
        args: [params],
        response: { data, headers: { link } },
        serviceSetter: (service) => {
          service.storeId = 1;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/1/order_correspondences',
        params,
        data: {
          paging: {
            page: 1,
          },
          list: [orderCorrespondence],
        },
      },
    });
  });
});
