import StockLevel from './StockLevel';
/**
 * Customer Service
 * @exports Main/Stores/Listings
 * @class
 * @author Green <green.qu@bindo.com>
 */
class Listings {
  constructor(http) {
    this.http = http;
    this.list = this.list.bind(this);
    this.getByUPC = this.getByUPC.bind(this);
    this.getWithSuppliers = this.getWithSuppliers.bind(this);
    this.delete = this.delete.bind(this);
    this.create = this.create.bind(this);
    this.setReferenceCode = this.setReferenceCode.bind(this);
    this.getItemList = this.getItemList.bind(this);
  }
  /**
   * Get stock level service instance, without id.
   *
   * @example
   * // ...
   * @returns {StockLevel} StockLevel service without id.
   */
  get stockLevels() {
    if (!this.stockLevelService) {
      this.stockLevelService = new StockLevel(this.http);
    }
    this.stockLevelService.storeId = this.storeId;
    this.stockLevelService.listingId = this.listingId;
    return this.stockLevelService;
  }

  /**
   * Crate a Listing
   *
   * @example
   * client.main().store(1).listings.creat(listing)
   * @param {Object} listing - Listing to create
   * @returns {Object} created Listing
   */
  async create(listing) {
    const { data } = await this.http.post(`/stores/${this.storeId}/unique_products`, null, { unique_product: listing }, {
      normalizer: d => d[0].listing,
    });
    return data;
  }


  /**
   * Get Listing list for one or multiple Stores.
   *
   * @example
   * const params = {
   *   page: 1,
   *   per_page: 15,
   *   filter: {
   *     name: 'xxx'
   *   },
   *   sort: [{
   *     {created_at: 'desc'}
   *   }]
   * };
   * client.main().store(1).listings.list(params);
   * @param {Object} params - Query params.
   * @param {string} params.page - Page.
   * @param {string} params.per_page - Per page
   * @param {Object} [params.filter] - filters, note store id should not be here
   * @param {Object} [params.sort] - sort key and rule
   * @returns {Array} Listing list.
   */
  async list({
    page, per_page, filter, sort = [{ created_at: 'desc' }],
  }) {
    const storeFilter = this.storeId ? { store_id: this.storeId } : null;
    const config = {
      normalizer: ({ listings }) => listings,
      parseLink: true,
    };
    const { data, headers } = await this.http.post('/listings/search', null, {
      page,
      per_page,
      search: {
        filter: Object.assign({}, filter, storeFilter),
        sort,
      },
    }, config);
    return {
      list: data,
      paging: headers.link,
    };
  }

  async getItemList(params) {
    const config = {
      normalizer: data => data,
      parseLink: true,
    };
    const { data, headers } = await this.http.get(`/stores/${this.storeId}/listings`, params, config);
    return {
      paging: headers.link,
      list: data,
    };
  }
  /**
  * Get Listing list with UPC equals to gaven arg
  *
  * @example
  * client.main().store(1).listings.getByUPC('076344089117')
  * @param {string} upc - UPC to search
  * @returns {Array} Listing array
  */
  async getByUPC(upc) {
    const config = {
      normalizer: data => data.map(({ listing }) => listing),
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/listings`, {
      per_page: 999999,
      filters: [`upc__equal__${upc}`],
    }, config);
    return data;
  }


  async getWithSuppliers() {
    const config = {
      normalizer: data => data.listing,
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/listings/${this.listingId}/with_suppliers`, null, config);
    return data;
  }

  async delete() {
    const config = {
      normalizer: data => data.listing,
    };
    const { data } = await this.http.delete(`/stores/${this.storeId}/listings/${this.listingId}`, null, config);
    return data;
  }
  /**
  * Set reference code of a listing
  *
  * @example
  * const codes = [ {}, {} ]
  * client.main().store(1).listing(2).setReferenceCode(codes)
  * @param {Array} codes - Array of reference codes
  */
  async setReferenceCode(codes) {
    const { data } = await this.http.put(`/stores/${this.storeId}/listings/${this.listingId}/reference_codes`, null, { codes });
    return data;
  }
}

export default Listings;
