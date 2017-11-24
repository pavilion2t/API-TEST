import ModifierSets from './ModifierSets';
import HttpClient from '../../../common/HttpClient';

jest.mock('../../../common/HttpClient');

describe('ModifierSets APIs', () => {
  test('list', async () => {
    const http = new HttpClient();
    const ModifierSet = {};
    const link = { page: 1 };
    http.get.mockReturnValueOnce(Promise.resolve({ data: [ModifierSet], headers: { link } }));
    const modifierSetsService = new ModifierSets(http);
    modifierSetsService.storeId = 1;
    const params = { page: 1, per_page: 5 };
    const favoriteList = await modifierSetsService.list(params);
    expect(http).toMatchAPI(['get', '/stores/1/modifier_sets', params, {
      res: { modifier_sets: [ModifierSet] },
      result: [ModifierSet],
    }]);
    expect(favoriteList).toMatchObject({
      paging: {
        page: 1,
      },
      list: [ModifierSet],
    });
  });


  test('listing item with 100', async () => {
    await testAPI({
      case: {
        Service: ModifierSets,
        apiName: 'all',
        response: { modifier_set: [] },
        serviceSetter: (service) => {
          service.storeId = 1;
          service.id = 100;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/1/modifier_sets/106',
        data: [],
      },
    });
  });

  test('delete listing item with id', async () => {
    const listing = {};
    await testAPI({
      case: {
        Service: ModifierSets,
        apiName: 'delete',
        response: { listing },
        serviceSetter: (service) => {
          service.storeId = 1;
          service.id = 2;
        },
      },
      expect: {
        method: 'delete',
        path: '/stores/1/modifier_sets/2',
        data: listing,
      },
    });
  });
});
