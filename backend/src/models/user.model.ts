class UserModel {
  userId?: number;
  username: string;
  email: string;
  password: string;
  avatar: string | null;
  bio: string | null;
  regisDate: number;

  constructor(
    userId: number,
    username: string,
    email: string,
    password: string,
    avatar: string | null,
    bio: string | null,
    regisDate: number,
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.bio = bio;
    this.regisDate = regisDate;
  }
}

export default UserModel;
