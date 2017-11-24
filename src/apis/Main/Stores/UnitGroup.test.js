import UnitGroup from './UnitGroup';

describe('unit group API', () => {
  test('all', async () => {
    const unit_groups = [];
    await testAPI({
      case: {
        Service: UnitGroup,
        apiName: 'all',
        response: { unit_groups },
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/382/unit_groups',
        params: {
          per_page: 100,
          page: 1,
        },
        data: unit_groups,
      },
    });
  });
});
