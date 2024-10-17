const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret"; // Use the same secret here

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id; // Save user ID for further use
    next(); // Proceed to the next middleware or route handler
  });
};
