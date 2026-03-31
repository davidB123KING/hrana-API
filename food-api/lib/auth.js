import jwt from "jsonwebtoken";

const SECRET = "mysecret";

export function generateToken(user) {
  return jwt.sign(user, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}