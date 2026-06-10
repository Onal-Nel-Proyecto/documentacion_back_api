import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import router from './routes/drive.routes.js';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();

// ── Seguridad ─────────────────────────────────────────────────
app.use(helmet());

// ── Compresión (gzip) ─────────────────────────────────────────
app.use(compression());

// ── CORS ──────────────────────────────────────────────────────
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin: allowedOrigins.length > 0
    ? allowedOrigins
    : ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET'],
};

app.use(cors(corsOptions));

// ── Rate Limiting ─────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 60 * 1000,          // 1 minuto
  max: 200,                     // max 200 requests/min/IP
  standardHeaders: true,        // RateLimit-* headers
  legacyHeaders: false,         // sin X-RateLimit-* antiguos
  message: {
    success: false,
    message: "Demasiadas solicitudes. Intente de nuevo en un minuto.",
  },
});

app.use('/api', limiter);

// ── Middleware base ────────────────────────────────────────────
app.use(express.json());

// ── Rutas ─────────────────────────────────────────────────────
app.use('/api', router);

// Swagger (exento de rate limiting por ser herramienta interna)
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