import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import { connectToDB } from "./utils/db.js";

// import all routes
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(
	cors({
		origin: [`http://localhost:${port}`, `${process.env.BASE_URL}:${port}`],
		credentials: true,
		methods: ["GET", "POST", "DELETE", "OPTIONS"], // methods mentioned here are not case sensitive
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(express.json());

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/home", (req, res) => {
	res.send("This is home route");
});

app.get("/about", (req, res) => {
	res.send("This is about route");
});

// Connect to DB

connectToDB();

// user routes

app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
