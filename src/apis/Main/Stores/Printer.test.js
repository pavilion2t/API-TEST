import Printer from './Printer';

describe('Printers APIs', () => {
  test('get all printers', async () => {
    await testAPI({
      case: {
        Service: Printer,
        apiName: 'all',
        response: { hardwares: [] },
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/382/hardwares',
        params: {
          hardware_type: 'receipt_printer',
        },
        data: [],
      },
    });
  });
  test('select printers', async () => {
    const hardware = {};
    await testAPI({
      case: {
        Service: Printer,
        apiName: 'edit',
        args: [hardware],
        response: { hardware: {} },
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'put',
        path: `/stores/382/hardwares/${hardware.id}`,
        body: { hardware },
        data: {},
      },
    });
  });
});
