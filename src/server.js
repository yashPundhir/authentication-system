import express from "express";

import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/home", (req, res) => {
	res.send("This is home route");
});

app.get("/about", (req, res) => {
	res.send("This is about route");
});

app.get("/contact", (req, res) => {
	res.send("This is contact route");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
