import Customer from './index';
import HttpClient from '../../../../common/HttpClient';

jest.mock('../../../../common/HttpClient');

describe('customers APIs', () => {
  const http = new HttpClient();
  const customer = {};
  const list = [customer];
  const link = { page: 1 };

  let customerService;
  beforeEach(() => {
    customerService = new Customer(http);
    customerService.storeId = 1;
  });

  test('all', async () => {
    http.get.mockReturnValueOnce(Promise.resolve({
      data: list,
      headers: {
        link,
      },
    }));
    const customers = await customerService.all();
    expect(http).toMatchAPI(['get', '/stores/1/customers', null, {
      res: [{ customer }],
      result: list,
    }]);
    expect(customers).toBe(list);
  });
  test('list', async () => {
    http.get.mockReturnValueOnce(Promise.resolve({
      data: list,
      headers: { link },
    }));
    const params = { page: 1 };
    const customerList = await customerService.list(params);
    expect(http).toMatchAPI(['get', '/stores/1/customers', params, {
      res: [{ customer }],
      result: list,
    }]);
    expect(customerList).toMatchObject({
      paging: {
        page: 1,
      },
      list,
    });
  });
  test('create', async () => {
    http.post.mockReturnValueOnce(Promise.resolve({
      data: customer,
    }));
    const createdCustomer = await customerService.create(customer);
    expect(http).toMatchAPI(['post', '/stores/1/customers', null, { customer }, {
      res: { customer },
      result: customer,
    }]);
    expect(createdCustomer).toBe(customer);
  });
  test('get', async () => {
    http.get.mockReturnValueOnce(Promise.resolve({
      data: customer,
    }));
    customerService.customerId = 989;
    const fetchedCustomer = await customerService.get();
    expect(http).toMatchAPI(['get', '/stores/1/customers/989', null, {
      res: { customer },
      result: customer,
    }]);
    expect(fetchedCustomer).toBe(customer);
  });
  test('update', async () => {
    const newCustomer = {};
    http.put.mockReturnValueOnce(Promise.resolve({
      data: newCustomer,
    }));
    customerService.customerId = 777;
    const updatedCustomer = await customerService.update(customer);
    expect(http).toMatchAPI(['put', '/stores/1/customers/777', null, { customer }, {
      res: { customer: newCustomer },
      result: newCustomer,
    }]);
    expect(updatedCustomer).toBe(newCustomer);
  });
  test('delete', () => {
    http.delete.mockReturnValueOnce(Promise.resolve({}));
    customerService.customerId = 999;
    customerService.delete();
    expect(http).toMatchAPI(['delete', '/stores/1/customers/999', null]);
  });
});
