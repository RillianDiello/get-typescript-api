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

## Runs

This project can be run with Docker, but if you prefer, you can use Mongo Atlas, that it's a cloud focused on Mongo DB. I used docker at my location and to deploy I am using Mongo Atlas.
If you choose Atlas, you will need to change the database settings in the .env file, but everything else will work the same.

Another note is that I'm using Yarn as my package manager and I run the project using `yarn dev` or `yarn test` . You can check this in package.json

Another observation is that I am using `docker-composer commands` to run my docker files. And before running the project, you need to bring the database container online. Otherwise, when trying to run the test option, for example. You will get some errors when tests try to access the database
