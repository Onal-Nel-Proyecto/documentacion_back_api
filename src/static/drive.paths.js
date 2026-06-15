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
 *         orden:
 *           type: integer
 *           nullable: true
 *           description: "Orden de visualización extraído del nombre del archivo (prefijo numérico tras el módulo)"
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
*     responses:
 *       200:
 *         description: obtener imágenes organizadas por folder
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
  *     responses:
 *       200:
 *         description: objeto con imágenes organizadas por módulo
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
  *     responses:
 *       200:
 *         description: otención de una imagen específica
 */

/**
 * @swagger
 * /imagenes/file/{id}:
 *   get:
 *     summary: Proxy de imagen — sirve la imagen desde Google Drive a través del backend
 *     tags: [Drive]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del archivo en Google Drive
 *     responses:
 *       200:
 *         description: Imagen servida como stream (JPEG, PNG, GIF, WebP, SVG)
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Imagen no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al obtener la imagen desde Google Drive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */