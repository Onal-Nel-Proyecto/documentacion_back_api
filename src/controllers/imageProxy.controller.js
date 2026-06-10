import drive from "../config/config.js";

/**
 * Proxy de imágenes desde Google Drive.
 *
 * GET /api/imagenes/file/:id
 *
 * 1. Obtiene metadatos del archivo (mimeType)
 * 2. Descarga el contenido como stream
 * 3. Envía la imagen al navegador con headers de caché
 */
const getImageProxy = async (req, res) => {
  try {
    const { id } = req.params;

    // ── 1. Obtener metadatos ──────────────────────────────────
    let metadata;
    try {
      metadata = await drive.files.get(
        {
          fileId: id,
          fields: 'mimeType,name',
        },
        { timeout: 10000 } // 10s de timeout
      );
    } catch (err) {
      const status = err.code || err.status || err.response?.status;

      if (status === 404) {
        return res.status(404).json({
          success: false,
          message: "Imagen no encontrada",
        });
      }

      // Error de autenticación / permisos / timeout / etc.
      console.error('Error al consultar metadatos en Google Drive:', err);
      return res.status(500).json({
        success: false,
        message: "No fue posible obtener la imagen",
      });
    }

    const mimeType = metadata.data.mimeType;

    // Validar que sea un tipo de imagen soportado
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ];

    if (!allowedMimeTypes.includes(mimeType)) {
      return res.status(400).json({
        success: false,
        message: "El archivo no es un tipo de imagen soportado",
      });
    }

    // ── 2. Configurar headers de respuesta ─────────────────────
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // ── 3. Descargar y streamear el contenido ──────────────────
    const response = await drive.files.get(
      {
        fileId: id,
        alt: 'media',
      },
      {
        responseType: 'stream',
        timeout: 15000, // 15s de timeout para descarga
      }
    );

    response.data
      .on('error', (streamErr) => {
        console.error('Error en el stream de Google Drive:', streamErr);
        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message: "No fue posible obtener la imagen",
          });
        }
      })
      .pipe(res);

  } catch (error) {
    console.error('Error general en imageProxy:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "No fue posible obtener la imagen",
      });
    }
  }
};

export { getImageProxy };
