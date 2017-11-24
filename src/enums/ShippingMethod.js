/**
 * Enum for ShippingMethod values.
 * @readonly
 * @enum {object}
 * @author Leo Li <leo.li@bindo.com>
 */
export default {
  /**
   * Dine In
   */
  DINE_IN: {
    code: 2,
    value: 'sit_in',
  },
  /**
   * Pick Up
   */
  PICK_UP: {
    code: 0,
    value: 'pick_up',
  },
  /**
   * Delivery
   */
  DELIVERY: {
    code: 1,
    value: 'delivery',
  },
  /**
   * @function valueOf
   * @example
   * if (ShippingMethod.DINE_IN === ShippingMethod.valueOf(1) {
   *   //...
   * }
   * @param {number} code - Shipping method Code.
   * @returns {ShippingMethod} - ShippingMethod Enum.
   */
  valueOf(code) {
    if (!this[code]) {
      throw new Error('Unsupported shipping method.');
    }
    return this[code];
  },
};
