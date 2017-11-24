import StockLevel from './StockLevel';

describe('stock level APIs', () => {
  test('get all stock levels of an item', async () => {
    const sl1 = {};
    const sl2 = {};
    await testAPI({
      case: {
        Service: StockLevel,
        apiName: 'all',
        response: [{ listing: sl1 }, { listing: sl2 }],
        serviceSetter: (service) => {
          service.storeId = 1;
          service.listingId = 2;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/1/listings/2/with_members',
        data: [sl1, sl2],
      },
    });
  });
});
