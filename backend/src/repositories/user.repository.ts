import pool from "./db";
import { UserModel } from "@models";

class UserRepository {
  private static instance: UserRepository | null = null;
  private constructor() {
    // do something
  }

  static getInstance(): UserRepository {
    if (UserRepository.instance === null) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

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
    const query = {
      text: "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
      values: [email, password],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
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
