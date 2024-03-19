import userModel from "../models/user.model";
import { hashPassword } from "./password.service";

class UserService {
  private static instance: UserService | null = null;
  constructor() {
    // do something
  }
  static getInstance(): UserService {
    if (UserService.instance === null) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }
  getUserByUsername = async (username: string) => {
    try {
      const user = await userModel.getUserByUsername(username);
      return user;
    } catch (error) {
      throw new Error(`Error when getting user by username: ${error}`);
    }
  };
  // LocalStrategy
  addNewUser = async (username: string, password: string) => {
    const isExist = await userModel.getUserByUsername(username);
    if (isExist) {
      throw new Error("Username already exist");
    }

    const hashedPassword = await hashPassword(password);
    try {
      const user = await userModel.addNewUser(username, hashedPassword);
      return user;
    } catch (error) {
      throw new Error(`Error when adding new user: ${error}`);
    }
  };
}

export default UserService.getInstance();
