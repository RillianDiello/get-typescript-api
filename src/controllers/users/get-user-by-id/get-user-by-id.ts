import { badRequest, ok, serverError } from "../../../helpers/helpers";
import { IUser } from "../../../models/user";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IGetUserByIdRepository } from "./protocols";

export class GetUserByIdController implements IController {
  constructor(private readonly getuserByIdRepository: IGetUserByIdRepository) {}
  async handle(
    httpRequest: IHttpRequest<{ id: string }>
  ): Promise<IHttpResponse<IUser | string>> {
    try {
      const id = httpRequest?.params?.id;
      if (!id) {
        return badRequest("Missing user Id");
      }
      const user = await this.getuserByIdRepository.getUser(id);
      return ok<IUser>(user);
    } catch {
      return serverError();
    }
  }
}
