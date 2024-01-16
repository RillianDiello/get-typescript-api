import { badRequest, ok, serverError } from "../../../helpers/helpers";
import { IUser } from "../../../models/user";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IUpdateUserParms, IUpdateUserRepository } from "./procotols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: IHttpRequest<IUpdateUserParms>
  ): Promise<IHttpResponse<IUser | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Body missing fields");
      }
      if (!id) {
        return badRequest("Missing user Id");
      }
      const allowFieldstoUpdate: (keyof IUpdateUserParms)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsNotAllowerdToUpdate = Object.keys(body).some(
        (key) => !allowFieldstoUpdate.includes(key as keyof IUpdateUserParms)
      );

      if (someFieldIsNotAllowerdToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const user = await this.updateUserRepository.updateUser(id, body);
      return ok<IUser>(user);
    } catch {
      return serverError();
    }
  }
}
