import { HttpEnumStatusCode, IHttpResponse } from "../controllers/protocols";
import { IUser } from "../models/user";

export const ok = <T extends string | IUser | IUser[]>(
  body: T
): IHttpResponse<T> => ({
  statusCode: HttpEnumStatusCode.OK,
  body,
});
export const created = <T extends IUser>(body: T): IHttpResponse<T> => ({
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
