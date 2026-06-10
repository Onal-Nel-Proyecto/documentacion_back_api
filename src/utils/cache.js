/**
 * Caché en memoria simple con TTL (time-to-live).
 *
 * Útil para cachear respuestas de Google Drive y evitar
 * superar la cuota de API.
 *
 * @example
 * const cache = new MemoryCache(5 * 60 * 1000); // 5 min
 * cache.set('key', data);
 * const data = cache.get('key'); // null si expiró o no existe
 */
class MemoryCache {
  /**
   * @param {number} ttlMs — Tiempo de vida en milisegundos (default: 5 min)
   */
  constructor(ttlMs = 5 * 60 * 1000) {
    this.store = new Map();
    this.ttlMs = ttlMs;
  }

  /**
   * Obtiene un valor de la caché.
   * @param {string} key
   * @returns {*|null} — null si no existe o expiró
   */
  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Guarda un valor en la caché.
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + this.ttlMs,
    });
  }

  /** Limpia toda la caché */
  clear() {
    this.store.clear();
  }
}

export default MemoryCache;
