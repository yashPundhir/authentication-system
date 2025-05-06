- boilerplate code for defining schema:

  ```javascript
  import mongoose from "mongoose";

  const userSchema = new mongoose.Schema();

  const User = mongoose.model("User", userSchema);

  export default User;
  ```

- boilerplate code for defining routes in `express`:

  ```javascript
  import express from "express";

  const router = express.Router();

  export default router;
  ```

- after segregating the routes and defining them in routes folder, use them in server.js like this:

  ```javascript
  // import the routes file
  import userRoutes from "./routes/user.routes.js";

  app.use("/api/v1/users", userRoutes);
  ```

  - now every request will be sent to `userRoutes` when coming to `/api/v1/users/*`
