/**
 * Customer Permission Service
 * @exports Main/Stores/Permissions
 * @class
 * @author Green Qu <green.qu@bindo.com>
 */
class Permissions {
  constructor(http) {
    this.http = http;
  }

  async all() {
    const path = `/stores/${this.storeId}/store_permissions`;
    const config = {
      normalizer: ({ store_permissions: permissions }) => permissions,
    };
    const { data } = await this.http.get(path, null, config);
    return data;
  }
}

export default Permissions;
