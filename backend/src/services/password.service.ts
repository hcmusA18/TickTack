import "crypto";
import crypto from "crypto";

class PasswordService {
  private static instance: PasswordService | null = null;
  constructor() {
    // do something
  }
  static getInstance(): PasswordService {
    if (PasswordService.instance === null) {
      PasswordService.instance = new PasswordService();
    }
    return PasswordService.instance;
  }

  hashPassword = async (password: string) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const buf = await crypto.scryptSync(password, salt, 64);
    return `${buf.toString("hex")}.${salt}`;
  };

  comparePassword = async (password: string, storedPassword: string) => {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = Buffer.from(hashedPassword, "hex");
    const hashedPasswordBuf = await crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(buf, hashedPasswordBuf);
  };
}

export { PasswordService };
