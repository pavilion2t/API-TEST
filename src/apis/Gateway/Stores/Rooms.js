/**
 * Room Service
 * @exports Gateway/Stores/Rooms
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class Rooms {
  constructor(http) {
    this.http = http;

    this.all = this.all.bind(this);
  }
  /**
   * Get Rooms for a Store.
   *
   * @example
   * const params = {
   *   last_updated_at: '2017-05-20T11:31:17+08:00'
   * };
   * client.gateway().store(1).rooms.all(params);
   * @param {Object} params - Query params.
   * @returns {Array} Room List.
   */
  async all(params) {
    const config = {
      normalizer: data => data.map(({ room }) => room),
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/rooms`, params, config);
    return data;
  }
}

export default Rooms;
