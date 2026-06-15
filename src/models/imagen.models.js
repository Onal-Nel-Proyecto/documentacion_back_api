import getBaseUrl from "../utils/baseUrl.js";

class DriveFile {
  constructor(id, name, description, parents) {
    this.id = id;

    const safeName = name || "";

    const parts = safeName.split("-");
    this.module = parts[0] || "";

    // Todo lo que sigue después del módulo: "01", "01-diagrama.png", "logo.png", etc.
    const rawName = parts.slice(1).join("-");

    // Quitar extensión antes de analizar
    const nameWithoutExt = rawName.includes(".")
      ? rawName.split(".")[0]
      : rawName;

    // Intentar extraer un prefijo numérico para el orden
    const match = nameWithoutExt.match(/^(\d+)-?(.*)/);
    if (match) {
      this.orden = parseInt(match[1], 10);
      this.name = match[2] ? match[2].replace(/^-/, '') : match[1];
    } else {
      this.orden = null;
      this.name = nameWithoutExt;
    }

    // URL generada dinámicamente según el entorno
    this.url = this.#buildProxyUrl(id);
    this.description = description;

    this.parents = parents;
  }

  /**
   * Construye la URL del proxy de imágenes.
   * Usa la base URL del servidor en lugar de Google Drive directamente.
   */
  #buildProxyUrl(fileId) {
    const baseUrl = getBaseUrl();
    return `${baseUrl}/api/imagenes/file/${fileId}`;
  }

  json() {
    return {
      id: this.id,
      title: this.name,
      url: this.url,
      description: this.description,
      orden: this.orden,
    }
  }
}

export default DriveFile;