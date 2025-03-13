import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/home", (req, res) => {
	res.send("This is home route");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
