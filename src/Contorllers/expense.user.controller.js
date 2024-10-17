const jwt = require("jsonwebtoken");
const users = require("../Models/expense.user.model");

const JWT_SECRET = "thismysecrettoken"; // Change this to a more secure secret in production

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, userName: user.userName, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Respond with user data and token
    res.send({
      id: user._id,
      userName: user.userName,
      email: user.email,
      token, // Send token to client
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
};
