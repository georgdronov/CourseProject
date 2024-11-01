import { Router } from "express";
import db from "../db.js";

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params; 
  console.log(`Fetching user with ID: ${id}`); 
  
  try {
    const result = await db.query("SELECT id, username FROM users WHERE id = $1", [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' }); 
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error); 
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
