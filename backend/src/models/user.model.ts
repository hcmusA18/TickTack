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
      throw `${error}`;
    }
  };

  addNewUser = async (username: string, password: string) => {
    const query = {
      text: "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
      values: [username, password],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      throw `${error}`;
    }
  };
}

export default UserModel;
