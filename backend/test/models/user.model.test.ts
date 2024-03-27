import UserModel from "../../src/models/user.model";
import pool from "../../src/models/db";

jest.mock("../../src/models/db", () => ({
  query: jest.fn(),
}));

describe("UserModel", () => {
  let userModel: UserModel;

  beforeEach(() => {
    userModel = UserModel.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get user by email", async () => {
    const mockedUser = { id: 1, email: "testUser@example.com" };
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockedUser] });

    const result = await userModel.getUserByEmail("testUser@example.com");

    expect(result).toEqual(mockedUser);
    expect(pool.query).toHaveBeenCalledWith({
      text: "SELECT * FROM users WHERE email = $1",
      values: ["testUser@example.com"],
    });
  });

  it("should get user by username", async () => {
    const mockedUser = { id: 1, username: "testUser" };
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockedUser] });

    const result = await userModel.getUserByUsername("testUser");

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

    const result = await userModel.addNewUser(email, password);

    expect(result).toEqual(mockedUser);
    expect(pool.query).toHaveBeenCalledWith({
      text: "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
      values: ["testUser@example.com", "password"],
    });
  });
});
