import { formatDriveData } from '../services/formatDriveData.service.js';
import { getParentModule } from '../services/getParentModule.service.js';

// Función para obtener todos los archivos de un módulo específico
const getFileFromFolder = async (req, res) => {
  try {
    const { type } = req.params;

    const parentModule = await getParentModule(type.toUpperCase());

    if (parentModule.length === 0) {
      return res.status(404).json({ error: 'Folder no encontrado' });
    }

    const imagen = await formatDriveData().then(data => {
      const folder = data.find(folder => folder.id === parentModule[0].id);
      return folder ? folder.content : [];
    });

    if (imagen.length === 0) {
      return res.status(404).json({ message: 'No se encontraron imágenes en el folder' });
    }

    res.status(200).json(imagen);


  } catch (error) {
    console.error('Error al obtener el archivo del folder:', error);
    res.status(500).json({ error: 'Error al obtener el archivo del folder' });
  }
}

// Función para obtener todos las imagenes de un módulo específico
const getFileFromModule = async (req, res) => {
  try {
    console.log(req.params)
    const { type, module } = req.params;
    const parentModule = await getParentModule(type.toUpperCase());
    if (parentModule.length === 0) {
      return res.status(404).json({ error: 'folder no encontrado' });
    }

    const data = await formatDriveData();

    const folder = data.find(folder => folder.id === parentModule[0].id);
    const modulo = folder?.content.find(mod => mod.module.toUpperCase() === module.toUpperCase());

    const imagenFiltrada = modulo ? modulo.images : [];
    console.log(imagenFiltrada);

    res.status(200).json(imagenFiltrada);
  } catch (error) {
    console.error('Error al obtener el archivo del folder:', error);
    res.status(500).json({ error: 'Error al obtener el archivo del folder' });
  }
}

const getAllFilesFromDrive = async (req, res) => {
  try {
    const imagenes = await formatDriveData();

    res.status(200).json(imagenes);

  } catch (error) {
    console.error('Error al obtener el archivo del folder:', error);
    res.status(500).json({ error: 'Error al obtener el archivo del folder' });
  }
}

// Función para obtener un archivo específico por su ID
const getFileById = async (req, res) => {
  try {
    console.log(req.params)
    const { type, module, file } = req.params;
    const parentModule = await getParentModule(type.toUpperCase());
    if (parentModule.length === 0) {
      return res.status(404).json({ error: 'folder no encontrado' });
    }

    const data = await formatDriveData();

    const folder = data.find(folder => folder.id === parentModule[0].id);
    const modulo = folder?.content.find(mod => mod.module.toUpperCase() === module.toUpperCase());
    const imagen = modulo?.images.find(mod => mod.id === file);
    
    const imagenFiltrada = imagen ? imagen : [];

    res.status(200).json(imagenFiltrada);
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    res.status(500).json({ error: 'Error al obtener la imagen' });
  }
}

export { getFileFromFolder, getFileFromModule, getAllFilesFromDrive, getFileById };