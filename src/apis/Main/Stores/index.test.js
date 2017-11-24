import Store from './index';
import HttpClient from '../../../common/HttpClient';

jest.mock('../../../common/HttpClient');

const http = new HttpClient();
let storeService = new Store(http);

describe('initialize services', () => {
  beforeEach(() => {
    storeService = new Store(http);
  });
  test('listing service', () => {
    let itemService = storeService.listings;
    expect(itemService.storeId).toBe(undefined);
    storeService.storeId = 1;
    itemService = storeService.listings;
    expect(itemService.storeId).toBe(1);
    storeService.storeId = [1, 2];
    itemService = storeService.listings;
    expect(itemService.storeId).toBe(storeService.storeId);
  });
  test('department service', () => {
    storeService.storeId = 777;
    const departmentService = storeService.departments;
    expect(departmentService.storeId).toBe(777);
  });
  test('category service', () => {
    storeService.storeId = 382;
    const categoryService = storeService.categories;
    expect(categoryService.storeId).toBe(382);
    expect(categoryService.http).toBeInstanceOf(HttpClient);
  });
  test('tax option service', () => {
    storeService.storeId = 383;
    const taxOptionService = storeService.taxOptions;
    expect(taxOptionService.storeId).toBe(383);
    expect(taxOptionService.http).toBeInstanceOf(HttpClient);
  });
  test('kitchen department service', () => {
    storeService.storeId = 382;
    const kitchenDepartmentService = storeService.kitchenDepartments;
    expect(kitchenDepartmentService.storeId).toBe(382);
    expect(kitchenDepartmentService.http).toBeInstanceOf(HttpClient);
  });
  test('unit group service', () => {
    storeService.storeId = 382;
    const unitGroupService = storeService.unitGroups;
    expect(unitGroupService.storeId).toBe(382);
    expect(unitGroupService.http).toBeInstanceOf(HttpClient);
  });
});

describe('store APIs', () => {
  test('get all stores', () => {
    http.get.mockReturnValueOnce(Promise.resolve({}));
    storeService.all();
    const store = {};
    expect(http).toMatchAPI(['get', '/stores', { per_page: 99 }, {
      res: [{ store }],
      result: [store],
    }]);
  });
});
