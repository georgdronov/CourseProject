import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import formsRouter from "./routes/forms.js";
import db from "./db.js"; 

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/forms", formsRouter);

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
