import { Router } from "express";
import { 
  getAllFilesFromDrive, 
  getFileById, 
  getFileFromFolder, 
  getFileFromModule 
} from "../controllers/getFileFromModule.controller.js";

const router = Router();

router.get('/imagenes/:type/:module/:file', getFileById); // retorna un archivo específico de la carpeta padre

router.get('/imagenes/:type/:module', getFileFromModule); // retorna un archivo específico de la carpeta padre

router.get('/imagenes/:type', getFileFromFolder); // retorna todos los archivos del la carpeta padre

router.get('/imagenes', getAllFilesFromDrive); // retorna todos los archivos del drive

export default router;