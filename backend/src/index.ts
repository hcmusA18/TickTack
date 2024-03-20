import "dotenv/config";
import cors from "cors";
import express from "express";
import userRouter from "./routes/user.route";
import authMiddleware from "./middlewares/auth.middleware";
import pool from "./models/db";

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

app.use(cors());
app.use(express.json());

// auth middleware
app.use(authMiddleware.authenticate);

// user router
app.use("/", userRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

export default app;
