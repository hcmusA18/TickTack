import pool from "./db";
import UserModel from "../models/user.model";
import { QueryConfig } from "pg";

class UserRepository {
  private static instance: UserRepository | null = null;
  constructor() {
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
}

export default UserRepository;
