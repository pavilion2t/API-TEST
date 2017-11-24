import Parties from './Parties';
import HttpClient from '../../../../common/HttpClient';

jest.mock('../../../../common/HttpClient');

describe('Parties APIs', () => {
  test('clear', async () => {
    const http = new HttpClient();
    const data = { party: {} };
    http.put.mockReturnValueOnce(Promise.resolve({ data }));
    const partiesService = new Parties(http);
    partiesService.storeId = 1;
    partiesService.partyId = 123456;
    const res = await partiesService.clear();
    expect(http).toMatchAPI(['put', '/stores/1/parties/123456/clear']);
    expect(res).toMatchObject(data);
  });

  test('update', async () => {
    const http = new HttpClient();
    const data = { party: {} };
    const params = { name: 'jack' };
    http.put.mockReturnValueOnce(Promise.resolve({ data }));
    const partiesService = new Parties(http);
    partiesService.storeId = 1;
    partiesService.partyId = 123456;
    const res = await partiesService.update(params);
    expect(http).toMatchAPI(['put', '/stores/1/parties/123456', params]);
    expect(res).toMatchObject(data);
  });

  test('all', async () => {
    const http = new HttpClient();
    const data = { parties: {} };
    http.get.mockReturnValueOnce(Promise.resolve({ data }));
    const partiesService = new Parties(http);
    partiesService.storeId = 1;
    const res = await partiesService.all();
    expect(http).toMatchAPI(['get', '/stores/1/parties', null, {
      res: {
        parties: {

        },
      },
      result: {

      },
    }]);
    expect(res).toMatchObject(data);
  });
});
