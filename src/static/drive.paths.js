/**
 * @swagger
 * tags:
 *   name: Drive
 *   description: Endpoints para obtener imágenes desde Google Drive
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         url:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /imagenes:
 *   get:
 *     summary: Obtener todas las imágenes organizadas
 *     tags: [Drive]
 *     responses:
 *       200:
 *         description: Lista de imágenes
 */

/**
 * @swagger
 * /imagenes/{type}:
 *   get:
 *     summary: Obtener imágenes por tipo
 *     tags: [Drive]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 */

/**
 * @swagger
 * /imagenes/{type}/{module}:
 *   get:
 *     summary: Obtener imágenes por módulo
 *     tags: [Drive]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: module
 *         required: true
 *         schema:
 *           type: string
 */

/**
 * @swagger
 * /imagenes/{type}/{module}/{file}:
 *   get:
 *     summary: Obtener imagen específica
 *     tags: [Drive]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: module
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: file
 *         required: true
 *         schema:
 *           type: string
 */