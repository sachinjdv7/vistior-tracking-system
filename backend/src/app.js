import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.router.js";
import { userRouter } from "./routes/user.router.js";
import { visitorRouter } from "./routes/visitor.router.js";

const app = express();

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/visitor", visitorRouter);


app.use("/", (req, res) => {
  res.send("Welcome to visitor tracking system!");
});

export { app };
