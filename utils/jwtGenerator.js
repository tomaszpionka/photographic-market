const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(process.env.PWD, ".env") });
const jwt = require("jsonwebtoken");

function jwtGenerator(user_id) {
  const payload = {
    user: {
      id: user_id,
    },
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
}

module.exports = jwtGenerator;
