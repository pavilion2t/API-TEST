class Category {
  constructor(http) {
    this.http = http;
    this.all = this.all.bind(this);
  }
  async all() {
    const { data } = await this.http.get(`/stores/${this.storeId}/categories`, {
      page: 1,
      per_page: 100,
    }, {
      normalizer: res => res.map(({ category }) => category),
    });
    return data;
  }
}

export default Category;
