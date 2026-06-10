/**
 * Obtiene la URL base del servidor dinámicamente.
 *
 * Orden de precedencia:
 * 1. API_BASE_URL (configurable vía .env)
 * 2. VERCEL_URL (despliegue en Vercel)
 * 3. RENDER_EXTERNAL_URL (despliegue en Render)
 * 4. http://localhost:{PORT}
 *
 * @returns {string} URL base sin barra al final (ej: "http://localhost:8000")
 */
const getBaseUrl = () => {
  if (process.env.API_BASE_URL) {
    return process.env.API_BASE_URL.replace(/\/+$/, '');
  }

  if (process.env.VERCEL_URL) {
    const url = process.env.VERCEL_URL.replace(/\/+$/, '');
    return url.startsWith('http') ? url : `https://${url}`;
  }

  if (process.env.RENDER_EXTERNAL_URL) {
    return process.env.RENDER_EXTERNAL_URL.replace(/\/+$/, '');
  }

  const port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
};

export default getBaseUrl;
