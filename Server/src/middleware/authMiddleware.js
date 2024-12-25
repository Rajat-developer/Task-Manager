const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token (after "Bearer ")
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. Invalid token format." });
  }

  try {
    const verified = jwt.verify(token, "secret_key"); // Verify the token
    req.user = verified; // Add the decoded payload to `req.user`
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authenticate;
