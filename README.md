# Users API

This project was created based on the video created by Felipe Mota Rocha, you can access it [here](https://youtu.be/gU3kp7Aw0JI). Basically I extended the application to a more professional routing pattern, made some changes to the typing of Typescript elements and included some automatic tests.

The main idea was to create a project that is interesting for students who are starting out at Typescript, but at the same time interesting for workers who want to understand concepts about SOLID, Dependency Injection, Repository Pattern and Automatic Testing.

## Technologies

- NodeJs: NodeJS is a server-side JavaScript execution environment. You can seamlessly use NPM alongside the Yarn package manager with just a few command adjustments.

- Express: is a framework for building APIs that provides a convenient abstraction for NodeJS's http module. It allows for easy incorporation of routes, routers, middlewares, templates, engines, and also features a robust error-handling mechanism

- TypeScript: is a expanding programming language that enhances JavaScript with typing, allowing the creation of custom types, interfaces, Enums, and other features that strengthen code structure and organizational concepts in object-oriented programming

- MongoDB: is a widely used NoSQL database that stores data in a flexible document format similar to JSON. MongoDB doesn't use fixed schemas offering high scalability and performance

- Jest: is a widely-used JavaScript testing framework for testing code, including applications, libraries and components. While popular for testing React applications, it's versatie and can be applied to any JavaScript project.

## Concepts

- SOLID
- Dependency Injection
- Repository Pattern
- Unit tests

## Entity

<pre>
User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}</pre>

## Routes

- GET /users - returns users saved in the database
- GET /users/:id - return data from a specific database user
- POST /users - create an user
- PATCH /users/:id - update an user
- DELETE /users/:id - deleta an user

## Plus

- Docker to mongoDB
- ESLint
