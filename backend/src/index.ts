import "dotenv/config";
import "module-alias/register";
import cors from "cors";
import express from "express";
import {
  userRouter,
  videoRouter,
  apiRouter,
  recsysRouter,
  musicRouter,
} from "@routes";
import { AuthController } from "@controllers";
import pool from "./repositories/db";
import passportConfig from "./config/passport";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import logger from "morgan";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
const PORT = process.env.PORT ?? 4000;

// PostgreSQL connection
pool.connect((err: Error | undefined) => {
  if (err) {
    console.error("Database connection error", err.stack);
  } else {
    console.log("Connected to database");
  }
});

// Passport configuration
passportConfig(passport);
app.use(
  session({
    secret: process.env.PASSPORT_SECRET ?? "default-secret",
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// signup and signin routes
app.post("/signup", (req, res) => {
  AuthController.getInstance().signUpByEmail(req, res);
});

app.post("/signin", (req, res) => {
  console.log(req.body);
  AuthController.getInstance().signIn(req, res);
});

app.use("/api", apiRouter);
app.use("/recsys", recsysRouter);

// auth middleware
// app.use(authMiddleware.authenticate);

app.use("/user", userRouter);
app.use("/video", videoRouter);
app.use("/music", musicRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

export default app;
