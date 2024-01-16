import { HttpEnumStatusCode, IHttpResponse } from "../controllers/protocols";

export const ok = <T>(body: any): IHttpResponse<T> => ({
  statusCode: HttpEnumStatusCode.OK,
  body,
});
export const created = <T>(body: any): IHttpResponse<T> => ({
  statusCode: HttpEnumStatusCode.CREATED,
  body,
});

export const badRequest = (message: string): IHttpResponse<string> => {
  return {
    statusCode: HttpEnumStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const serverError = (): IHttpResponse<string> => {
  return {
    statusCode: HttpEnumStatusCode.SERVER_ERROR,
    body: "Somethins went wrong",
  };
};
