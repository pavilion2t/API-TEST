import Department from './Department';
import HttpClient from '../../../common/HttpClient';

jest.mock('../../../common/HttpClient');

describe('department APIs', () => {
  test('get all departments', async () => {
    const http = new HttpClient();
    const department = {};
    const departments = [{ department }];
    http.get.mockReturnValueOnce(Promise.resolve({ data: [department] }));
    const departmentService = new Department(http);
    departmentService.storeId = 1;
    const call = departmentService.all;
    const departmentList = await call();
    expect(http).toMatchAPI(['get', '/stores/1/departments', {
      page: 1,
      per_page: 100,
    }, {
      res: departments,
      result: [department],
    }]);
    expect(departmentList).toEqual([department]);
  });
  test('delete a department', async () => {
    const uuid = 0;
    await testAPI({
      case: {
        Service: Department,
        apiName: 'delete',
        args: [uuid],
        response: { department: {} },
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'delete',
        path: `/stores/382/departments/${uuid}`,
        data: {},
      },
    });
  });
  test('edit a department name', async () => {
    const department = {};
    await testAPI({
      case: {
        Service: Department,
        apiName: 'edit',
        args: [department],
        response: { department: {} },
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'put',
        path: `/stores/382/departments/${department.id}`,
        body: { department },
        data: {},
      },
    });
  });
});
