import "dotenv/config";
import cors from "cors";
import express from "express";
import userRouter from "./routes/user.route";
import authMiddleware from "./middlewares/auth.middleware";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// auth middleware
app.use(authMiddleware.authenticate);

// user router
app.use("/", userRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

export default app;
