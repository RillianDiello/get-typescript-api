import validator from "validator";
import { IUser } from "../../../models/user";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { ICreateUserRepository, ICreateUserParams } from "./protocols";
import { badRequest, created, serverError } from "../../../helpers/helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(
    httpRequest: IHttpRequest<ICreateUserParams>
  ): Promise<IHttpResponse<IUser | string>> {
    try {
      const { body } = httpRequest;
      if (!body) {
        return badRequest("Please specify Body");
      }

      const emailIsValid = validator.isEmail(body!.email);
      if (!emailIsValid) {
        return badRequest("Body email is invalid");
      }

      const user = await this.createUserRepository.createUser(body);
      return created<IUser>(user);
    } catch (error) {
      return serverError();
    }
  }
}
