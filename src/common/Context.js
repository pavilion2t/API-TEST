class Context {
  constructor({ schema, host, base }) {
    if (!host) {
      throw new Error('host required in context config');
    }
    this.schema = schema || 'https';
    this.host = host;
    this.base = base || '';
  }
  get url() {
    return `${this.schema}://${this.host}${this.base}`;
  }
}

export default Context;
