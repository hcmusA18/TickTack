import "dotenv/config";
import "module-alias/register";
import cors from "cors";
import express from "express";
import { userRouter, videoRouter, apiRouter, recsysRouter } from "@routes";
import authMiddleware from "./middlewares/auth.middleware";
import { AuthController } from "@controllers";
import pool from "./repositories/db";
import passportConfig from "./config/passport";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";

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
    secret: process.env.PASSPORT_SECRET || "default-secret",
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

/// allow from localhost:8051 and localhost:5000
app.use(
  cors({
    origin: [
      "http://localhost:8051",
      "http://localhost:5173",
      "https://7f92-113-172-122-34.ngrok-free.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());

// signup and signin routes
app.post("/signup", (req, res) => {
  AuthController.getInstance().signUpByEmail(req, res);
});

app.post("/signin", (req, res) => {
  AuthController.getInstance().signIn(req, res);
});

app.use("/api", apiRouter);
app.use("/recsys", recsysRouter);

// auth middleware
app.use(authMiddleware.authenticate);

app.use("/user", userRouter);
app.use("/video", videoRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

export default app;
