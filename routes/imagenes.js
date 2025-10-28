const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * @swagger
 * tags:
 *   name: Imágenes
 *   description: Endpoints para gestionar las imágenes de productos
 */

/**
 * @swagger
 * /imagenes/{producto_id}:
 *   get:
 *     summary: Obtener todas las imágenes de un producto
 *     tags: [Imágenes]
 *     parameters:
 *       - in: path
 *         name: producto_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Lista de imágenes del producto
 *       500:
 *         description: Error del servidor
 */
router.get('/:producto_id', async (req, res) => {
  const { producto_id } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT * FROM imagenes_productos WHERE producto_id = ?',
      [producto_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /imagenes:
 *   post:
 *     summary: Agregar una nueva imagen a un producto
 *     tags: [Imágenes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *               - producto_id
 *             properties:
 *               url:
 *                 type: string
 *                 description: URL de la imagen
 *               producto_id:
 *                 type: integer
 *                 description: ID del producto
 *     responses:
 *       200:
 *         description: Imagen agregada exitosamente
 *       500:
 *         description: Error del servidor
 */
router.post('/', async (req, res) => {
  const { url, producto_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO imagenes_productos (url, producto_id) VALUES (?, ?)',
      [url, producto_id]
    );
    res.json({ id: result.insertId, url, producto_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /imagenes/{id}:
 *   delete:
 *     summary: Eliminar una imagen por su ID
 *     tags: [Imágenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la imagen
 *     responses:
 *       200:
 *         description: Imagen eliminada exitosamente
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM imagenes_productos WHERE id = ?', [id]);
    res.json({ mensaje: 'Imagen eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
