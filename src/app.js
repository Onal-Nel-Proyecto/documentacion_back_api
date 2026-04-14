import express from 'express';
import cors from 'cors';
import router from './routes/drive.routes.js';
const app = express(); 
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.redirect('/api/imagenes');
});



const PORT = process.env.PORT || 3000;

export default app;