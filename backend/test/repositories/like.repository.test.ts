import { LikeModel } from "@models";
import { LikeRepository } from "@repositories";
import pool from "@repositories/db";

jest.mock("@repositories/db", () => ({
  query: jest.fn(),
}));

describe("LikeRepository", () => {
  let likeRepository: LikeRepository;

  beforeEach(() => {
    likeRepository = LikeRepository.getInstance();
    jest.clearAllMocks();
  });

  describe("existsLike", () => {
    it("should return true if a like exists", async () => {
      const user_id = 1;
      const video_id = 1;
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [{ user_id, video_id }],
      });

      const result = await likeRepository.existsLike(user_id, video_id);

      expect(result).toEqual(true);
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT * FROM likes WHERE user_id = $1 AND video_id = $2",
        values: [user_id, video_id],
      });
    });

    it("should return false if a like does not exist", async () => {
      const user_id = 1;
      const video_id = 1;
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

      const result = await likeRepository.existsLike(user_id, video_id);

      expect(result).toEqual(false);
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT * FROM likes WHERE user_id = $1 AND video_id = $2",
        values: [user_id, video_id],
      });
    });

    it("should throw an error if database query fails", async () => {
      const user_id = 1;
      const video_id = 1;
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        likeRepository.existsLike(user_id, video_id),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("addLike", () => {
    it("should return the added like", async () => {
      const like: LikeModel = {
        user_id: 1,
        video_id: 1,
        time: 123456789,
      };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [like] });

      const result = await likeRepository.addLike(like);

      expect(result).toEqual(like);
      expect(pool.query).toHaveBeenCalledWith({
        text: "INSERT INTO likes (user_id, video_id, time) VALUES ($1, $2, $3) RETURNING *",
        values: [like.user_id, like.video_id, like.time],
      });
    });

    it("should throw an error if database query fails", async () => {
      const like: LikeModel = {
        user_id: 1,
        video_id: 1,
        time: 123456789,
      };
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(likeRepository.addLike(like)).rejects.toThrow(errorMessage);
    });
  });

  describe("removeLike", () => {
    it("should return true if a like is removed", async () => {
      const user_id = 1;
      const video_id = 1;
      (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 1 });

      const result = await likeRepository.removeLike(user_id, video_id);

      expect(result).toEqual(true);
      expect(pool.query).toHaveBeenCalledWith({
        text: "DELETE FROM likes WHERE user_id = $1 AND video_id = $2",
        values: [user_id, video_id],
      });
    });

    it("should return false if a like is not removed", async () => {
      const user_id = 1;
      const video_id = 1;
      (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 0 });

      const result = await likeRepository.removeLike(user_id, video_id);

      expect(result).toEqual(false);
      expect(pool.query).toHaveBeenCalledWith({
        text: "DELETE FROM likes WHERE user_id = $1 AND video_id = $2",
        values: [user_id, video_id],
      });
    });

    it("should throw an error if database query fails", async () => {
      const user_id = 1;
      const video_id = 1;
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        likeRepository.removeLike(user_id, video_id),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("countLikesByVideoId", () => {
    it("should return the number of likes for a video", async () => {
      const video_id = 1;
      const count = 5;
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [{ like_count: count }],
      });

      const result = await likeRepository.countLikesByVideoId(video_id);

      expect(result).toEqual(count);
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT COUNT(1) AS like_count FROM likes WHERE video_id = $1",
        values: [video_id],
      });
    });

    it("should throw an error if database query fails", async () => {
      const video_id = 1;
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        likeRepository.countLikesByVideoId(video_id),
      ).rejects.toThrow(errorMessage);
    });
  });
});
