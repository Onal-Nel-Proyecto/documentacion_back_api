import DriveFile from "../models/drive.models.js";
import drive from "../config.js";

const getFileFromSameModule = async (folderId, moduleName) => {
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
    return driveFiles.filter(file => file.modulo === moduleName);
  }
  catch (error) {
    console.error('Error al obtener las imágenes de la carpeta:', error);
    throw error;
  }
}

export { getFileFromSameModule };