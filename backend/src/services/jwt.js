const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJwt = (payload) => {
  return jwt.sign(payload, process.env.privateKey, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  if (!token) {
    return false;
  }
  return jwt.verify(token, process.env.privateKey);
};

const checkUser = (req, res, next) => {
  if (req.cookies.afac_token) {
    const token = verifyToken(req.cookies.afac_token);
    if (token) {
      req.token = token;
      next();
    } else {
      res.status(401).json({ msg: "Unauthorized" });
    }
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

const checkAdmin = (req, res, next) => {
  if (req.token.role === 1) {
    next();
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

module.exports = { createJwt, checkUser, checkAdmin, verifyToken };
