/**
 * Enum for Currency values.
 * @readonly
 * @enum {object}
 * @author Leo Li <leo.li@bindo.com>
 */
const Currency = {
  /**
   * US Dollar
   */
  USD: {
    code: 'USD',
    symbol: '$',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
  },
  /**
   * Japanese Yen
   */
  JPY: {
    code: 'JPY',
    symbol: '¥',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
  },
  AUD: {
    code: 'AUD',
    symbol: '$',
  },
  CAD: {
    code: 'CAD',
    symbol: '$',
  },
  CHF: {
    code: 'CHF',
    symbol: 'Fr',
  },
  /**
   * Chinese Yuan Renminbi
   */
  CNY: {
    code: 'CNY',
    symbol: '¥',
  },
  SEK: {
    code: 'SEK',
    symbol: 'kr',
  },
  MXN: {
    code: 'MXN',
    symbol: '$',
  },
  NZD: {
    code: 'NZD',
    symbol: '$',
  },
  SGD: {
    code: 'SGD',
    symbol: '$',
  },
  /**
   * Hong Kong Dollar
   */
  HKD: {
    code: 'HKD',
    symbol: 'HK$',
  },
  NOK: {
    code: 'NOK',
    symbol: 'kr',
  },
  KRW: {
    code: 'KRW',
    symbol: '₩',
  },
  TRY: {
    code: 'TRY',
    symbol: '₺',
  },
  INR: {
    code: 'INR',
    symbol: '₹',
  },
  RUB: {
    code: 'RUB',
    symbol: '₽',
  },
  BRL: {
    code: 'BRL',
    symbol: 'R$',
  },
  ZAR: {
    code: 'ZAR',
    symbol: 'R',
  },
  /**
   * @function valueOf
   * @example
   * if (Currency.USD === Currency.valueOf('JPY') {
   *   //...
   * }
   * @param {number} code - Currency code.
   * @returns {Currency} - Currency Enum.
   */
  valueOf: (code) => {
    if (!this[code]) {
      throw new Error('Unsupported currency.');
    }
    return this[code];
  },
};

export default Currency;
