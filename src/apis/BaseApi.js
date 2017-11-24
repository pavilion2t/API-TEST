import { HttpClient, Context } from '../common';

class BaseApi {
  constructor(httpConfig, contextConfig) {
    this.context = new Context(contextConfig);
    this.http = new HttpClient(this.context, httpConfig);
  }
  setOnRequest(onRequest) {
    this.http.setOnRequest(onRequest);
  }
}

export default BaseApi;
