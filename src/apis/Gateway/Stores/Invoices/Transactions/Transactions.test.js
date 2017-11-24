import Transactions from './index';

jest.mock('../../../../../common/HttpClient.js');
describe('transactions APIs', () => {
  test('addTips', async () => {
    const t = { transaction: '1' };
    const storeId = 1;
    const orderNumber = 2;
    const transactionId = 3;
    await testAPI({
      case: {
        Service: Transactions,
        apiName: 'addTips',
        response: t,
        serviceSetter: (service) => {
          service.storeId = storeId;
          service.orderNumber = orderNumber;
          service.transactionId = transactionId;
        },
      },
      expect: {
        method: 'put',
        path: `/stores/${storeId}/invoices/${orderNumber}/transactions/${transactionId}`,
        data: t.transaction,
      },
    });
  });
});
