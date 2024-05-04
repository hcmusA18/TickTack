import { MusicRepository } from "@repositories";
import pool from "@repositories/db";

jest.mock("@repositories/db", () => ({
  query: jest.fn(),
}));

describe("MusicRepository", () => {
  let musicRepository: MusicRepository;

  beforeEach(() => {
    musicRepository = MusicRepository.getInstance();
    jest.clearAllMocks();
  });

  describe("getMusicById", () => {
    it("should return null if music is not found", async () => {
      const musicId = "nonexistent_id";
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

      const result = await musicRepository.getMusicById(musicId);

      expect(result).toBeNull();
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT * FROM musics WHERE music_id = $1",
        values: [musicId],
      });
    });

    it("should return the music if found", async () => {
      const musicId = "existing_id";
      const mockMusic = {
        /* music properties */
      };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockMusic] });

      const result = await musicRepository.getMusicById(musicId);

      expect(result).toEqual(mockMusic);
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT * FROM musics WHERE music_id = $1",
        values: [musicId],
      });
    });

    it("should throw an error if query fails", async () => {
      const musicId = "existing_id";
      const errorMessage = "Query failed";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(musicRepository.getMusicById(musicId)).rejects.toThrow(
        errorMessage,
      );
    });
  });

  describe("getAllMusic", () => {
    it("should return all music if from and limit are undefined", async () => {
      const mockMusicList = [
        {
          /* music properties */
        },
      ];
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockMusicList });

      const result = await musicRepository.getAllMusic(undefined, undefined);

      expect(result).toEqual(mockMusicList);
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT * FROM musics",
      });
    });

    it("should return limited music if from and limit are defined", async () => {
      const from = 0;
      const limit = 10;
      const mockMusicList = [
        {
          /* music properties */
        },
      ];
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockMusicList });

      const result = await musicRepository.getAllMusic(from, limit);

      expect(result).toEqual(mockMusicList);
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT * FROM musics ORDER BY music_id OFFSET $1 LIMIT $2",
        values: [from, limit],
      });
    });

    it("should throw an error if query fails", async () => {
      const errorMessage = "Query failed";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        musicRepository.getAllMusic(undefined, undefined),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("addNewMusic", () => {
    it("should add new music and return it", async () => {
      const musicName = "New Song";
      const musicAuthor = "New Author";
      const musicUrl = "http://example.com";
      const mockNewMusic = {
        /* music properties */
      };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockNewMusic] });

      const result = await musicRepository.addNewMusic(
        musicName,
        musicAuthor,
        musicUrl,
      );

      expect(result).toEqual(mockNewMusic);
      expect(pool.query).toHaveBeenCalledWith({
        text: "INSERT INTO musics(music_name, music_author, music_url) VALUES($1, $2, $3) RETURNING *",
        values: [musicName, musicAuthor, musicUrl],
      });
    });

    it("should throw an error if query fails", async () => {
      const musicName = "New Song";
      const musicAuthor = "New Author";
      const musicUrl = "http://example.com";
      const errorMessage = "Query failed";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        musicRepository.addNewMusic(musicName, musicAuthor, musicUrl),
      ).rejects.toThrow(errorMessage);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
