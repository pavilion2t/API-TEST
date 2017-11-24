class Workflow {
  constructor(http) {
    this.http = http;
    this.all = this.all.bind(this);
  }
  async all() {
    const config = {
      normalizer: data => data.workflows.map(res => res),
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/workflows`, {}, config);
    return data;
  }
}

export default Workflow;
