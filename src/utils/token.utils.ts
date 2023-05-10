import * as jwt from "jsonwebtoken";
import "dotenv/config";

export const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.SECRET_KEY!, { expiresIn: "24h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.SECRET_KEY!);
};
