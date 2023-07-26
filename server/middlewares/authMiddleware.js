const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "You must be logged in." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "You must be logged in." });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "You must be logged in." });
  }
};

module.exports = authMiddleware;
