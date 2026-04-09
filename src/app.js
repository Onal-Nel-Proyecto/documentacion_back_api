import express from 'express';
import cors from 'cors';
import drive from './config.js';
const app = express(); 
app.use(cors());
app.use(express.json());
app.get('/', async (req, res) => {
  const data = await drive.files.list({
    pageSize: 10,
    fields: "files(id, name, mimeType, webViewLink, webContentLink, thumbnailLink, modifiedTime)"
  })

  res.json(data.data.files);
});

const PORT = process.env.PORT || 3000;

export default app;