import DriveFile from "../models/imagen.models.js";
import drive from "../config/config.js";

const getAllImagesFromDrive = async () => {
  try {
    const response = await drive.files.list({
      q: `mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name, description, parents)',
    });

    const files = response.data.files || [];

    return files.map(file =>
      new DriveFile(
        file.id,
        file.name,
        file.description,
        file.parents
      )
    );

  } catch (error) {
    console.error('Error al obtener las imágenes del drive:', error);
    throw error;
  }
}


export {  getAllImagesFromDrive };