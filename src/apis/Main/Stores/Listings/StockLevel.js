class StockLevel {
  constructor(http) {
    this.http = http;
    this.all = this.all.bind(this);
  }
  async all() {
    const config = {
      normalizer: data => data.map(({ listing }) => listing),
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/listings/${this.listingId}/with_members`, null, config);
    return data;
  }
}

export default StockLevel;
