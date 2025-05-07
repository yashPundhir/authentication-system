import crypto from "crypto";

import User from "../models/User.model.js";

export const registerUser = async (req, res) => {
	// get data from user
	// validate data
	// check if user already exists
	// create a user in DB
	// create a verification token
	// save token in DB
	// send token as email to user
	// send success status to user

	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({
			message: "All fields are required",
		});
	}

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({
				message: "user already exists",
			});
		}

		const newlyCreatedUser = await User.create({
			name,
			email,
			password,
		});

		if (!newlyCreatedUser) {
			return res.status(400).json({
				message: "user not registered",
			});
		}

		const token = crypto.randomBytes(32).toString("hex");

		newlyCreatedUser.verificationToken = token;

		await newlyCreatedUser.save();
	} catch (error) {}
};
