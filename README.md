# Users API

This project was created based on the video created by Felipe Mota Rocha, you can access it [here](https://youtu.be/gU3kp7Aw0JI). Basically I extended the application to a more professional routing pattern, made some changes to the typing of Typescript elements and included some automatic tests.

The main idea was to create a project that is interesting for students who are starting out at Typescript, but at the same time interesting for workers who want to understand concepts about SOLID, Dependency Injection, Repository Pattern and Automatic Testing.

## Technologies

- NodeJs: is a server-side JavaScript execution environment. You can seamlessly use NPM alongside the Yarn package manager with just a few command adjustments.

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
- Validator NodeJS
- ESLint

# Run

This project was developed to run with Docker. However, for those who prefer an alternative, it is possible to use Mongo Atlas, a cloud platform specialized in MongoDB. In my local configuration I used Docker, while for deployment I opted for Mongo Atlas.

If you decide to use Atlas, be sure to modify the database settings in the .env file. The remaining general functionality and operation of the project will remain consistent.

Another note is that I chose Yarn as the package manager for this project. To run the project, you can use `yarn dev` or `yarn test` and you can find these commands specified in the package.json file.

Also, it's important to note that I used `docker-compose` to manage my Docker files. Before starting the project, make sure the database container is up and running. Failure to do so may result in errors, especially when trying to perform certain functionality, such as running tests that depend on database access.

# References

Original repository [Original repository ](https://github.com/felipemotarocha/users-typescript-api)
