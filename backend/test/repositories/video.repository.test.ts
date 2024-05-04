import { VideoModel } from "@models";
import { VideoRepository } from "@repositories";
import pool from "@repositories/db";

// Mock the pool.query method to simulate database queries
jest.mock("@repositories/db", () => ({
  query: jest.fn(),
}));

describe("VideoRepository", () => {
  let videoRepository: VideoRepository;

  beforeEach(() => {
    videoRepository = VideoRepository.getInstance();
    jest.clearAllMocks();
  });

  describe("getVideoById", () => {
    it("should return video by videoId", async () => {
      const videoId = 1;
      const video: VideoModel = {
        videoId,
        userId: 1,
        text: "test video",
        createTime: 123456789,
        videoUrl: "test video url",
        duration: 60,
        musicId: "testMusicId",
        hashtags: ["test", "video"],
        privacy: "public",
        viewCount: 0,
      };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [video] });

      const result = await videoRepository.getVideoById(videoId);

      expect(result).toEqual(video);
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT * FROM videos WHERE video_id = $1",
        values: [videoId],
      });
    });

    it("should throw an error if database query fails", async () => {
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(videoRepository.getVideoById(1)).rejects.toThrow(
        errorMessage,
      );
    });

    it("should return null if video is not found", async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

      const result = await videoRepository.getVideoById(1);

      expect(result).toBeNull();
    });
  });

  describe("addNewVideo", () => {
    it("should create a new video", async () => {
      const video: VideoModel = {
        userId: 1,
        text: "test video",
        createTime: 123456789,
        videoUrl: "test video url",
        duration: 60,
        musicId: "testMusicId",
        hashtags: ["test", "video"],
        privacy: "public",
        viewCount: 0,
      };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [video] });

      const result = await videoRepository.addNewVideo(video);

      expect(result).toEqual(video);
      expect(pool.query).toHaveBeenCalledWith({
        text: `INSERT INTO videos(user_id, text, create_time, video_url, duration, music_id, hashtags, privacy, view_count) VALUES($1, $2, $3, $4, $5, ${
          video.musicId
        }, ${VideoRepository.stringArrayConverter(
          video.hashtags,
        )}, $6, $7) RETURNING *`,
        values: [
          video.userId.toString(),
          video.text,
          video.createTime.toString(),
          video.videoUrl,
          video.duration.toString(),
          (video.privacy ?? "public").toString(),
          (video.viewCount ?? 0).toString(),
        ],
      });
    });

    it("should throw an error if database query fails", async () => {
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        videoRepository.addNewVideo({
          userId: 1,
          text: "test video",
          createTime: 123456789,
          videoUrl: "test video url",
          duration: 60,
          musicId: "testMusicId",
          hashtags: ["test", "video"],
          privacy: "public",
          viewCount: 0,
        }),
      ).rejects.toThrow(errorMessage);
    });

    it("should throw an error if text contain SQL injection", async () => {
      await expect(
        videoRepository.addNewVideo({
          userId: 1,
          text: "test video'; DROP TABLE videos; --",
          createTime: 123456789,
          videoUrl: "test video url",
          duration: 60,
          musicId: "testMusicId",
          hashtags: ["test", "video"],
          privacy: "public",
          viewCount: 0,
        }),
      ).rejects.toThrow("SQL injection detected");
    });
  });

  describe("removeVideo", () => {
    it("should remove video by videoId and return true", async () => {
      const videoId = 1;
      (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 1 });

      const result = await videoRepository.removeVideo(videoId);

      expect(result).toBe(true);
      expect(pool.query).toHaveBeenCalledWith({
        text: `DELETE FROM videos WHERE video_id = $1`,
        values: [videoId.toString()],
      });
    });

    it("should throw an error if database query fails", async () => {
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(videoRepository.removeVideo(1)).rejects.toThrow(
        errorMessage,
      );
    });
  });

  describe("setPrivacy", () => {
    it("should set privacy of video by videoId", async () => {
      const videoId = 1;
      const privacy = "private";
      const video: VideoModel = {
        videoId,
        userId: 1,
        text: "test video",
        createTime: 123456789,
        videoUrl: "test video url",
        duration: 60,
        musicId: "testMusicId",
        hashtags: ["test", "video"],
        privacy,
        viewCount: 0,
      };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [video] });

      const result = await videoRepository.setPrivacy(videoId, privacy);

      expect(result).toEqual(video);
      expect(pool.query).toHaveBeenCalledWith({
        text: `UPDATE videos SET privacy = $1 WHERE video_id = $2 RETURNING *`,
        values: [privacy, videoId.toString()],
      });
    });

    it("should throw an error if database query fails", async () => {
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(videoRepository.setPrivacy(1, "private")).rejects.toThrow(
        errorMessage,
      );
    });
  });
});
