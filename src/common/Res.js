class Response {
  constructor(data, status, statusText, headers) {
    this.data = data;
    this.status = status;
    this.statusText = statusText;
    const parsedHeaders = {};
    headers.forEach((value, key) => {
      parsedHeaders[key] = value;
    });
    this.headers = parsedHeaders;
  }
  static async parse(response) {
    const data = await response.json();
    return new Response(
      data,
      response.status,
      response.statusText,
      response.headers
    );
  }
}

export default Response;
