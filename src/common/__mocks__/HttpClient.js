import Response from '../Res';
import parseHeaderLink from '../parseHeaderLink';

const call = async (config) => {
  const res = await fetch();
  const response = await Response.parse(res);
  if (config && config.normalizer) {
    response.data = config.normalizer(response.data);
  }
  if (config && config.parseLink) {
    response.headers.link = parseHeaderLink(response.headers);
  }
  return response;
};

const withbody = (path, params, body, config) => call(config);

const withoutbody = (path, params, config) => call(config);

const MockHttpClient = jest.fn(function mockImpl() {
  this.setOnRequest = jest.fn();
  this.post = jest.fn(withbody);
  this.get = jest.fn(withoutbody);
  this.put = jest.fn(withbody);
  this.delete = jest.fn(withoutbody);
  this.parseHeaderLink = headers => JSON.parse(headers.link);
  return this;
});
export default MockHttpClient;
