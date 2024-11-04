import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import formsRouter from "./routes/forms.js";
import questionRouter from "./routes/questions.js";
import answerRouter from "./routes/answers.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import salesForceRouter from "./routes/salesForceRouter.js";
import jiraRoutes from "./routes/jiraRoutes.js";

import db from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: '*',
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use("/forms", formsRouter);
app.use("/questions", questionRouter);
app.use("/answers", answerRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/salesforce", salesForceRouter);
app.use("/api/jira", jiraRoutes);

app.get("/", (req, res) => {
  res.send("Hello from server.js");
});

db.pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

app.listen(port, () => {
  console.log(`Listening at Port: ${port}`);
});
