import QuantityHistories from './QuantityHistories';
/**
 * Customer Service
 * @exports Analytic/Stores/Listings
 * @class
 * @author Judy <judy.zhu@bindo.com>
 */
class Listings {
  constructor(http) {
    this.http = http;
  }


  /**
   * Get Quantity Histories service instance, without id.
   *
   * @example
   * // ...
   * @returns {QuantityHistories} QuantityHistories service without id.
   */
  get quantityHistory() {
    if (!this.quantityHistoryService) {
      this.quantityHistoryService = new QuantityHistories(this.http);
    }
    this.quantityHistoryService.storeId = this.storeId;
    this.quantityHistoryService.listingId = this.listingId;
    return this.quantityHistoryService;
  }
}

export default Listings;
