import express from "express";
import { MongoGetUsersRepository } from "../repositories/users/get-users/mongo-get-users";
import { GetUsersController } from "../controllers/users/get-users/get-users";
import { GetUserByIdController } from "../controllers/users/get-user-by-id/get-user-by-id";
import { MongoGetUserByIdRepository } from "../repositories/users/get-user-by-id/mongo-get-user-by-id";
import { DeleteUserController } from "../controllers/users/delete-user/delete-user";
import { MongoDeleteUserRepository } from "../repositories/users/delete-user/mongo-delete-user";
import { UpdateUserController } from "../controllers/users/update-user/update-user";
import { MongoUpdateUserRepository } from "../repositories/users/update-user/mongo-update-user";
import { CreateUserController } from "../controllers/users/create-user/create-user";
import { MongoCreateUserRepository } from "../repositories/users/create-user/mongo-create-user";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  const mongoGetUserRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUserRepository);
  const response = await getUsersController.handle();
  res.status(response.statusCode).send(response.body);
});
usersRouter.get("/:id", async (req, res) => {
  const mongoGetUserByIdRepository = new MongoGetUserByIdRepository();
  const getUserByIdController = new GetUserByIdController(
    mongoGetUserByIdRepository
  );
  const response = await getUserByIdController.handle({
    body: req.body,
    params: req.params,
  });
  res.status(response.statusCode).send(response.body);
});

usersRouter.post("/", async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();
  const createUserController = new CreateUserController(
    mongoCreateUserRepository
  );

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
});

usersRouter.patch("/:id", async (req, res) => {
  const mongoUpdateUserRepository = new MongoUpdateUserRepository();
  const updateUserController = new UpdateUserController(
    mongoUpdateUserRepository
  );
  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

usersRouter.delete("/:id", async (req, res) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository();
  const deleteUserController = new DeleteUserController(
    mongoDeleteUserRepository
  );
  const { body, statusCode } = await deleteUserController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default usersRouter;
