class CustomFields {
  constructor(http) {
    this.http = http;
    this.all = this.all.bind(this);
  }
  async all() {
    const config = {
      normalizer: data => data.custom_fields,
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/custom_fields`, { per_page: 100, page: 1 }, config);
    return data;
  }
}

export default CustomFields;
