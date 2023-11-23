import jwt from "jsonwebtoken";
const privateKey: string = "soSecret";
function createToken(payload: any) {
  return jwt.sign(payload, privateKey, { expiresIn: "1d" });
}

module.exports = { createToken };
