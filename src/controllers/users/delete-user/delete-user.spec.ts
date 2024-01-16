import { HttpEnumStatusCode, IHttpRequest } from "../../protocols";
import { DeleteUserController } from "./delete-user";
import { IDeleteUserRepository } from "./protocols";
import { IUser } from "../../../models/user";

class DeleteUserRepositoryMock implements IDeleteUserRepository {
  async deleteUser(params: string): Promise<IUser> {
    return Promise.resolve({
      id: params,
      firstName: "UpdatedFirstName",
      lastName: "UpdatedLastName",
      email: "updated.email@example.com",
      password: "updatedPassword123",
    });
  }
}

describe("DeleteUserController", () => {
  const makeHttpRequest = (id: string): IHttpRequest<{ id: string }> => ({
    params: { id },
  });
  it("should return 400 if user ID is missing", async () => {
    const controller = new DeleteUserController(new DeleteUserRepositoryMock());
    const response = await controller.handle(makeHttpRequest(""));
    expect(response.statusCode).toEqual(HttpEnumStatusCode.BAD_REQUEST);
    expect(response.body).toEqual("Missing user Id");
  });

  it("should return 500 if deleteUserRepository throws an error", async () => {
    const errorMockRepository: IDeleteUserRepository = {
      async deleteUser(id: string): Promise<IUser> {
        throw new Error(`Simulated error with id ${id}`);
      },
    };

    const controller = new DeleteUserController(errorMockRepository);
    const response = await controller.handle(makeHttpRequest("user-id"));

    expect(response.statusCode).toEqual(HttpEnumStatusCode.SERVER_ERROR);
    expect(response.body).toEqual("Somethins went wrong");
  });

  it("should return 200 if deleteUserRepository deletes the user successfully", async () => {
    const controller = new DeleteUserController(new DeleteUserRepositoryMock());
    const response = await controller.handle(makeHttpRequest("user-id"));
    expect(response.statusCode).toBe(HttpEnumStatusCode.OK);
    // expect(response.body).toEqual(validBody);
  });
});
