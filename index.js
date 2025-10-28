// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // ✅ Render asigna el puerto en una variable

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Importar rutas
const categoriasRoutes = require("./routes/categorias");
const productosRoutes = require("./routes/productos");
const imagenesRoutes = require("./routes/imagenes");

// Registrar rutas
app.use("/categorias", categoriasRoutes);
app.use("/productos", productosRoutes);
app.use("/imagenes", imagenesRoutes);

// Servir archivos estáticos (si los usas)
app.use(express.static("public"));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
