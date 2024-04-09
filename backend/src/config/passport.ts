import { Strategy as LocalStrategy } from "passport-local";
import userService from "../services/user.service";
import { comparePassword } from "../services/password.service";
import { PassportStatic } from "passport";
import UserModel from "../models/user.model";
import { log } from "console";

const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await userService.getInstance().getUserByEmail(email);
          console.log("User: ", user);
          if (!user || !(await comparePassword(password, user.password))) {
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
      const user = await userService.getInstance().getUserByEmail(email);
      done(null, user as UserModel);
    } catch (error) {
      done(error);
    }
  });
};

export default passportConfig;
