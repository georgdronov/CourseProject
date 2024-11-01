import express from "express";
import bcrypt from "bcryptjs";
import db from "../db.js";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

router.post(
  "/register",
  [
    body("username").isString().notEmpty().withMessage("Username is required"),
    body("password")
      .isString()
      .isLength({ min: 1 })
      .withMessage("Password must be at least 1 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await db.pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
        [username, hashedPassword]
      );

      res
        .status(201)
        .json({
          message: "User registered successfully",
          userId: result.rows[0].id,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.post(
  "/login",
  [
    body("username").isString().notEmpty().withMessage("Username is required"),
    body("password")
      .isString()
      .isLength({ min: 1 })
      .withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const result = await db.pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      if (result.rows.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const user = result.rows[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
