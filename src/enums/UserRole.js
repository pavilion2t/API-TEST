/**
 * Enum for UserRole values.
 * @readonly
 * @enum {object}
 * @author Leo Li <leo.li@bindo.com>
 */
const UserRole = {
  /**
   * Manager
   * @property {number}  code - 1
   */
  MANAGER: {
    code: 1,
    name: 'Manager',
  },
  /**
   * Employee
   */
  EMPLOYEE: {
    code: 2,
    name: 'Employee',
  },
  /**
   * Bindo Sales Associate
   */
  BINDO_SALES_ASSOCIATE: {
    code: 4,
    name: 'Bindo Sales Associate',
  },
  /**
   * Bindo Sales Manager
   */
  BINDO_SALES_MANAGER: {
    code: 8,
    name: 'Bindo Sales Manager',
  },
  /**
   * Bindo Account Manager
   */
  BINDO_ACCOUNT_MANAGER: {
    code: 16,
    name: 'Bindo Account Manager',
  },
  /**
   * Vendor Sales People
   */
  VENDOR_SALES_PEOPLE: {
    code: 32,
    name: 'Vendor Sales People',
  },
  /**
   * Junior
   */
  JUNIOR: {
    code: 64,
    name: 'Junior',
  },
  /**
   * API
   */
  API: {
    code: 1024,
    name: 'API',
  },
  /**
   * @function valueOf
   * @example
   * if (UserRole.MANAGER === UserRole.valueOf(1024) {
   *   //...
   * }
   * @param {number} code - Role code.
   * @returns {UserRole} - UserRole Enum.
   */
  valueOf: (code) => {
    if (!this[code]) {
      throw new Error('Unsupported user role.');
    }
    return this[code];
  },
};

export default UserRole;
