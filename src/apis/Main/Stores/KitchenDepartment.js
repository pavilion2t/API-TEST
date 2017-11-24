class KitchenDepartment {
  constructor(http) {
    this.http = http;
    this.all = this.all.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
  }
  async all() {
    const config = {
      normalizer: data => data.map(({ kitchen_department }) => kitchen_department),
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/kitchen_departments`, { per_page: 999999 }, config);
    return data;
  }
  async create(kitchen_department) {
    const { data } = await this.http.post(`/stores/${this.storeId}/kitchen_departments`, null, { kitchen_department }, {
      normalizer: ({ kitchen_department: kd }) => kd,
    });
    return data;
  }
  async delete(id) {
    const { data } = await this.http.delete(`/stores/${this.storeId}/kitchen_departments/${id}`, null, {
      normalizer: ({ kitchen_department: kd }) => kd,
    });
    return data;
  }
  async edit(kitchen_department) {
    const { data } = await this.http.put(`/stores/${this.storeId}/kitchen_departments/${kitchen_department.id}`, null, { kitchen_department }, {
      normalizer: ({ kitchen_department: kd }) => kd,
    });
    return data;
  }
  async allWorkflow() {
    const config = {
      normalizer: data => data.map(({ workflow }) => workflow),
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/workflows`, {}, config);
    return data;
  }
}

export default KitchenDepartment;
