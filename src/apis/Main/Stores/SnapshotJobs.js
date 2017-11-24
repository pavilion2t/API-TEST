/**
 * SnapshotJob Service
 * @exports Main/Stores/SnapshotJobs
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class SnapshotJobs {
  constructor(http) {
    this.http = http;

    this.create = this.create.bind(this);
    this.crestatusate = this.status.bind(this);
  }
  /**
   * Create a Snapshot Job
   *
   * @example
   * client.main().store(storeId).snapshotJobs.create({
   *   start_sync_time: 0,
   * });
   * @param {Object} data - data.
   * @param {number} data.start_sync_time - Start sync time
   * @returns {Object} Snapshot Job
   */
  async create(data) {
    const config = {
    };
    const response = await this.http.post(`/stores/${this.storeId}/snapshot_job`, null, data, config);
    return response.data;
  }
  /**
   * Get a Snapshot Job.
   *
   * @example
   * client.main().store(1).snapshotJob('Mjc3NDgyMDM2NDEzODkxNTg0LTQ5NjQ=').status();
   * @returns {Object} Snapshot Job
   */
  async status() {
    const config = {};
    const response = await this.http.get(`/stores/${this.storeId}/snapshot_job/${this.snapshotUuid}/status`, null, config);
    return response.data;
  }
}

export default SnapshotJobs;
