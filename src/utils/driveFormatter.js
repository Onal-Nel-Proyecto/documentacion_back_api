import Folder from "../models/type.models.js";
import Module from "../models/module.models.js";

const buildStructure = async (files) => {
  const foldersMap = {};

  files.forEach(file => {
    
    const folderId = file.parents?.[0] || "SIN_TIPO";
    const moduleName = file.module || "SIN_MODULO";
    const folderName = file.type || "SIN_TIPO";
    //  Crear folder si no existe
    if (!foldersMap[folderId]) {
      foldersMap[folderId] = new Folder(folderId, folderName);
    }

    const folder = foldersMap[folderId];

    //  buscar módulo existente
    let module = folder.content.find(m => m.module === moduleName);

    if (!module) {
      module = new Module(moduleName);
      folder.addModule(module);
    }

    //  añadir imagen
    module.addImage(file);
  });

  //  convertir a JSON final
  return Object.values(foldersMap).map(folder => folder.json());
};

export { buildStructure };