const express = require('express');
const ytdl = require('@distube/ytdl-core'); // Kütüphane ismini değiştirdik
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/download', async (req, res) => {
    const url = req.query.url;
    if (!ytdl.validateURL(url)) return res.status(400).send('Geçersiz link');

    try {
        // Videoyu getir
        const info = await ytdl.getInfo(url);
        
        // Ses akışını al
        const audioStream = ytdl(url, { 
            filter: 'audioonly', 
            quality: 'highestaudio' 
        });

        res.header('Content-Disposition', `attachment; filename="song.mp3"`);
        audioStream.pipe(res);
        
    } catch (err) {
        console.error("Hata:", err);
        res.status(500).send("Sunucu hatası: " + err.message);
    }
});

app.listen(process.env.PORT || 3000);