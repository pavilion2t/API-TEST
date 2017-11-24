import { Analytics, Main, Gateway, Api } from './apis';

class Client {
  constructor(config = {}, env = 'staging') {
    this.config = config;
    this.env = env;
    this.apis = {};
  }
  setOnRequest(onRequest) {
    Object.values(this.apis).forEach(api => api.setOnRequest(onRequest));
    this.config.onRequest = onRequest;
  }
  analytics(version = 'v4') {
    const key = `analytics${version}`;
    if (!this.apis[key]) {
      const api = new Analytics(this.config, version, this.env);
      this.apis[key] = api;
    }
    return this.apis[key];
  }
  gateway(version = 'v2') {
    const key = `gateway${version}`;
    if (!this.apis[key]) {
      const api = new Gateway(this.config, version, this.env);
      this.apis[key] = api;
    }
    return this.apis[key];
  }
  main(version = 'v2') {
    const key = `main${version}`;
    if (!this.apis[key]) {
      const api = new Main(this.config, version, this.env);
      this.apis[key] = api;
    }
    return this.apis[key];
  }
  api(version = 'v2') {
    const key = `api${version}`;
    if (!this.apis[key]) {
      const api = new Api(this.config, version, this.env);
      this.apis[key] = api;
    }
    return this.apis[key];
  }
}

export default Client;
