import crypto from "crypto";

import nodemailer from "nodemailer";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

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

		// Send email to user
		const transporter = nodemailer.createTransport({
			host: process.env.MAILTRAP_HOST,
			port: process.env.MAILTRAP_PORT,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.MAILTRAP_USERNAME,
				pass: process.env.MAILTRAP_PASSWORD,
			},
		});

		const mailOption = {
			from: process.env.MAILTRAP_SENDEREMAIL,
			to: newlyCreatedUser.email,
			subject: "Verify your account",
			text: `Paste the given link in your browser to verify your account: ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
			html: `
				<div style="font-family: Arial, sans-serif; line-height: 1.6;">
					<h2>Verify Your Account</h2>
					<p>Thank you for signing up! Please click the link below to verify your email address:</p>
					<a href="${process.env.BASE_URL}/api/v1/users/verify/${token}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
						Verify Account
					</a>
					<p>If the button doesn't work, copy and paste this link into your browser:</p>
					<p>
						${process.env.BASE_URL}/api/v1/users/verify/${token}
					</p>
				</div>
			`,
		};

		await transporter.sendMail(mailOption);

		res.status(201).json({
			message: "user registered successfully",
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			message: "user not registered",
			error: error,
			success: false,
		});
	}
};

export const verifyUser = async (req, res) => {
	// fetch token from the url
	// validate token
	// find user based on token
	// handle if not found case
	// set isVerified to true
	// remove verification token
	// save changes to DB
	// send success message

	const { token } = req.params;

	if (!token) {
		return res.status(400).json({
			success: false,
			message: "invalid token.",
		});
	}

	try {
		const existingUserToBeVerified = await User.findOne({
			verificationToken: token,
		});

		if (!existingUserToBeVerified) {
			return res.status(400).json({
				message: "invalid token",
			});
		}

		existingUserToBeVerified.isVerified = true;

		existingUserToBeVerified.verificationToken = undefined;

		await existingUserToBeVerified.save();

		res.status(201).json({
			success: true,
			message: "user verified successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error,
			message: "user not verified",
		});
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			success: false,
			message: "Both email & password are required",
		});
	}

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return res.status(400).json({
				success: false,
				message: "invalid email or password",
			});
		}

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect) {
			return res.status(400).json({
				success: false,
				message: "invalid password",
			});
		}

		if (!existingUser.isVerified) {
			return res.status(400).json({
				success: false,
				message: "User is not verified. Please verify your email",
			});
		}

		const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRY_TIME,
		});

		const cookieOptions = {
			maxAge: 24 * 60 * 60 * 1000,
			httpOnly: true,
			secure: true,
		};

		res.cookie("token", token, cookieOptions);

		res.status(200).json({
			success: true,
			message: "user logged in successfully",
			token,
			user: {
				id: existingUser._id,
				name: existingUser.name,
				role: existingUser.role,
			},
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: "user login failed",
		});
	}
};

export const userProfile = async (req, res) => {
	try {
		const userId = req.user.id;

		const existingUser = await User.findById(userId).select("-password");

		if (!existingUser) {
			return res.status(400).json({
				success: false,
				message: "User not found",
			});
		}

		// console.log(existingUser);

		res.status(200).json({
			success: true,
			userInfo: {
				name: existingUser.name,
				email: existingUser.email,
				role: existingUser.role,
				isVerified: existingUser.isVerified,
			},
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

export const logoutUser = async (req, res) => {
	// simply clear the cookies

	try {
		const cookieOptions = {
			maxAge: 24 * 60 * 60 * 1000,
			httpOnly: true,
			secure: true,
		};

		res.cookie("token", null, cookieOptions);
	} catch (error) {}
};
