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

- validation libraries: zod, yup, formik, express-validator

- tools for sending emails: nodemailer, resend

- we can use nodemailer to send email, but nodemailer requires some crucial info to send email. To avoid that, we can use mailtrap to create fake email account for testing purpose.

- postgreSQL can be used with neon DB.

- while writing hooks for schemas, always use normal js funcs as in hooks we cannot use arrow funcs as callbacks.

- during user login, we created JWT token and gave it to user cookies. Now for each route: `/login` `/profile` `/forgotPassword` `/resetPassword`, we always have to check first whether the user is authenticated or not, and then only we can proceed with the specific functionality of the route. This thing is achieved using middleware.

- in middlewares, a `next()` flag is always passed at the end so that respective controller starts execution.

- middlewares are always used in the routes.

  - For ex:

    ```javascript
    router.get("/profile", isLoggedIn, userProfile); // isLoggedIn => middleware & userProfile=> controller
    ```

  - In the above written code example, we don't execute the middlewares and controllers there only, rather we pass reference to those methods which are called when user visits that particular route. And this is called `event driven architecture`

  - after the task of middleware is done, then to move to controller, we use `next()` flag to do so and thus we pass it end at the end of the middleware. but as we use `try-catch` block to handle errors in middlewares also, we use `next()` in `try` block also at the end to move to controller. But this creates error as in this `next()` is called twice => `1st time in try block and 2nd time at the end of middleware func definition`. To avoid this, inside the `try` block, use `next()` with `return` like this=> `return next()` and then at the end of middleware func definition, simply call `next()`. So, with this, if `try` block succeed, `next()` is called with return, so the other `next()` won't be called, but if `try` block fails, then `next()` flag at the end of func definition is called to pass control to controller.
