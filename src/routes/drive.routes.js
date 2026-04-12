import {  Router} from "express";
import { getFileFromFolder, getFileFromModule } from "../controllers/getFileFromModule.controller.js";

const router = Router();

router.get('/diagrama/:type', getFileFromFolder); // retorna todos los archivos del la carpeta padre
router.get('/diagrama/:type/:module', getFileFromModule); // retorna un archivo específico de la carpeta padre
export default router;