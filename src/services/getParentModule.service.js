import drive from "../config/config.js";
// Función para obtener el módulo padre por su nombre
const getParentModule = async (nameFolder) => {
  try {
    const safeName = nameFolder.replace(/'/g, "\\'");

    const response = await drive.files.list({
      // La consulta para buscar la carpeta por su nombre y asegurarse de que no esté en la papelera
      q: `mimeType = 'application/vnd.google-apps.folder' 
          and trashed = false
          and name = '${safeName}'`,
      fields: "files(id, name)"
    });

    return response.data.files || [];

  } catch (error) {
    console.error("Error en getParentModule:", error);
    return [];
  }
};

const getFolderById = async () => {
  try {
    const response = await drive.files.list({
      q: `mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: "files(id, name)"
    });

    const map = {};

    response.data.files.forEach(folder => {
      map[folder.id] = folder.name;
    });

    return map;

  } catch (error) {
    console.error("Error al obtener carpeta por ID:", error);
    throw error;
  }
};
export { getParentModule, getFolderById };