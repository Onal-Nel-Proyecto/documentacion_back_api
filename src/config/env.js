import dotenv from 'dotenv';
dotenv.config();

// ── Validación de variables obligatorias ──────────────────────
const REQUIRED_VARS = [
  'GOOGLE_CLIENT_EMAIL',
  'GOOGLE_PRIVATE_KEY',
];

const missing = REQUIRED_VARS.filter(v => !process.env[v]);

if (missing.length > 0) {
  console.error('╔══════════════════════════════════════════════════╗');
  console.error('║  ERROR: Faltan variables de entorno requeridas  ║');
  console.error('╚══════════════════════════════════════════════════╝');
  missing.forEach(v => console.error(`  • ${v}`));
  console.error('\nRevisa tu archivo .env o las variables de entorno del servidor.');
  process.exit(1);
}