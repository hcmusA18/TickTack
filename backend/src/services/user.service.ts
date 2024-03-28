import UserModel from "../models/user.model";
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
      const user = await UserModel.getInstance().getUserByUsername(username);
      return user;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`Error when getting user by username: ${_error.message}`);
    }
  };

  getUserByEmail = async (email: string) => {
    try {
      const user = await UserModel.getInstance().getUserByEmail(email);
      return user;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`Error when getting user by email: ${_error.message}`);
    }
  };

  addNewUser = async (email: string, password: string) => {
    try {
      const isExist = await this.getUserByEmail(email);
      if (isExist) {
        throw new Error("Email already exist");
      }

      const hashedPassword = await hashPassword(password);

      const user = await UserModel.getInstance().addNewUser(
        email,
        hashedPassword,
      );
      return user;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`Error when adding a new user: ${_error.message}`);
    }
  };
}

export default UserService;
