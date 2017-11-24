import Res from './Res';
import parseError from './parseError';
import parseHeaderLink from './parseHeaderLink';

const defaultNormalizer = data => data;

function validateInterceptor(interceptor) {
  return typeof interceptor === 'function';
}

class HttpClient {
  constructor(context, {
    onSuccess, onError, onRequest,
  } = {}) {
    if (validateInterceptor(onSuccess)) {
      this.onSuccess = onSuccess;
    }
    if (validateInterceptor(onError)) {
      this.onError = onError;
    }
    this.setOnRequest(onRequest);
    this.context = context;
  }
  setOnRequest(onRequest) {
    if (validateInterceptor(onRequest)) {
      this.onRequest = onRequest;
    } else if (!onRequest) {
      this.onRequest = null;
    }
  }
  static strParams(params) {
    if (!params) {
      return '';
    }
    const keys = Object.keys(params);
    const str = keys.filter((key) => {
      const value = params[key];
      return Array.isArray(value) ? value.length : value;
    }).map((key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        return value.map(v => `${key}[]=${v}`).join('&');
      }
      return `${key}=${value}`;
    }).join('&');
    return str ? `?${str}` : '';
  }
  async request(path, params, rawOptions = {}, config = {}) {
    const strParams = HttpClient.strParams(params);
    let url = this.context.url + path + strParams;
    let options = rawOptions;
    const headers = options.headers || {};
    Object.assign(headers, {
      'Content-Type': 'application/json',
    });
    options.headers = headers;
    if (this.onRequest) {
      /* eslint-disable prefer-destructuring */
      const args = this.onRequest(url, options);
      url = args.url;
      options = args.options;
    }

    options.body = JSON.stringify(options.body);
    const response = await fetch(url, options);
    if (response.ok) {
      const res = await Res.parse(response);
      if (config.parseLink) {
        res.headers.link = parseHeaderLink(res.headers);
      }
      const normalizer = config.normalizer || defaultNormalizer;
      res.data = normalizer(res.data);
      if (this.onSuccess) {
        this.onSuccess(res);
      }
      return res;
    }
    const err = await parseError({ url, options }, response);
    if (this.onError) {
      this.onError(err);
    } else {
      throw err;
    }
    return null; // make eslint happy
  }
  post(path, params, body, config) {
    const options = {
      method: 'POST',
      body,
    };
    return this.request(path, params, options, config);
  }
  get(path, params, config) {
    const options = {
      method: 'GET',
    };
    return this.request(path, params, options, config);
  }
  put(path, params, body, config) {
    const options = {
      method: 'PUT',
      body,
    };
    return this.request(path, params, options, config);
  }
  delete(path, params, config) {
    const options = {
      method: 'DELETE',
    };
    return this.request(path, params, options, config);
  }
}

export default HttpClient;
