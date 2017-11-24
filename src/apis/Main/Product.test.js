import Product from './Product';

describe('product API', () => {
  test('get by name', async () => {
    const product = {};
    await testAPI({
      case: {
        Service: Product,
        apiName: 'getByName',
        args: ['111'],
        response: product,
      },
      expect: {
        method: 'get',
        path: '/products/111/name',
        data: product,
      },
    });
  });
});
