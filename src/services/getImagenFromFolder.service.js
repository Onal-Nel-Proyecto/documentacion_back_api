import DriveFile from "../models/imagen.models.js";
import drive from "../config/config.js";


const getImagenFromFolder = async (folderId) => {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name, description, parents)',
    });
    const files = response.data.files;
    if (files.length === 0) {
      console.log('No se encontraron imágenes en la carpeta.');
      return [];
    }

    const driveFiles = files.map(file => new DriveFile(file.id, file.name, file.description, file.parents));
    return driveFiles;
  }
  catch (error) {
    console.error('Error al obtener las imágenes de la carpeta:', error);
    throw error;
  }
}

export { getImagenFromFolder };