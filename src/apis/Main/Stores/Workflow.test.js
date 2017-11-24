import Workflow from './Workflow';

describe('Workflows APIs', () => {
  test('get all workflows of an item', async () => {
    await testAPI({
      case: {
        Service: Workflow,
        apiName: 'all',
        response: { workflows: [] },
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/382/workflows',
        params: {},
        data: [],
      },
    });
  });
});
