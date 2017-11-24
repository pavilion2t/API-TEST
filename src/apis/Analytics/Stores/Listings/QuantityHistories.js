class QuantityHistories {
  constructor(http) {
    this.http = http;
    this.all = this.all.bind(this);
  }

  async all(params) {
    const config = {
      normalizer: data => data,
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/listings/${this.listingId}/quantity_histories`, params, config);
    return data;
  }
}

export default QuantityHistories;
