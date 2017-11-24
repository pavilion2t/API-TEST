const BaseApi = jest.fn(function MockApi() {
  this.http = {
    setOnRequest: jest.fn(),
    post: jest.fn(),
    get: jest.fn(),
  };
});

export default BaseApi;
