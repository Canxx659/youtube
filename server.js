const express = require('express');
const ytdl = require('@distube/ytdl-core');
const cors = require('cors');
const app = express();

app.use(cors());

// YOUTUBE KUKLA AJANI EKLEME
const agent = ytdl.createAgent(JSON.parse(process.env.COOKIES || '[]'));

app.get('/download', async (req, res) => {
    const url = req.query.url;
    try {
        // AJAN İLE İSTEK AT
        const stream = ytdl(url, { 
            filter: 'audioonly', 
            quality: 'highestaudio',
            agent: agent // Burası kritik!
        });

        res.header('Content-Disposition', 'attachment; filename="song.mp3"');
        stream.pipe(res);
    } catch (err) {
        res.status(500).send("Sunucu hatası: " + err.message);
    }
});

app.listen(process.env.PORT || 3000);