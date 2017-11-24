import diff from 'jest-diff'
import HttpClient from './src/common/HttpClient';
jest.mock('./src/common/HttpClient');

expect.extend({
  toBeBound(api, expected){
    if (!api){
      return {
        message: () => 'expected apiName not found',
        pass: false,
      }
    }
    let pass = api.boundObject === expected
    if (pass){
      return {
        message: () => '',
        pass: true,
      }
    } else {
      return {
        message: ()=> 'expect to be bound',
        pass: false,
      }
    }

  },
  toMatchAPIWithoutNormalizer(httpClient, [method, ...expected]){
    const mockFn = httpClient[method]
    if (mockFn.mock.calls.length!==1){
      return {
        message: () => `expect the api called with method ${method}`,
        pass: false,
      }
    }
    let args = mockFn.mock.calls[0]
    let received = []
    mockFn.mockClear()

    let pass = true
    const path = args.shift()
    received.push(path)
    pass = pass && path === expected[0]

    const params = args.shift()
    received.push(params)
    if (params || expected[1]) {
      pass = pass && this.equals( params, expected[1] )
    }

    let configIdx = 2
    if ( method !== 'get' && method !== 'delete'){
      const body = args.shift()
      received.push(body)
      pass = pass && this.equals( body, expected[2] )
      configIdx = 3
    }

    if (!pass) {
      return {
        message: ()=> {
          const diffString = diff(expected, received, {
            expand: this.expand,
          });
          return this.utils.matcherHint('.toBe') + '\n\n' +
            `Expected value to be (using ===):\n` +
            `  ${this.utils.printExpected(expected)}\n` +
            `Received:\n` +
            `  ${this.utils.printReceived(received)}` +
            (diffString ? `\n\nDifference:\n\n${diffString}` : '')
        },
        pass: false,
      }
    }
    return {
      message: () => '',
      pass: true,
    }
  },
  toMatchAPI(httpClient, [method, ...expected]){
    const mockFn = httpClient[method]
    if (mockFn.mock.calls.length!==1){
      return {
        message: () => `expect the api called with method ${method}`,
        pass: false,
      }
    }
    let args = mockFn.mock.calls[0]
    let received = []
    mockFn.mockClear()

    let pass = true
    const path = args.shift()
    received.push(path)
    pass = pass && path === expected[0]

    const params = args.shift()
    received.push(params)
    pass = pass && this.equals( params, expected[1] )

    let configIdx = 2
    if ( method !== 'get' && method !== 'delete'){
      const body = args.shift()
      received.push(body)
      pass = pass && this.equals( body, expected[2] )
      configIdx = 3
    }

    if (!pass) {
      return {
        message: ()=> {
          const diffString = diff(expected, received, {
            expand: this.expand,
          });
          return this.utils.matcherHint('.toBe') + '\n\n' +
            `Expected value to be (using ===):\n` +
            `  ${this.utils.printExpected(expected)}\n` +
            `Received:\n` +
            `  ${this.utils.printReceived(received)}` +
            (diffString ? `\n\nDifference:\n\n${diffString}` : '')
        },
        pass: false,
      }
    }

    const config = args.shift()
    const expectedNormalizer = expected[configIdx]
    if ( config && config.normalizer ){
      if ( expectedNormalizer ){
        let { res, result } = expectedNormalizer
        pass = this.equals(config.normalizer(res), result)
      } else {
        return {
          message: ()=>'normalizer should be tested',
          pass: false,
        }
      }
    } else if ( expectedNormalizer ){
      return {
        message: ()=>'expect normalizer provided',
        pass: false,
      }
    }
    if (pass){
      return {
        message: () => '',
        pass: true,
      }
    } else {
      return {
        message: () => 'normalizer fail',
        pass: false,
      }
    }
  }
})

global.testAPI = async ({
  case: {Service, apiName, response, serviceSetter, args},
  expect: {data, method, path, params, body}}
) => {
  const http = new HttpClient();
  if (response.headers && response.data ){
    fetch.mockResponseOnce(JSON.stringify(response.data), { status: 200, headers: response.headers });
  } else {
    fetch.mockResponseOnce(JSON.stringify(response), { status: 200});
  }

  const service = new Service(http)
  serviceSetter?serviceSetter(service):null
  expect(service[apiName]).toBeBound(service)
  const _data = await service[apiName].apply(null, args);
  expect(service.http).toMatchAPIWithoutNormalizer([method, path, params||null, body]);
  expect(_data).toEqual(data);
}
