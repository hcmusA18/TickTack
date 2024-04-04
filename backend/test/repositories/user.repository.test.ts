import UserRepository from "../../src/repositories/user.repository";
import pool from "../../src/repositories/db";

jest.mock("../../src/repositories/db", () => ({
  query: jest.fn(),
}));

describe("UserRepository", () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = UserRepository.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get user by email", async () => {
    const mockedUser = { id: 1, email: "testUser@example.com" };
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockedUser] });

    const result = await userRepository.getUserByEmail("testUser@example.com");

    expect(result).toEqual(mockedUser);
    expect(pool.query).toHaveBeenCalledWith({
      text: "SELECT * FROM users WHERE email = $1",
      values: ["testUser@example.com"],
    });
  });

  it("should get user by username", async () => {
    const mockedUser = { id: 1, username: "testUser" };
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockedUser] });

    const result = await userRepository.getUserByUsername("testUser");

    expect(result).toEqual(mockedUser);
    expect(pool.query).toHaveBeenCalledWith({
      text: "SELECT * FROM users WHERE username = $1",
      values: ["testUser"],
    });
  });

  it("should add a new user", async () => {
    const email = "testUser@example.com";
    const password = "password";
    const mockedUser = { id: 1, email, password };

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockedUser] });

    const result = await userRepository.addNewUser(email, password);

    expect(result).toEqual(mockedUser);
    expect(pool.query).toHaveBeenCalledWith({
      text: "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
      values: ["testUser@example.com", "password"],
    });
  });

  it("should throw error when getting user by email", async () => {
    const error = new Error("Test error");
    (pool.query as jest.Mock).mockRejectedValueOnce(error);

    const email = "testUser@example.com";
    await expect(userRepository.getUserByEmail(email)).rejects.toThrow(error);
  });

  it("should throw error when getting user by username", async () => {
    const error = new Error("Test error");
    (pool.query as jest.Mock).mockRejectedValueOnce(error);

    const username = "testUser";
    await expect(userRepository.getUserByUsername(username)).rejects.toThrow(
      error,
    );
  });

  it("should throw error when adding a new user", async () => {
    const error = new Error("Test error");
    (pool.query as jest.Mock).mockRejectedValueOnce(error);

    const email = "testUser@example.com";
    const password = "password";
    await expect(userRepository.addNewUser(email, password)).rejects.toThrow(
      error,
    );
  });
});
