class ModifierGroups {
  constructor(http) {
    this.http = http;
    this.all = this.all.bind(this);
  }

  async all() {
    const config = {
      normalizer: data => data.modifier_groups,
    };
    const { data } = await this.http.get(
      `/stores/${this.storeId}/modifier_groups`,
      { per_page: 100, page: 1 },
      config
    );
    return data;
  }
}

export default ModifierGroups;
