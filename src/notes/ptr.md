- in express, while making routes, never make routes like: `login`, make routes like: `/login`

  > routes always starts from `/`

  wrong approach =>

  ```javascript
  app.get("login", (req, res) => {
  	// logic here
  });
  ```

  correct approach =>

  ```javascript
  app.get("/login", (req, res) => {
  	// logic here
  });
  ```

- in mongodb, when creating database username and password, always be cautious when creating the password. password should only contain alphabets and numbers (don't use special characters bcz it may result in DB connection error)

- whenver import something, make sure to specify the file alongwith the file extension:

  ```javascript
  import { connectToDB } from "./utils/db.js";
  ```

- whenever some change is done in the .env file, always restart the server so that changes would reflect in the output

- when naming files inside `models` folder, start with capital letter:

  - user.model.js => not standard practice
  - User.model.js => standard practice

- when working with financial data, it is always advised to store financial data in paise (or in the smallest unit of that current working currency) => (lowest possible currency)

- schema in DB is basically creating blocks to store data (basically wrt tables defining what are the columns in a table & wrt noSQL data, defining keys for the key-value pairs of the data object)

- make first letter of the file capital only for model files, for rest of the files follow camel case:

  - User.model.js
  - user.controllers.js

- after segregating the routes and defining them in routes folder, use them in server.js like this:

  ```javascript
  // import the routes file
  import userRoutes from "./routes/user.routes.js";

  app.use("/api/v1/users", userRoutes); // correct

  app.use("/api/v1/users/", userRoutes); // wrong
  ```

- when working with backend, data comes from user via either req body or query params or via cookies
