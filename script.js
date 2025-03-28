require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.use(express.static('public')); // Serve frontend files

app.get('/get-video', async (req, res) => {
    const videoId = req.query.videoId;
    const API_KEY = process.env.YOUTUBE_API_KEY; // Secure API key
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'API request failed' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
