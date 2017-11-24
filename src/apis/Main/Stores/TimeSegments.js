/**
 * TimeSegments Service
 * @exports Main/Stores/TimeSegments
 * @class
 * @author Leo Li <leo.li@bindo.com>
 */
class TimeSegments {
  constructor(http) {
    this.http = http;
  }
  /**
   * Get All time segments for a Store.
   *
   * e.g.
   * ```json
   * [
   *   {
   *     "title": "Breakfast",
   *     "start": "0900",
   *     "end": "1100"
   *   },
   *   {
   *     "title": "Lunch",
   *     "start": "1101",
   *     "end": "1500"
   *   }
   * ]
   * ```
   *
   * @example
   * client.main().store(1).timeSegments.all();
   * @returns {Array} Time segments array.
   */
  async all() {
    const config = {
      normalizer: ({ time_segments: timeSegments }) => {
        const keys = Object.keys(timeSegments);
        const list = keys.map((key) => {
          const timeSegment = timeSegments[key];
          return {
            title: key,
            start: timeSegment.start,
            end: timeSegment.end,
          };
        });
        return list;
      },
    };

    const { data } = await this.http.get(`/stores/${this.storeId}/time_segments`, null, config);
    return data;
  }
}

export default TimeSegments;
