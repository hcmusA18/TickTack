import { Strategy as LocalStrategy } from "passport-local";
import userService from "../services/user.service";
import { comparePassword } from "../services/password.service";
import { PassportStatic } from "passport";

const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      async (username, password, done) => {
        try {
          const user = await userService.getUserByUsername(username);
          if (!user || !(await comparePassword(password, user.password))) {
            return done(null, false, {
              message: "Invalid username or password.",
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.deserializeUser(async (username: string, done) => {
    try {
      const user = await userService.getUserByUsername(username);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default passportConfig;
