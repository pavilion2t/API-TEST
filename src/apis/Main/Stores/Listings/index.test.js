import Listings from './index';
import HttpClient from '../../../../common/HttpClient';

jest.mock('../../../../common/HttpClient');


describe('listing APIs', () => {
  const http = new HttpClient();
  const link = { page: 1 };
  let listingService;

  beforeEach(() => {
    listingService = new Listings(http);
    http.post.mockClear();
  });

  test('list', async () => {
    const listing = {};
    const listings = [listing];
    http.post.mockReturnValueOnce(Promise.resolve({ data: listings, headers: { link } }));
    listingService.storeId = [382];
    const params = {
      page: 1,
      per_page: 25,
    };
    const listingsList = await listingService.list(params);
    expect(http).toMatchAPI(['post', '/listings/search', null, {
      search: {
        filter: {
          store_id: [382],
        },
        sort: [
          { created_at: 'desc' },
        ],
      },
      page: 1,
      per_page: 25,
    }, {
      res: { listings },
      result: listings,
    }]);
    expect(listingsList).toMatchObject({
      paging: {
        page: 1,
      },
      list: [listing],
    });
  });
  test('list multiple store', () => {
    http.post.mockReturnValueOnce(Promise.resolve({ headers: { link } }));
    listingService.storeId = [382, 383];
    const params = {};
    listingService.list(params);
    expect(http.post.mock.calls[0][2].search.filter.store_id).toEqual([382, 383]);
  });
  test('list without specific store', () => {
    http.post.mockReturnValueOnce(Promise.resolve({ headers: { link } }));
    listingService.list({});
    expect(http.post.mock.calls[0][2].search.filter.store_id).toBe(undefined);
  });
  test('get listings by UPC', async () => {
    const listing = {};
    await testAPI({
      case: {
        Service: Listings,
        apiName: 'getByUPC',
        args: ['076344089117'],
        response: [{ listing }],
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/382/listings',
        params: {
          per_page: 999999,
          filters: ['upc__equal__076344089117'],
        },
        data: [listing],
      },
    });
  });
  test('get listing item with suppliers', async () => {
    const listing = {};
    await testAPI({
      case: {
        Service: Listings,
        apiName: 'getWithSuppliers',
        response: { listing },
        serviceSetter: (service) => {
          service.storeId = 1;
          service.listingId = 2;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/1/listings/2/with_suppliers',
        data: listing,
      },
    });
  });

  test('delete listing item with id', async () => {
    const listing = {};
    await testAPI({
      case: {
        Service: Listings,
        apiName: 'delete',
        response: { listing },
        serviceSetter: (service) => {
          service.storeId = 1;
          service.listingId = 2;
        },
      },
      expect: {
        method: 'delete',
        path: '/stores/1/listings/2',
        data: listing,
      },
    });
  });

  test('create a listing', async () => {
    const listing = {};
    await testAPI({
      case: {
        Service: Listings,
        apiName: 'create',
        args: [listing],
        response: [{ listing }],
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'post',
        path: '/stores/382/unique_products',
        body: { unique_product: listing },
        data: listing,
      },
    });
  });

  test('setReferenceCode', async () => {
    const codes = [];
    await testAPI({
      case: {
        Service: Listings,
        apiName: 'setReferenceCode',
        args: [codes],
        response: { success: true },
        serviceSetter: (service) => {
          service.storeId = 382;
          service.listingId = 24253070;
        },
      },
      expect: {
        method: 'put',
        path: '/stores/382/listings/24253070/reference_codes',
        body: { codes },
        data: { success: true },
      },
    });
  });


  test('get item', async () => {
    const listing = {};
    const params = {};

    await testAPI({
      case: {
        Service: Listings,
        apiName: 'getItemList',
        args: [params],
        response: listing,
        serviceSetter: (service) => {
          service.storeId = 382;
        },
      },
      expect: {
        method: 'get',
        path: '/stores/382/listings',
        params,
        data: { list: listing, paging: params },
      },
    });
  });
});
