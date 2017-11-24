import QuantityHistories from './QuantityHistories';

describe('QuantityHistories APIs', () => {
  test('get all QuantityHistories of an item', async () => {
    const sl1 = {};
    const quantityHistories = {};
    const data = [quantityHistories];
    await testAPI({
      case: {
        Service: QuantityHistories,
        apiName: 'all',
        response: data,
        serviceSetter: (service) => {
          service.storeId = 1;
          service.listingId = 2;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/1/listings/2/quantity_histories',
        data: [sl1],
      },
    });
  });
});
