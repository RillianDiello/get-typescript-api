import { HttpEnumStatusCode } from "../../protocols";
import { CreateUserController } from "./create-user";
import { ICreateUserRepository, ICreateUserParams } from "./protocols";

class CreateUserRepositoryMock implements ICreateUserRepository {
  async createUser(params: ICreateUserParams): Promise<any> {
    return Promise.resolve(params);
  }
}

describe("CreateUserController", () => {
  it("should return 400 if body is not provider", async () => {
    const controller = new CreateUserController(new CreateUserRepositoryMock());
    const response = await controller.handle({ body: undefined });

    expect(response.statusCode).toBe(HttpEnumStatusCode.BAD_REQUEST);
    expect(response.body).toBe("Please specify Body");
  });

  it("should return 400 if email is invalid", async () => {
    const controller = new CreateUserController(new CreateUserRepositoryMock());
    const response = await controller.handle({
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "invalid-email",
        password: "password123",
      },
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Body email is invalid");
  });

  it("should create user and return 201 if input is valid", async () => {
    const controller = new CreateUserController(new CreateUserRepositoryMock());
    const validBody = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    };
    const response = await controller.handle({ body: validBody });
    expect(response.statusCode).toBe(HttpEnumStatusCode.CREATED);
    expect(response.body).toEqual(validBody);
  });

  it("should return 500 if an error occurs during user creation", async () => {
    const errorMockRepository: ICreateUserRepository = {
      async createUser(params: ICreateUserParams): Promise<any> {
        throw new Error("Simulated error");
      },
    };

    const controller = new CreateUserController(errorMockRepository);
    const validBody = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const response = await controller.handle({ body: validBody });

    expect(response.statusCode).toBe(HttpEnumStatusCode.SERVER_ERROR);
  });
});
