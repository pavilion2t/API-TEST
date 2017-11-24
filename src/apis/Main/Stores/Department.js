class Department {
  constructor(http) {
    this.http = http;
    this.create = this.create.bind(this);
    this.all = this.all.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
  }

  async all() {
    const config = {
      normalizer: data => data.map(({ department }) => department),
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/departments`, { page: 1, per_page: 100 }, config);
    return data;
  }

  async create(name, parentId) {
    const { data } = await this.http.post(`/stores/${this.storeId}/departments`, {}, { department: { name, parentId } }, { normalizer: ({ department }) => department });
    return data;
  }

  async edit(department) {
    const { data } = await this.http.put(`/stores/${this.storeId}/departments/${department.id}`, null, { department }, {
      normalizer: ({ department: kd }) => kd,
    });
    return data;
  }

  async delete(id) {
    const { data } = await this.http.delete(`/stores/${this.storeId}/departments/${id}`, null, {
      normalizer: ({ department: kd }) => kd,
    });
    return data;
  }
}

export default Department;
