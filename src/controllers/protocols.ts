export interface IHttpResponse<T> {
  statusCode: HttpEnumStatusCode;
  body: T;
}

export interface IHttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export enum HttpEnumStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
  CREATED = 201,
}

export interface IController {
  handle(httpRequest: IHttpRequest<unknown>): Promise<IHttpResponse<unknown>>;
}
