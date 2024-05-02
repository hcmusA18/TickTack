import { QueryConfig } from "pg";
import { CommentModel } from "../models";
import pool from "./db";

class CommentRepository {
  private static instance: CommentRepository | null = null;

  static getInstance(): CommentRepository {
    if (!CommentRepository.instance) {
      CommentRepository.instance = new CommentRepository();
    }
    return CommentRepository.instance;
  }

  countCommentsByVideoId = async (videoId: number): Promise<number> => {
    const query: QueryConfig = {
      text: "SELECT COUNT(1) FROM comments WHERE video_id = $1",
      values: [videoId],
    };
    try {
      const result = await pool.query(query);
      return parseInt(result.rows[0].count);
    } catch (error) {
      const _error = error as Error;
      throw new Error(`Error counting comments: ${_error.message}`);
    }
  };

  // Create a new comment
  createComment = async (
    userId: number,
    videoId: number,
    commentText: string,
    time: bigint,
  ): Promise<CommentModel> => {
    const query: QueryConfig = {
      text: "INSERT INTO comments(user_id, video_id, comment_text, time) VALUES($1, $2, $3, $4) RETURNING *",
      values: [userId, videoId, commentText, time],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      const _error = error as Error;
      throw new Error(`Error creating comment: ${_error.message}`);
    }
  };

  // Get all comments for a video
  getCommentsByVideoId = async (videoId: number): Promise<CommentModel[]> => {
    const query: QueryConfig = {
      text: "SELECT * FROM comments WHERE video_id = $1",
      values: [videoId],
    };
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`Error creating comment: ${_error.message}`);
    }
  };

  // Update a comment
  updateComment = async (
    userId: number,
    videoId: number,
    time: bigint,
    newCommentText: string,
  ): Promise<CommentModel> => {
    const query: QueryConfig = {
      text: "UPDATE comments SET comment_text = $4 WHERE user_id = $1 AND video_id = $2 AND time = $3 RETURNING *",
      values: [userId, videoId, time, newCommentText],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      const _error = error as Error;
      throw new Error(`Error creating comment: ${_error.message}`);
    }
  };

  // Delete a comment
  deleteComment = async (
    userId: number,
    videoId: number,
    time: number,
  ): Promise<boolean> => {
    const query: QueryConfig = {
      text: "DELETE FROM comments WHERE user_id = $1 AND video_id = $2 AND time = $3",
      values: [userId, videoId, time],
    };
    try {
      await pool.query(query);
      return true;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`Error creating comment: ${_error.message}`);
    }
  };
}

export { CommentRepository };
