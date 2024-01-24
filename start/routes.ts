/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/auth/register", "AuthController.register");
  Route.post("/auth/login", "AuthController.login");

  Route.get('/books', "BookController.index");
  Route.get('/books/:id', "BookController.show");
  Route.post('/books', "BookController.store").middleware("auth");
  Route.put('/books/:id', "BookController.update").middleware("auth");
  Route.delete('/books/:id', "BookController.destroy").middleware("auth");
}).prefix("/api/v1");

Route.get("/", () => {
  return "protected";
}).middleware("auth");
