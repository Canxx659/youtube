const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/download', async (req, res) => {
    const url = req.query.url;
    if (!ytdl.validateURL(url)) return res.status(400).send('Geçersiz URL');
    
    res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
    ytdl(url, { filter: 'audioonly', quality: 'highestaudio' }).pipe(res);
});

app.listen(process.env.PORT || 3000);