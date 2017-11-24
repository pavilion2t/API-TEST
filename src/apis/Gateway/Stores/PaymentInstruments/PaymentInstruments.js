/**
 * PaymentInstrument Service
 * @exports Gateway/Stores/PaymentInstruments
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class PaymentInstruments {
  constructor(http) {
    this.http = http;
  }
  /**
   * Get Other payment instruments for a Store.
   *
   * @example
   * // ...
   */
  async all() {
    const config = {
      normalizer: data => data.payment_instruments,
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/other_payment_instruments`, undefined, config);
    return data;
  }
}

export default PaymentInstruments;
