import { Router } from "express";
import { 
  getAllFilesFromDrive, 
  getFileById, 
  getFileFromFolder, 
  getFileFromModule 
} from "../controllers/getFileFromModule.controller.js";
import { getImageProxy } from "../controllers/imageProxy.controller.js";

const router = Router();

// Proxy de imágenes — debe ir ANTES de rutas con parámetros dinámicos
router.get('/imagenes/file/:id', getImageProxy);

router.get('/imagenes/:type/:module/:file', getFileById); // retorna un archivo específico de la carpeta padre

router.get('/imagenes/:type/:module', getFileFromModule); // retorna un archivo específico de la carpeta padre

router.get('/imagenes/:type', getFileFromFolder); // retorna todos los archivos del la carpeta padre

router.get('/imagenes', getAllFilesFromDrive); // retorna todos los archivos del drive

export default router;