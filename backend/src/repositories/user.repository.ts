import { QueryConfig } from "pg";
import pool from "./db";
import { UserModel } from "@models";

class UserRepository {
  private static instance: UserRepository | null = null;

  static getInstance(): UserRepository {
    if (UserRepository.instance === null) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  getUserInfoCommentInfo = async (
    userId: number,
  ): Promise<UserModel | null> => {
    const query = {
      text: "select user_id , username, email , avatar  from users u where user_id = $1",
      values: [userId],
    };
    try {
      const result = await pool.query(query);
      const res = result.rows[0];
      return res;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  getUserByUsername = async (username: string): Promise<UserModel | null> => {
    const query = {
      text: "SELECT * FROM users WHERE username = $1",
      values: [username],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  getUserById = async (id: string): Promise<UserModel | null> => {
    const query = {
      text: "SELECT * FROM users WHERE user_id = $1",
      values: [id],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  getUserByEmail = async (email: string): Promise<UserModel | null> => {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  addNewUser = async (
    email: string,
    password: string,
  ): Promise<UserModel | null> => {
    const regis_date = new Date().getTime().toString();
    const query = {
      text: "INSERT INTO users(email, password, regis_date) VALUES($1, $2, $3) RETURNING *",
      values: [email, password, regis_date],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0];
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
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);

    // Generating the SET part of the SQL query dynamically based on the fields to be updated
    const setQuery = fields
      .map((field, index) => `${field} = $${index + 2}`)
      .join(", ");

    // Ensure values are appropriately typed
    const queryValues: Array<string | number | null> = [id, ...values];

    const query: QueryConfig = {
      text: `UPDATE users SET ${setQuery} WHERE user_id = $1 RETURNING *`,
      values: queryValues,
    };

    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating user: ${(error as Error).message}`);
    }
  };

  // Delete: Remove a user by ID
  deleteUser = async (id: string): Promise<boolean> => {
    const query = {
      text: "DELETE FROM users WHERE id = $1",
      values: [id],
    };

    try {
      await pool.query(query);
      return true;
    } catch (error) {
      throw new Error(`Error deleting user: ${(error as Error).message}`);
    }
  };
  getAllUserIds = async (): Promise<number[]> => {
    const query = {
      text: "SELECT user_id FROM users",
    };
    try {
      const result = await pool.query(query);
      return result.rows.map((user) => user.user_id);
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  getUsersByKeyword = async (
    keyword: string,
    getFull: boolean,
  ): Promise<UserModel[]> => {
    const query = {
      text: getFull
        ? "SELECT * FROM users WHERE username ILIKE $1"
        : "SELECT username FROM users WHERE username ILIKE $1",
      values: [`%${keyword}%`],
    };
    try {
      const result = await pool.query(query);
      // map to UserModel
      return result.rows.map((user) => {
        return {
          userId: user.user_id,
          username: user.username,
          email: user.email,
          password: user.password,
          avatar: user.avatar,
          bio: user.bio,
          regisDate: user.regis_date,
        };
      });
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
}

export { UserRepository };
