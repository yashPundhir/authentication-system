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

- then use this command to run the project: `npm run commandName`. Ex: `npm run start` or `npm run dev`

- create .env file and add sensitive data to it like `PORT`

- create `.gitignore` file and go to [gitignore generator](https://mrkandreev.name/snippets/gitignore-generator/) and search `node` in the search bar, create gitignore data there and copy that data into the local `.gitignore` file. Make sure `.env` file is mentioned inside the `.gitignore` file.

- add `dotenv` to the project and use it to access the env variables inside the project securely
