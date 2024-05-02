import { UserModel } from "@models";
import { UserRepository } from "@repositories";
import { PasswordService } from "@services";

class UserService {
  private static instance: UserService | null = null;
  static getInstance(): UserService {
    if (UserService.instance === null) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  getUserByUsername = async (username: string): Promise<UserModel | null> => {
    try {
      const user =
        await UserRepository.getInstance().getUserByUsername(username);
      return user;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  getUserById = async (id: string): Promise<UserModel | null> => {
    try {
      const user = await UserRepository.getInstance().getUserById(id);
      return user;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  getUserByEmail = async (email: string): Promise<UserModel | null> => {
    try {
      const user = await UserRepository.getInstance().getUserByEmail(email);
      return user;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  addNewUser = async (
    email: string,
    password: string,
  ): Promise<UserModel | null> => {
    try {
      if (email === "") {
        throw new Error("Email is required");
      }

      const isExist = await this.getUserByEmail(email);
      if (isExist) {
        throw new Error("Email already exist");
      }

      const hashedPassword =
        await PasswordService.getInstance().hashPassword(password);

      const user = await UserRepository.getInstance().addNewUser(
        email,
        hashedPassword,
      );
      return user;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  // Update: Update user details
  updateUser = async (
    id: string,
    updateData: Partial<UserModel>,
  ): Promise<UserModel | null> => {
    try {
      // Assuming updateData can include any user fields such as email, username, etc.
      return await UserRepository.getInstance().updateUser(id, updateData);
    } catch (error) {
      throw new Error(`Error updating user: ${(error as Error).message}`);
    }
  };

  // Delete: Remove a user by ID
  deleteUser = async (id: string): Promise<boolean> => {
    try {
      await UserRepository.getInstance().deleteUser(id);
      return true;
    } catch (error) {
      throw new Error(`Error deleting user: ${(error as Error).message}`);
    }
  };
  getAllUserIds = async (): Promise<number[]> => {
    try {
      const userIds = await UserRepository.getInstance().getAllUserIds();
      return userIds;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  getUsersByKeyword = async (
    keyword: string,
    getFull: boolean | null = null,
  ): Promise<UserModel[]> => {
    try {
      getFull = getFull ?? false;
      const users = await UserRepository.getInstance().getUsersByKeyword(
        keyword,
        getFull,
      );

      if (users.length === 0) {
        throw new Error("No user found");
      }

      return users;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
}

export { UserService };
