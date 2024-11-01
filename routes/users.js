import express from 'express';
import db from "../db.js";

const router = express.Router();

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const [user] = await db.query('SELECT id, username FROM users WHERE id = ?', [userId]);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 
