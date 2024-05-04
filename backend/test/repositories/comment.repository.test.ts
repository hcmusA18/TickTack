import { CommentRepository } from "@repositories";
import pool from "@repositories/db";

jest.mock("@repositories/db", () => ({
  query: jest.fn(),
}));

describe("CommentRepository", () => {
  let commentRepository: CommentRepository;

  beforeEach(() => {
    commentRepository = CommentRepository.getInstance();
    jest.clearAllMocks();
  });

  describe("countCommentsByVideoId", () => {
    it("should return the count of comments for a video", async () => {
      const videoId = 123;
      const count = 5;
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ count }] });

      const result = await commentRepository.countCommentsByVideoId(videoId);

      expect(result).toEqual(count);
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT COUNT(1) FROM comments WHERE video_id = $1",
        values: [videoId],
      });
    });

    it("should throw an error if query fails", async () => {
      const videoId = 123;
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        commentRepository.countCommentsByVideoId(videoId),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("createComment", () => {
    it("should create a new comment and return it", async () => {
      const userId = 1;
      const videoId = 123;
      const commentText = "Great video!";
      const time = 1234567890n;
      const mockNewComment = {
        /* comment properties */
      };
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [mockNewComment],
      });

      const result = await commentRepository.createComment(
        userId,
        videoId,
        commentText,
        time,
      );

      expect(result).toEqual(mockNewComment);
      expect(pool.query).toHaveBeenCalledWith({
        text: "INSERT INTO comments(user_id, video_id, comment_text, time) VALUES($1, $2, $3, $4) RETURNING *",
        values: [userId, videoId, commentText, time],
      });
    });

    it("should throw an error if query fails", async () => {
      const userId = 1;
      const videoId = 123;
      const commentText = "Great video!";
      const time = 1234567890n;
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        commentRepository.createComment(userId, videoId, commentText, time),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("getCommentsByVideoId", () => {
    it("should return all comments for a video", async () => {
      const videoId = 123;
      const mockComments = [
        {
          /* comment properties */
        },
      ];
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockComments });

      const result = await commentRepository.getCommentsByVideoId(videoId);

      expect(result).toEqual(mockComments);
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT * FROM comments WHERE video_id = $1",
        values: [videoId],
      });
    });

    it("should throw an error if query fails", async () => {
      const videoId = 123;
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        commentRepository.getCommentsByVideoId(videoId),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("updateComment", () => {
    it("should update a comment and return it", async () => {
      const userId = 1;
      const videoId = 123;
      const time = 1234567890n;
      const newCommentText = "Updated comment";
      const mockUpdatedComment = {
        /* updated comment properties */
      };
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [mockUpdatedComment],
      });

      const result = await commentRepository.updateComment(
        userId,
        videoId,
        time,
        newCommentText,
      );

      expect(result).toEqual(mockUpdatedComment);
      expect(pool.query).toHaveBeenCalledWith({
        text: "UPDATE comments SET comment_text = $4 WHERE user_id = $1 AND video_id = $2 AND time = $3 RETURNING *",
        values: [userId, videoId, time, newCommentText],
      });
    });

    it("should throw an error if query fails", async () => {
      const userId = 1;
      const videoId = 123;
      const time = 1234567890n;
      const newCommentText = "Updated comment";
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        commentRepository.updateComment(userId, videoId, time, newCommentText),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("deleteComment", () => {
    it("should delete a comment and return true", async () => {
      const userId = 1;
      const videoId = 123;
      const time = 1234567890;
      (pool.query as jest.Mock).mockResolvedValueOnce({});

      const result = await commentRepository.deleteComment(
        userId,
        videoId,
        time,
      );

      expect(result).toBe(true);
      expect(pool.query).toHaveBeenCalledWith({
        text: "DELETE FROM comments WHERE user_id = $1 AND video_id = $2 AND time = $3",
        values: [userId, videoId, time],
      });
    });

    it("should throw an error if query fails", async () => {
      const userId = 1;
      const videoId = 123;
      const time = 1234567890;
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        commentRepository.deleteComment(userId, videoId, time),
      ).rejects.toThrow(errorMessage);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
