- `npm init`

- pkg.json mein type: module

- add `express` to the project and copy the starter code to the project

- add `nodemon` as dev dependency => to continously monitor changes in node application

- update scripts in pkg.json file:

  ```json
   "scripts": {
   	"start": "node src/server.js", // exact location of main file
   	"dev": "nodemon src/server.js" // exact location of main file
   },
  ```

- then use this command to run the project: `npm run commandName`. Ex: `npm run start` or `npm run dev` and u can see the output of get req on either `http://localhost:${port}` or `http://127.0.0.1:${port}`

- create .env file and add sensitive data to it like `PORT`

- create `.gitignore` file and go to [gitignore generator](https://mrkandreev.name/snippets/gitignore-generator/) and search `node` in the search bar, create gitignore data there and copy that data into the local `.gitignore` file. Make sure `.env` file is mentioned inside the `.gitignore` file.

- add `dotenv` to the project and use it to access the env variables inside the project securely. Import dotenv to the code like below so that some extra things can be added to the config of the dotenv later on as per requirement:

  ```javascript
  import dotenv from "dotenv";

  dotenv.config();
  ```

- add cors pkg to the project and use it like this:

  ```javascript
  import cors from "cors";

  app.use(
  	cors({
  		origin: [`http://localhost:${port}`],
  		credentials: true,
  		methods: ["GET", "POST", "DELETE", "OPTIONS"],
  		allowedHeaders: ["Content-Type", "Authorization"],
  	})
  );
  ```

- after that, add these 2 lines of code:

  ```javascript
  app.use(express.json());

  app.use(
  	express.urlencoded({
  		extended: true,
  	})
  );
  ```

  - 1st line will allow express to access the json data send by the client via `req.body`
  - 2nd line will allow express to perform url encoding on the data sent via the url

- after this, install `mongoose` to the project and connect DB.

> till here, basic boilerplate code for a express project is done
