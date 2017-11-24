class Printer {
  constructor(http) {
    this.http = http;
    this.all = this.all.bind(this);
    this.edit = this.edit.bind(this);
  }
  async all() {
    const config = {
      normalizer: data => data.hardwares.map(res => res),
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/hardwares`, { hardware_type: 'receipt_printer' }, config);
    return data;
  }
  async edit(hardware) {
    const { data } = await this.http.put(`/stores/${this.storeId}/hardwares/${hardware.id}`, null, { hardware }, {
      normalizer: ({ hardware: res }) => res,
    });
    return data;
  }
}

export default Printer;
