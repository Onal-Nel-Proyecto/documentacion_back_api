import express from 'express';
import cors from 'cors';
import router from './routes/drive.routes.js';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
const app = express(); 
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  })
);

app.get('/test', (req, res) => {
  res.send("OK");
});

app.get('/', (req, res) => {
  res.redirect('/api/imagenes');
});

export default app;