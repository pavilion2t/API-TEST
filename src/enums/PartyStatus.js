/**
 * Enum for PartyStatus values.
 * @readonly
 * @enum {object}
 * @author Leo Li <leo.li@bindo.com>
 */
export default {
  DEFAULT: 'default',
  SEATED: 'seated',
  ORDERED: 'ordered',
  CHECK_DROPPED: 'check_dropped',
  PADI: 'paid',
  MULTIPLE: 'multiple',
  RESERVED: 'reserved',
  AVAILABLE: 'available',
  /**
   * @function valueOf
   * @example
   * if (PartyStatus.DEFAULT === PartyStatus.valueOf('seated') {
   *   //...
   * }
   * @param {number} name - Party status code.
   * @returns {PartyStatus} - PartyStatus Enum.
   */
  valueOf: (name) => {
    if (!this[name.toLowerCase()]) {
      throw new Error('Unsupported party status.');
    }
    return this[name.toLowerCase()];
  },
};
