import Customers from './Customers';
import Discounts from './Discounts';
import GiftCards from './GiftCards';
import Invoices from './Invoices';
import Orders from './Orders';
import Parties from './Parties';
import PaymentInstruments from './PaymentInstruments';
import Rooms from './Rooms';
import Tables from './Tables';
import EmailTemplates from './EmailTemplates';
import OrderCorrespondences from './OrderCorrespondences';

/**
 * Store Service
 * @exports Gateway/Stores
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
   * Get discount service instance.
   *
   * @example
   * // ...
   * @returns {Discounts} Discount service.
   */
  get discounts() {
    const discountService = new Discounts(this.http);
    discountService.storeId = this.storeId;
    return discountService;
  }
  /**
   * Get giftCard service instance.
   *
   * @example
   * // ...
   * @returns {GiftCards} GiftCard service.
   */
  get giftCards() {
    const giftCardService = new GiftCards(this.http);
    giftCardService.storeId = this.storeId;
    return giftCardService;
  }
  /**
   * Get invoices service instance.
   *
   * @example
   * // ...
   * @returns {Invoices} Invoice service.
   * @author Yori Zhao <yori.zhao@bindo.com>
   */
  get invoices() {
    return this.invoice();
  }
  /**
   * Get invoices service instance with id.
   *
   * @example
   * // ...
   * @param {number} id - invoices id.
   * @returns {Invoices} invoices service with id.
   * @author Yori Zhao <yori.zhao@bindo.com>
   */
  invoice(id) {
    if (!this.invoiceService) {
      this.invoiceService = new Invoices(this.http);
    }
    this.invoiceService.storeId = this.storeId;
    this.invoiceService.orderNumber = id;
    return this.invoiceService;
  }
  /**
   * Get order service instance.
   *
   * @example
   * // ...
   * @returns {Orders} Order service.
   */
  get orders() {
    return this.order();
  }
  /**
   * Get order service instance with id.
   *
   * @example
   * // ...
   * @param {string} orderNumber - order number
   * @returns {Orders} Order service with id.
   */
  order(orderNumber) {
    if (!this.orderService) {
      this.orderService = new Orders(this.http);
    }
    this.orderService.storeId = this.storeId;
    this.orderService.orderNumber = orderNumber;
    return this.orderService;
  }
  /**
   * Get order service instance.
   *
   * @example
   * // ...
   * @returns {OrderCorrespondences} OrderCorrespondences service.
   */
  get orderCorrespondences() {
    if (!this.orderCorrespondenceService) {
      this.orderCorrespondenceService = new OrderCorrespondences(this.http);
    }
    this.orderCorrespondenceService.storeId = this.storeId;
    return this.orderCorrespondenceService;
  }
  /**
   * Get party service instance.
   *
   * @example
   * // ...
   * @returns {Parties} Party service.
   * @author Yori Zhao <yori.zhao@bindo.com>.
   */
  get parties() {
    return this.party();
  }
  /**
   * Get party service instance with id.
   *
   * @example
   * // ...
   * @param {number} id - party id.
   * @returns {Parties} party service with id.
   * @author Yori Zhao <yori.zhao@bindo.com>.
   */
  party(id) {
    if (!this.partyService) {
      this.partyService = new Parties(this.http);
    }
    this.partyService.storeId = this.storeId;
    this.partyService.partyId = id;
    return this.partyService;
  }
  /**
   * Get payment instrument service instance.
   *
   * @example
   * // ...
   * @returns {PaymentInstruments} Payment instrument service.
   */
  get paymentInstruments() {
    const paymentInstrumentService = new PaymentInstruments(this.http);
    paymentInstrumentService.storeId = this.storeId;
    return paymentInstrumentService;
  }
  /**
   * Get room service instance.
   *
   * @example
   * // ...
   * @returns {Rooms} Room service.
   */
  get rooms() {
    const roomService = new Rooms(this.http);
    roomService.storeId = this.storeId;
    return roomService;
  }
  /**
   * Get table service instance.
   *
   * @example
   * // ...
   * @returns {Tables} Table service.
   */
  get tables() {
    const tableService = new Tables(this.http);
    tableService.storeId = this.storeId;
    return tableService;
  }
  /**
   * Get email templates service instance.
   *
   * @example
   * // ...
   * @returns {EmailTemplates} Email Templates service.
   * @author Jerry.Luo <jerry.luo@bindo.com>
   */
  get emailTemplates() {
    return this.emailTemplate();
  }
  /**
   * Get email templates service instance with id.
   *
   * @example
   * // ...
   * @param {number} id - email templates id.
   * @returns {EmailTemplates} email templates service with id.
   * @author Jerry.Luo <jerry.luo@bindo.com>.
   */
  emailTemplate(id) {
    if (!this.emailTemplatesService) {
      this.emailTemplatesService = new EmailTemplates(this.http);
    }
    this.emailTemplatesService.storeId = this.storeId;
    this.emailTemplatesService.emailTemplateId = id;
    return this.emailTemplatesService;
  }
}

export default Stores;
