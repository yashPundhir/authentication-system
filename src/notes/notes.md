- in terms of DB, schema refers to the blueprint/data structure of a particular type of data. It defines what the data should look like — what fields it has, what types those fields are, whether they are required, etc.

  - `ex: user => name, email, password, role`

### Ques: what are models in db and what are schemas in db and how are they different form each other

Great question! In the context of **databases**, especially when using **MongoDB with Mongoose** or **SQL with ORMs like Sequelize**, terms like **models** and **schemas** come up often.

Let’s break them down in **easy words** and show how they are different:

---

## 🔹 What is a **Schema**?

A **schema** is like a **blueprint or structure** for your data.
It defines **what the data should look like** — what fields it has, what types those fields are, whether they are required, etc.

### 🧱 Think of it like a **form template**:

If you're making a user registration form, your schema might define:

- Name: String
- Email: String (required)
- Age: Number

---

## 🔹 What is a **Model**?

A **model** is a **usable object based on the schema** that lets you interact with the actual database.
You use the model to **create**, **read**, **update**, or **delete** documents (in MongoDB) or rows (in SQL).

### 🤖 Think of it like a **machine that uses the blueprint**:

- The **schema** defines the shape of your car 🚗.
- The **model** lets you actually **build cars**, **find cars**, or **delete them**.

---

## ✅ Example with Mongoose (MongoDB):

```javascript
const mongoose = require("mongoose");

// Define a schema
const userSchema = new mongoose.Schema({
	name: String,
	email: { type: String, required: true },
	age: Number,
});

// Create a model using that schema
const User = mongoose.model("User", userSchema);

// Use the model to create a user
const newUser = new User({
	name: "Alice",
	email: "alice@example.com",
	age: 25,
});
newUser.save();
```

### 🔍 Summary:

- `userSchema` → defines the **structure** (Schema)
- `User` → is the **model**, used to **create/read/write** data

---

## 📌 Key Differences:

| Feature        | Schema                                      | Model                              |
| -------------- | ------------------------------------------- | ---------------------------------- |
| What is it?    | Blueprint/structure of the data             | Tool to interact with the database |
| Role           | Defines fields, types, validation           | Performs operations (CRUD)         |
| Can be reused? | Yes, you can use one schema for many models | Usually tied to a collection/table |
| Example        | `userSchema`                                | `User` (created using schema)      |

---

### Ques: give me with the syntax of creating a schema in mongoDB using mongoose. specify how to define datatypes along with all the constraints used

Here's the syntax for creating a schema in MongoDB using **Mongoose**, along with how to define data types and various constraints:

---

### ✅ **Basic Syntax**

```js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExampleSchema = new Schema({
	fieldName: {
		type: DataType,
		required: true, // Makes the field mandatory
		unique: true, // Ensures value is unique across documents
		default: "value", // Sets a default value
		enum: ["A", "B"], // Restricts values to specified list
		minlength: 3, // For strings: minimum length
		maxlength: 50, // For strings: maximum length
		min: 0, // For numbers: minimum value
		max: 100, // For numbers: maximum value
		match: /regex/, // For strings: regex pattern matching
		validate: {
			validator: function (val) {
				return customCondition(val);
			},
			message: "Custom error message",
		},
		// more constraints depending on type
	},
});
```

---

### ✅ **Supported Mongoose Data Types**

| Mongoose Type | Description                                     |
| ------------- | ----------------------------------------------- |
| `String`      | Textual data                                    |
| `Number`      | Numeric values                                  |
| `Boolean`     | `true` or `false`                               |
| `Date`        | Date objects                                    |
| `Buffer`      | Binary data                                     |
| `ObjectId`    | MongoDB ObjectId (`ref` is used for population) |
| `Array`       | Arrays of any type (e.g., `[String]`)           |
| `Mixed`       | Any type (use `Schema.Types.Mixed`)             |
| `Map`         | Map of key-value pairs                          |

---

### ✅ **Example Schema**

```js
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 100,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
	},
	age: {
		type: Number,
		min: 0,
		max: 120,
		default: 18,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	tags: {
		type: [String],
		validate: {
			validator: function (arr) {
				return arr.length > 0;
			},
			message: "A user must have at least one tag",
		},
	},
	profile: {
		type: Schema.Types.ObjectId,
		ref: "Profile",
	},
});
```

---

### ✅ **Creating a Model**

```js
const User = mongoose.model("User", userSchema);
```
