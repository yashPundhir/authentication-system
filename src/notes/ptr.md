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
