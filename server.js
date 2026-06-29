const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/download', async (req, res) => {
    const url = req.query.url;
    if (!ytdl.validateURL(url)) return res.status(400).send('Geçersiz link');

    try {
        // İndirme bilgilerini al
        const info = await ytdl.getInfo(url);
        // En iyi ses formatını seç
        const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
        
        res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp3"`);
        ytdl(url, { format: format }).pipe(res);
    } catch (err) {
        console.error("İndirme hatası:", err);
        res.status(500).send("Sunucu hatası: " + err.message);
    }
});

app.listen(process.env.PORT || 3000);