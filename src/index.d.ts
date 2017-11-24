interface Headers {
  [key: string]: string;
}

interface FetchOptions {
  headers: Headers;
}

interface onRequestReturn {
  url: string;
  options: FetchOptions;
}

interface onRequest {
  (url: string, options: FetchOptions): onRequestReturn
}

interface ListParams {
  page: number;
  per_page: number;
}

interface Paging {
  totalPages: number;
  perPage: number;
  totalEntries: number;
  currentPage: number;
}

interface ListResponse<P> {
  list: Array<P>;
  paging: Paging;
}

interface MainApi {}

interface AnalyticsApi {}

interface Config {
  onSuccess?: Function;
  onError?: Function;
  onRequest?: onRequest;
}

export default class Client {
  constructor(config?: Config);
  main(version?: string): MainApi;
  analytics(version?: string): AnalyticsApi;
  setOnRequest(onRequest?: onRequest): void;
}
