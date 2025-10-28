const express = require("express");
const router = express.Router();
const db = require("../db"); // Importa el pool de PostgreSQL

// 🟢 Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM categorias ORDER BY id");
    res.json(result.rows); // pg devuelve los datos en result.rows
  } catch (err) {
    console.error("Error al obtener categorías:", err);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
});

// 🟢 Crear nueva categoría
router.post("/", async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO categorias (nombre) VALUES ($1) RETURNING *",
      [nombre]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear categoría:", err);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
});

// 🟢 Actualizar categoría
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const result = await db.query(
      "UPDATE categorias SET nombre = $1 WHERE id = $2 RETURNING *",
      [nombre, id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: "Categoría no encontrada" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar categoría:", err);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
});

// 🟢 Eliminar categoría
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM categorias WHERE id = $1", [id]);
    if (result.rowCount === 0)
      return res.status(404).json({ error: "Categoría no encontrada" });

    res.json({ mensaje: "Categoría eliminada correctamente" });
  } catch (err) {
    console.error("Error al eliminar categoría:", err);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
});

module.exports = router;
