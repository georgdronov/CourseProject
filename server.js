import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import formsRouter from "./routes/forms.js"; 

dotenv.config();

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool
  .connect()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Error connecting to DB", err));

app.use("/forms", formsRouter);

app.get("/", (req, res) => {
  res.send("Hello from server.js");
});

app.listen(port, () => {
  console.log(`Listening at Port: ${port}`);
});
