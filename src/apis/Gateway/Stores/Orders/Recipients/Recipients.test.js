import Recipients from './Recipients';
import HttpClient from '../../../../../common/HttpClient';

jest.mock('../../../../../common/HttpClient');

describe('Recipients APIs', () => {
  test('sendToEmail', async () => {
    const http = new HttpClient();
    const data = { message: 'Receipt has been sent to xxx@xxx.com successfully!' };
    http.post.mockReturnValueOnce(Promise.resolve({ data }));
    const recipientsService = new Recipients(http);
    const params = { email: 'xxx@xxx.com' };
    recipientsService.storeId = 1;
    recipientsService.orderNumber = 'xxxxxx';
    const res = await recipientsService.sendToEmail(params);
    expect(http).toMatchAPI(['post', '/stores/1/orders/xxxxxx/recipients', null, params]);
    expect(res).toMatchObject(data);
  });
});
