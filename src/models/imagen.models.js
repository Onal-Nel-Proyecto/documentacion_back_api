import getBaseUrl from "../utils/baseUrl.js";

class DriveFile {
  constructor(id, name, description, parents) {
    this.id = id;

    const safeName = name || "";

    const parts = safeName.split("-");
    this.module = parts[0] || "";

    const rawName = parts[1] || "";

    const cleanName = rawName.includes(".")
      ? rawName.split(".")[0]
      : rawName;

    this.name = cleanName;

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
    }
  }
}

export default DriveFile;