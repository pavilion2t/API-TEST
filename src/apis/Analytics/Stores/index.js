import Customers from './Customers';
import Listings from './Listings';

/**
 * Store Service
 * @exports Analytics/Stores
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Stores {
  constructor(http) {
    this.http = http;
  }
  /**
   * Get customer service instance.
   *
   * @example
   * // ...
   * @returns {Customers} Customer service.
   */
  get customers() {
    return this.customer();
  }
  /**
   * Get customer service instance, with id.
   *
   * @example
   * // ...
   * @param {number} id - Customer id.
   * @returns {Customers} Customer service with id.
   */
  customer(id = 0) {
    const customerService = new Customers(this.http);
    customerService.customerId = id;
    customerService.storeId = this.storeId;
    return customerService;
  }


  /**
     * Get listing service instance
     *
     * @example
     * // ...
     * @returns {Listings} listing service.
     * @author Judy  <judy.zhu@bindo.com>
     */
  get listings() {
    return this.listing();
  }

  /**
     *Get listings service instance, with id.
     *
     * @example
     * // ...
     * @param {number} id -
     * @returns {Listings} listing service with id
     * @author Judy  <judy.zhu@bindo.com>
     */
  listing(id) {
    if (!this.listingService) {
      this.listingService = new Listings(this.http);
    }
    this.listingService.storeId = this.storeId;
    this.listingService.listingId = id;
    return this.listingService;
  }
}

export default Stores;
