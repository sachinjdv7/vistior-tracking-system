import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(cookieParser());
app.use(express.static("public"));

import { authRouter } from "./routes/auth.router.js";
import { userRouter } from "./routes/user.router.js";
import { visitorRouter } from "./routes/visitor.router.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/visitor", visitorRouter);

app.use("/", (req, res) => {
  res.send("Welcome to visitor tracking system!");
});

export { app };
