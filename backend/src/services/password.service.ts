import "crypto";
import crypto from "crypto";

const hashPassword = async (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const buf = await crypto.scryptSync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
};

const comparePassword = async (password: string, storedPassword: string) => {
  const [hashedPassword, salt] = storedPassword.split(".");
  const buf = Buffer.from(hashedPassword, "hex");
  const hashedPasswordBuf = await crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(buf, hashedPasswordBuf);
};

export { hashPassword, comparePassword };
