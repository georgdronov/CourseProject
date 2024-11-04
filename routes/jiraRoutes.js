import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/create-ticket', async (req, res) => {
    const jiraUrl = 'https://course-project-rust-seven.atlassian.net/rest/api/3/issue';
    const jiraToken = process.env.ATLASSIAN_API_KEY;

    try {
        const response = await fetch(jiraUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jiraToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error(`Error creating ticket: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error fith creating ticket' });

    }
});

export default router;
