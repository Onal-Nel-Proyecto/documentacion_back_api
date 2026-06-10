import './env.js';
import app from "../app.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ── Graceful Shutdown ─────────────────────────────────────────
const gracefulShutdown = (signal) => {
  console.log(`\n⚠  ${signal} recibido. Cerrando servidor...`);
  server.close(() => {
    console.log('✓ Servidor cerrado correctamente.');
    process.exit(0);
  });

  // Forzar cierre si no termina en 10 segundos
  setTimeout(() => {
    console.error('✗ Forzando cierre del servidor.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

