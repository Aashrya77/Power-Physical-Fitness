const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Authentication invalid: Missing or malformed token");
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  try {
    // Verify the token
    const data = await jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = {
      userId: data.userId,
      name: data.name, // Assuming 'name' is correct in token payload
      email: data.email, // Assuming 'email' is correct in token payload
      role: data.role, // Provide a default value if 'role' is undefined
    };

    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    return res.status(401).send("Authentication invalid: Token verification failed");
  }
};

module.exports = authentication;
