import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 100,
	},
	email: {
		type: String,
		required: true,
	},
});

const User = mongoose.model("User", userSchema);

export default User;
