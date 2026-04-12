import { getImagenFromFolder } from '../services/getImagenFromFolder.service.js';
import { getFileFromSameModule } from '../services/getImgSameModule.service.js';
import { getParentModule } from '../services/getParentModule.service.js';

// Función para obtener todos los archivos de un módulo específico
const getFileFromFolder = async (req, res) => {
  try {
    const { type } = req.params;

    const parentModule = await getParentModule(type.toUpperCase());
    if (parentModule.length === 0) {
      return res.status(404).json({ error: 'Módulo padre no encontrado' });
    }

    const imagen = await getImagenFromFolder(parentModule[0].id);

    if (imagen.length === 0) {
      return res.status(404).json({ message: 'No se encontraron imágenes en el módulo' });
    }

    res.status(200).json(imagen);


  } catch (error) {
    console.error('Error al obtener el archivo del módulo:', error);
    res.status(500).json({ error: 'Error al obtener el archivo del módulo' });
  }
}

// Función para obtener todos las imagenes de un módulo específico
const getFileFromModule = async (req, res) => {
  try {
    console.log(req.params)
    const { type, module } = req.params;
    const parentModule = await getParentModule(type.toUpperCase());
    if (parentModule.length === 0) {
      return res.status(404).json({ error: 'Módulo padre no encontrado' });
    } 

    const imagenFiltrada = await getFileFromSameModule(parentModule[0].id, module);
    console.log(imagenFiltrada);
    
    res.status(200).json(imagenFiltrada);
  } catch (error) {
    console.error('Error al obtener el archivo del módulo:', error);
    res.status(500).json({ error: 'Error al obtener el archivo del módulo' });
  }
}

export {getFileFromFolder, getFileFromModule};