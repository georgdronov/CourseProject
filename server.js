import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import formsRouter from "./routes/forms.js";
import questionRouter from "./routes/questions.js";
import answerRouter from "./routes/answers.js"; 
import db from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://course-project-rust-seven.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use("/forms", formsRouter);
app.use("/questions", questionRouter);
app.use("/answers", answerRouter); 

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
