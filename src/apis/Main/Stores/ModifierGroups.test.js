import ModifierGroups from './ModifierGroups';

describe('modifierGroups APIs', () => {
  test('get all modifierGroups of an item', async () => {
    const mg1 = {};
    const mg2 = {};
    await testAPI({
      case: {
        Service: ModifierGroups,
        apiName: 'all',
        response: { modifier_groups: [mg1, mg2] },
        serviceSetter: (service) => {
          service.storeId = 1;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/1/modifier_groups',
        params: {
          per_page: 100,
          page: 1,
        },
        data: [mg1, mg2],
      },
    });
  });
});
