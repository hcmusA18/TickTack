import { Strategy as LocalStrategy } from "passport-local";
import { UserService, PasswordService } from "@services";
import { PassportStatic } from "passport";
import { UserModel } from "../models/user.model";

const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await UserService.getInstance().getUserByEmail(email);
          if (
            !user ||
            !(await PasswordService.getInstance().comparePassword(
              password,
              user.password,
            ))
          ) {
            return done(null, false, {
              message: "Invalid email or password.",
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email: string, done) => {
    try {
      const user = await UserService.getInstance().getUserByEmail(email);
      done(null, user as UserModel);
    } catch (error) {
      done(error);
    }
  });
};

export default passportConfig;
