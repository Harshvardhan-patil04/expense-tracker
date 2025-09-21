const User = require("../models/User");

async function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const [username, password] = Buffer.from(base64Credentials, "base64").toString("ascii").split(":");

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: "Invalid username or password" });

  const valid = await user.checkPassword(password);
  if (!valid) return res.status(401).json({ error: "Invalid username or password" });

  req.user = user; // attach user to request
  next();
}

module.exports = basicAuth;
