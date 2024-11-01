import express from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js'; 
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/register', [
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully', userId: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
