const jwt = require("jsonwebtoken");
const config = require("../config");

function jwtGenerator(user_id) {
  const payload = {
    user: {
      id: user_id
    }
  };

  return jwt.sign(payload, config.secret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;
