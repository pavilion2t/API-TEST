/**
 * UnitGroup Service
 * @exports Main/Stores/UnitGroup
 * @class
 * @author Green <green.qu@bindo.com>
 */
class UnitGroup {
  constructor(http) {
    this.http = http;
    this.all = this.all.bind(this);
  }
  /**
   * Get all Unit Groups for a Store.
   *
   * @example
   * client.main().store(1).unitGroups.all();
   * @returns {Array} All Unit Groups.
   */
  async all() {
    const { data } = await this.http.get(`/stores/${this.storeId}/unit_groups`, {
      per_page: 100,
      page: 1,
    }, {
      normalizer: ({ unit_groups }) => unit_groups,
    });
    return data;
  }
}

export default UnitGroup;
