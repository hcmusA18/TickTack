import { SocialRepository } from "@repositories";
import pool from "@repositories/db";

jest.mock("@repositories/db", () => ({
  query: jest.fn(),
}));

describe("SocialRepository", () => {
  let socialRepository: SocialRepository;

  beforeEach(() => {
    socialRepository = SocialRepository.getInstance();
    jest.clearAllMocks();
  });

  describe("countFollowers", () => {
    it("should return the number of followers for a user", async () => {
      const userId = 1;
      const count = 5;
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ count }] });

      const result = await socialRepository.countFollowers(userId);

      expect(result).toEqual(count);
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT COUNT(*) FROM socials WHERE following_id = $1",
        values: [userId],
      });
    });

    it("should throw an error if database query fails", async () => {
      const userId = 1;
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(socialRepository.countFollowers(userId)).rejects.toThrow(
        errorMessage,
      );
    });
  });

  describe("countFollowing", () => {
    it("should return the number of users a user is following", async () => {
      const userId = 1;
      const count = 5;
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ count }] });

      const result = await socialRepository.countFollowing(userId);

      expect(result).toEqual(count);
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT COUNT(*) FROM socials WHERE user_id = $1",
        values: [userId],
      });
    });

    it("should throw an error if database query fails", async () => {
      const userId = 1;
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(socialRepository.countFollowing(userId)).rejects.toThrow(
        errorMessage,
      );
    });
  });

  describe("getFollowing", () => {
    it("should return a list of users the user is following", async () => {
      const userId = 1;
      const users = [
        { user_id: 2, username: "user2", avatar: "avatar2" },
        { user_id: 3, username: "user3", avatar: "avatar3" },
      ];
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: users });

      const result = await socialRepository.getFollowing(userId);

      expect(result).toEqual([
        { userId: 2, username: "user2", avatar: "avatar2" },
        { userId: 3, username: "user3", avatar: "avatar3" },
      ]);
      expect(pool.query).toHaveBeenCalledWith({
        text: `
        SELECT u.user_id, u.username, u.avatar
        FROM socials s
        JOIN users u ON s.following_id = u.user_id
        WHERE s.user_id = $1
      `,
        values: [userId],
      });
    });

    it("should throw an error if database query fails", async () => {
      const userId = 1;
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(socialRepository.getFollowing(userId)).rejects.toThrow(
        errorMessage,
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
