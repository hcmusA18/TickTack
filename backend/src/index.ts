import "dotenv/config";
import cors from "cors";
import express from "express";
import userRouter from "./routes/user.route";
import authMiddleware from "./middlewares/auth.middleware";
import * as admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// auth middleware
app.use(authMiddleware.authenticate);

// user router
app.use("/", userRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

export default app;
