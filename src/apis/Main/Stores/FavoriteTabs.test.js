import FavoriteTabs from './FavoriteTabs';
import HttpClient from '../../../common/HttpClient';

jest.mock('../../../common/HttpClient');

describe('ModifierSets APIs', () => {
  test('list', async () => {
    const http = new HttpClient();
    const FavoriteTab = {};
    const link = { page: 1 };
    http.get.mockReturnValueOnce(Promise.resolve({ data: [FavoriteTab], headers: { link } }));
    const favoriteTabsService = new FavoriteTabs(http);
    favoriteTabsService.storeId = 1;
    const params = { page: 1, per_page: 5 };
    const favoriteList = await favoriteTabsService.list(params);
    expect(http).toMatchAPI(['get', '/stores/1/favorite_tabs', params, {
      res: [{ favorite_tab: FavoriteTab }],
      result: [FavoriteTab],
    }]);
    expect(favoriteList).toMatchObject({
      paging: {
        page: 1,
      },
      list: [FavoriteTab],
    });
  });
});
