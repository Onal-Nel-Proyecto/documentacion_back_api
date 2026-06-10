import { getFolderById } from "./getParentModule.service.js";
import { getAllImagesFromDrive } from "./getAllImages.service.js";
import { buildStructure } from "../utils/driveFormatter.js";
import MemoryCache from "../utils/cache.js";

// Cache en memoria: evita consultar Google Drive en cada request
const cache = new MemoryCache(5 * 60 * 1000); // 5 minutos de TTL

const CACHE_KEY = 'driveData';

const formatDriveData = async () => {
  // Intentar servir desde caché
  const cached = cache.get(CACHE_KEY);
  if (cached) return cached;

  try {
    const files = await getAllImagesFromDrive();

    const folderMap = await getFolderById();

    files.forEach(file => {
      const parentId = file.parents?.[0];

      file.type = folderMap[parentId] || "SIN_TIPO";
    });

    const enrichedFiles = addFolderNames(files, folderMap);

    const result = await buildStructure(enrichedFiles);

    // Guardar en caché antes de retornar
    cache.set(CACHE_KEY, result);

    return result;

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