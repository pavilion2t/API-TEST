class TaxOption {
  constructor(http) {
    this.http = http;
    this.all = this.all.bind(this);
  }
  async all() {
    const config = {
      normalizer: res => res.map(({ tax_option }) => tax_option),
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/tax_options`, { per_page: 999 }, config);
    return data;
  }
}

export default TaxOption;
