import { getFolderById } from "./getParentModule.service.js";
import { getAllImagesFromDrive } from "./getAllImages.service.js";
import { buildStructure } from "../utils/driveFormatter.js";

const formatDriveData = async () => {
  try {
    const files = await getAllImagesFromDrive();

    const folderMap = await getFolderById();

    files.forEach(file => {
      const parentId = file.parents?.[0];

      file.type = folderMap[parentId] || "SIN_TIPO";
    });

    const enrichedFiles = addFolderNames(files, folderMap);

    return buildStructure(enrichedFiles);

  } catch (error) {
    console.error('Error al formatear los datos del drive:', error);
    throw error;
  }

};


const addFolderNames = (files, folderMap) => {
  return files.map(file => {
    file.type = folderMap[file.parents?.[0]] || "SIN_TIPO";
    return file;
  });
};

export { formatDriveData };