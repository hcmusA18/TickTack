import UserModel from "../../src/models/user.model";
import pool from "../../src/models/db";

// Mock the pool.query method
jest.mock("../../src/models/db", () => ({
  query: jest.fn(),
}));

describe("UserModel", () => {
  let userModel: UserModel;

  beforeEach(() => {
    // Initialize UserModel
    userModel = UserModel.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get user by username", async () => {
    const mockedUser = { id: 1, username: "testUser", password: "password" };
    // Mock the pool.query method to resolve with a mocked user
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockedUser] });

    const result = await userModel.getUserByUsername("testUser");

    expect(result).toEqual(mockedUser);
    expect(pool.query).toHaveBeenCalledWith({
      text: "SELECT * FROM users WHERE username = $1",
      values: ["testUser"],
    });
  });

  it("should add a new user", async () => {
    const username = "testUser";
    const password = "password";
    const mockedUser = { id: 1, username, password };

    // Mock the pool.query method to resolve with a mocked user
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockedUser] });

    const result = await userModel.addNewUser(username, password);

    expect(result).toEqual(mockedUser);
    expect(pool.query).toHaveBeenCalledWith({
      text: "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
      values: ["testUser", "password"],
    });
  });
});
