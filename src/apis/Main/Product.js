/**
 * Product Service
 * @exports Main/Product
 * @class
 * @author Green Qu <green.qu@bindo.com>
 */
class Product {
  constructor(http) {
    this.http = http;
    this.getByName = this.getByName.bind(this);
  }
  /**
   * Get product by name.
   *
   * @example
   * client.main().products.getByName('xxx');
   * @param {string} name - product name
   * @returns {Object} product info.
   */
  async getByName(name) {
    const { data } = await this.http.get(`/products/${name}/name`);
    return data;
  }
}

export default Product;
