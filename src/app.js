import express from 'express';
import cors from 'cors';
import drive from './config.js';
import driveRoutes from './routes/drive.routes.js';
const app = express(); 
app.use(cors());
app.use(express.json());
app.use('/api', driveRoutes);

app.get('/', (req, res) => {
  res.redirect('/api');
});



const PORT = process.env.PORT || 3000;

export default app;