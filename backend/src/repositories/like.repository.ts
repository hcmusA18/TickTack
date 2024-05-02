import pool from "./db";
import { LikeModel, DisLikeModel } from "@models";

class LikeRepository {
  private static instance: LikeRepository | null = null;
  static getInstance(): LikeRepository {
    if (LikeRepository.instance === null) {
      LikeRepository.instance = new LikeRepository();
    }

    return LikeRepository.instance;
  }

  existsLike = async (user_id: number, video_id: number): Promise<boolean> => {
    // Query to check if a like exists for the given user and video
    const checkQuery = {
      text: "SELECT user_id FROM likes WHERE user_id = $1 AND video_id = $2",
      values: [user_id, video_id],
    };

    try {
      // Execute the check query to see if a like exists
      const result = await pool.query(checkQuery);
      // If a like exists, return true
      if (result.rows.length > 0) {
        return true;
      } else {
        // If a like does not exist, return false
        return false;
      }
    } catch (error) {
      const _error = error as Error;
      console.error("Error checking like:", _error);
      throw new Error(`Error checking like: ${_error.message}`);
    }
  };

  addLike = async (like: LikeModel): Promise<LikeModel> => {
    const { user_id, video_id, time } = like;
    const query = {
      text: "INSERT INTO likes (user_id, video_id, time) VALUES ($1, $2, $3) RETURNING *",
      values: [user_id, video_id, time],
    };

    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      const _error = error as Error;
      console.error("Error adding like:", _error);
      throw new Error(`Error adding like: ${_error.message}`);
    }
  };

  removeLike = async (user_id: number, video_id: number): Promise<boolean> => {
    const query = {
      text: "DELETE FROM likes WHERE user_id = $1 AND video_id = $2",
      values: [user_id, video_id],
    };

    try {
      const result = await pool.query(query);

      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      const _error = error as Error;
      console.error("Error removing like:", _error);
      throw new Error(`Error removing like: ${_error.message}`);
    }
  };

  addDisLike = async (like: DisLikeModel): Promise<DisLikeModel> => {
    const { user_id, video_id, time } = like;
    const query = {
      text: "INSERT INTO dislikes (user_id, video_id, time) VALUES ($1, $2, $3) RETURNING *",
      values: [user_id, video_id, time],
    };

    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      const _error = error as Error;
      console.error("Error adding like:", _error);
      throw new Error(`Error adding like: ${_error.message}`);
    }
  };

  removeDisLike = async (
    user_id: number,
    video_id: number,
  ): Promise<boolean> => {
    const query = {
      text: "DELETE FROM dislikes WHERE user_id = $1 AND video_id = $2",
      values: [user_id, video_id],
    };

    try {
      const result = await pool.query(query);

      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      const _error = error as Error;
      console.error("Error removing like:", _error);
      throw new Error(`Error removing like: ${_error.message}`);
    }
  };

  countLikesByVideoId = async (video_id: number): Promise<number> => {
    const query = {
      text: "SELECT COUNT(1) AS like_count FROM likes WHERE video_id = $1",
      values: [video_id],
    };

    try {
      const result = await pool.query(query);
      // Extract like_count from the first row in the result set
      return parseInt(result.rows[0].like_count, 10);
    } catch (error) {
      const _error = error as Error;
      console.error("Error counting likes:", _error);
      throw new Error(`Error counting likes: ${_error.message}`);
    }
  };

  getAllLikes = async (): Promise<LikeModel[]> => {
    try {
      const result = await pool.query("SELECT * FROM likes");
      return result.rows;
    } catch (error) {
      const _error = error as Error;
      console.error("Error retrieving likes:", _error);
      throw new Error(`Error retrieving likes: ${_error.message}`);
    }
  };
}

export { LikeRepository };
