import pool from "./db";

class UserModel {
  private static instance: UserModel | null = null;
  constructor() {
    // do something
  }

  static getInstance(): UserModel {
    if (UserModel.instance === null) {
      UserModel.instance = new UserModel();
    }
    return UserModel.instance;
  }

  getUserByUsername = async (username: string) => {
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

  getUserByEmail = async (email: string) => {
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

  addNewUser = async (email: string, password: string) => {
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
}

export default UserModel;
