import EmailTemplates from './index';

jest.mock('../../../../common/HttpClient.js');
describe('email template APIs', () => {
  test('all', async () => {
    const et1 = {};
    const et2 = {};
    const storeId = 1;
    await testAPI({
      case: {
        Service: EmailTemplates,
        apiName: 'all',
        response: [et1, et2],
        serviceSetter: (service) => {
          service.storeId = storeId;
        },
      },
      expect: {
        method: 'get',
        path: `/stores/${storeId}/email_templates`,
        data: [et1, et2],
      },
    });
  });
});
