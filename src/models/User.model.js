import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
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
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			maxlength: 16,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
		},
		// verificationTokenExpiry: {
		// 	type: Date,
		// },
		resetPasswordToken: {
			type: String,
		},
		resetPasswordTokenExpiry: {
			type: Date,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
