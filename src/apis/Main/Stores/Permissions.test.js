import Permissions from './Permissions';
import HttpClient from '../../../common/HttpClient';

jest.mock('../../../common/HttpClient');

describe('Permissions APIs', () => {
  test('all', async () => {
    const http = new HttpClient();
    const data = {};
    http.get.mockReturnValueOnce(Promise.resolve({ data }));
    const permissionService = new Permissions(http);
    permissionService.storeId = 1;
    const permissions = await permissionService.all();
    const storePermissions = {};
    expect(http).toMatchAPI(['get', '/stores/1/store_permissions', null, {
      res: { store_permissions: storePermissions },
      result: storePermissions,
    }]);
    expect(permissions).toBe(data);
  });
});
