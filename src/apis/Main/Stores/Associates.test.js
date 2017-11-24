import Associates from './Associates';
import HttpClient from '../../../common/HttpClient';

jest.mock('../../../common/HttpClient');

describe('Associates APIs', () => {
  test('all', async () => {
    const http = new HttpClient();
    const user = {};
    http.get.mockReturnValueOnce(Promise.resolve({ data: [user] }));
    const associateService = new Associates(http);
    associateService.storeId = 1;
    const associates = await associateService.all({});
    expect(http).toMatchAPI(['get', '/stores/1/associates', {}, {
      res: [{ user }],
      result: [user],
    }]);
    expect(associates).toEqual([user]);
  });
});
