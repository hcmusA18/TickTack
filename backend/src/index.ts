import "dotenv/config";
import cors from "cors";
import express from "express";
import userRouter from "./routes/user.route";
import authMiddleware from "./middlewares/auth.middleware";
import pool from "./models/db";
import passportConfig from "./config/passport";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
const PORT = process.env.PORT || 4000;

// PostgreSQL connection
pool.connect((err: Error) => {
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

app.use(cors());
app.use(express.json());

// auth middleware
app.use(authMiddleware.authenticate);

// user router
app.use("/", userRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

export default app;
