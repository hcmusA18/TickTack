import { UserModel } from "@models";
import { UserRepository } from "@repositories";
import pool from "@repositories/db";

// Mock the pool.query method to simulate database queries
jest.mock("@repositories/db", () => ({
  query: jest.fn(),
}));

describe("UserRepository", () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = UserRepository.getInstance();
    jest.clearAllMocks();
  });

  describe("getUserByUsername", () => {
    it("should return user by username", async () => {
      const username = "testUser";
      const user: UserModel = {
        userId: 1,
        username,
        email: "test@example.com",
        password: "hashedPassword",
        bio: "test bio",
        avatar: "test image",
        regisDate: 123456789,
      };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [user] });

      const result = await userRepository.getUserByUsername(username);

      expect(result).toEqual(user);
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT * FROM users WHERE username = $1",
        values: [username],
      });
    });

    it("should throw an error if database query fails", async () => {
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        userRepository.getUserByUsername("testUser"),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("getUserByEmail", () => {
    it("should return user by email", async () => {
      const email = "test@example.com";
      const user: UserModel = {
        userId: 1,
        username: "testUser",
        email,
        password: "hashedPassword",
        bio: "test bio",
        avatar: "test image",
        regisDate: 123456789,
      };
      const responseUser = {
        user_id: user.userId,
        username: user.username,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        bio: user.bio,
        regis_date: user.regisDate,
      };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [responseUser] });

      const result = await userRepository.getUserByEmail(email);
      expect(result).toEqual(user);
      expect(pool.query).toHaveBeenCalledWith({
        text: "SELECT * FROM users WHERE email = $1",
        values: [email],
      });
    });

    it("should throw an error if database query fails", async () => {
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        userRepository.getUserByEmail("test@example.com"),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("addNewUser", () => {
    it("should add a new user", async () => {
      const email = "test@example.com";
      const password = "hashedPassword";
      const newUser: UserModel = {
        userId: 1,
        username: "testUser",
        email,
        password,
        bio: "test bio",
        avatar: "test image",
        regisDate: 123456789,
      };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [newUser] });

      const result = await userRepository.addNewUser(email, password);

      expect(result).toEqual(newUser);
    });

    it("should throw an error if database query fails", async () => {
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        userRepository.addNewUser("test@example.com", "hashedPassword"),
      ).rejects.toThrow(errorMessage);
    });
  });
});
