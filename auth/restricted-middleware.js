const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const Users = require("../users/users-model.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // bad token
        res.status(401).json({ message: "wutdahek?" });
      } else {
        //decodedToken
        req.decodedJwt = decodedToken;
        next();
        // yay us
      }
    });
  } else {
    res.status(401).json({ message: "You do not pass" });
  }
};
