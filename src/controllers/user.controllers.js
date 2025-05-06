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
};
