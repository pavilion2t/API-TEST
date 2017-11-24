import KitchenDepartment from './KitchenDepartment';

describe('kitchenDepartments APIs', () => {
  test('get all kitchenDepartments of an item', async () => {
    await testAPI({
      case: {
        Service: KitchenDepartment,
        apiName: 'all',
        response: [{ kitchen_department: {} }, { kitchen_department: {} }],
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/382/kitchen_departments',
        params: {
          per_page: 999999,
        },
        data: [{}, {}],
      },
    });
  });
  test('create a kitchen department', async () => {
    const kitchen_department = {};
    const createdKd = {};
    await testAPI({
      case: {
        Service: KitchenDepartment,
        apiName: 'create',
        args: [kitchen_department],
        response: { kitchen_department: createdKd },
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'post',
        path: '/stores/382/kitchen_departments',
        body: { kitchen_department },
        data: createdKd,
      },
    });
  });
  test('delete a kitchen department', async () => {
    const uuid = 0;
    await testAPI({
      case: {
        Service: KitchenDepartment,
        apiName: 'delete',
        args: [uuid],
        response: { kitchen_department: {} },
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'delete',
        path: `/stores/382/kitchen_departments/${uuid}`,
        data: {},
      },
    });
  });
  test('edit a kitchen department name', async () => {
    const kitchen_department = {};
    await testAPI({
      case: {
        Service: KitchenDepartment,
        apiName: 'edit',
        args: [kitchen_department],
        response: { kitchen_department: {} },
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'put',
        path: `/stores/382/kitchen_departments/${kitchen_department.id}`,
        body: { kitchen_department },
        data: {},
      },
    });
  });
});
