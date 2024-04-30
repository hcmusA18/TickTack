import "module-alias/register";
import { UserService } from "@services";
import { UserRepository } from "@repositories";
import { PasswordService } from "@services";

jest.mock("@repositories/user.repository", () => ({
  UserRepository: {
    getInstance: jest.fn(() => ({
      getUserByUsername: jest.fn(),
      getUserByEmail: jest.fn(),
      addNewUser: jest.fn(),
    })),
  },
}));

jest.mock("@services/password.service", () => ({
  PasswordService: {
    getInstance: jest.fn(() => ({
      hashPassword: jest.fn(),
    })),
  },
}));

describe("UserService", () => {
  let userService: UserService;
  let mockedUserRepository: UserRepository;
  let mockedPasswordService: PasswordService;

  beforeEach(() => {
    mockedUserRepository = {
      getUserByUsername: jest.fn(),
      getUserByEmail: jest.fn(),
      addNewUser: jest.fn(),
    } as unknown as UserRepository;
    jest
      .spyOn(UserRepository, "getInstance")
      .mockReturnValue(mockedUserRepository);

    mockedPasswordService = {
      hashPassword: jest.fn(),
    } as unknown as PasswordService;
    jest
      .spyOn(PasswordService, "getInstance")
      .mockReturnValue(mockedPasswordService);

    userService = UserService.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get user by username", async () => {
    const mockedUser = {
      id: 1,
      username: "testUser",
      email: "test@example.com",
    };
    (mockedUserRepository.getUserByUsername as jest.Mock).mockResolvedValueOnce(
      mockedUser,
    );

    const result = await userService.getUserByUsername("testUser");

    expect(result).toEqual(mockedUser);
    expect(mockedUserRepository.getUserByUsername).toHaveBeenCalledWith(
      "testUser",
    );
  });

  it("should get user by email", async () => {
    const mockedUser = {
      id: 1,
      username: "testUser",
      email: "test@example.com",
    };
    (mockedUserRepository.getUserByEmail as jest.Mock).mockResolvedValueOnce(
      mockedUser,
    );

    const result = await userService.getUserByEmail("test@example.com");

    expect(result).toEqual(mockedUser);
    expect(mockedUserRepository.getUserByEmail).toHaveBeenCalledWith(
      "test@example.com",
    );
  });

  it("should add a new user", async () => {
    const email = "test@example.com";
    const password = "password";
    const hashedPassword = "hashedPassword";

    (mockedUserRepository.getUserByEmail as jest.Mock).mockResolvedValueOnce(
      null,
    );

    (mockedPasswordService.hashPassword as jest.Mock).mockResolvedValueOnce(
      hashedPassword,
    );

    const newUser = { id: 1, email, password: hashedPassword };
    (mockedUserRepository.addNewUser as jest.Mock).mockResolvedValueOnce(
      newUser,
    );

    const result = await userService.addNewUser(email, password);

    expect(result).toEqual(newUser);
    expect(mockedUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
    expect(mockedPasswordService.hashPassword).toHaveBeenCalledWith(password);
    expect(mockedUserRepository.addNewUser).toHaveBeenCalledWith(
      email,
      hashedPassword,
    );
  });

  it("should throw an error if email already exists when adding a new user", async () => {
    (mockedUserRepository.getUserByEmail as jest.Mock).mockResolvedValueOnce({
      id: 1,
    });

    const email = "test@example.com";
    const password = "password";

    await expect(userService.addNewUser(email, password)).rejects.toThrow(
      "Email already exist",
    );
  });

  it("should throw an error if email is empty when adding a new user", async () => {
    (mockedUserRepository.getUserByEmail as jest.Mock).mockResolvedValueOnce({
      id: 1,
    });

    const email = "";
    const password = "password";

    await expect(userService.addNewUser(email, password)).rejects.toThrow(
      "Email is required",
    );
  });
});
