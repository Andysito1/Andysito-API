// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = 3000;

// ======= MIDDLEWARES =======
// Permitir CORS
app.use(cors());
// Parsear JSON en requests
app.use(bodyParser.json());
// Servir archivos estáticos
app.use(express.static("public"));

// ======= CONFIGURACIÓN SWAGGER =======
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Tienda",
      version: "1.0.0",
      description: "Documentación automática de la API de tienda",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Servidor local",
      },
    ],
  },
  apis: ["./routes/*.js"], // Aquí Swagger buscará los comentarios en tus rutas
};

// Genera la especificación
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Ruta de documentación (http://localhost:3000/api-docs)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ======= IMPORTAR RUTAS =======
const categoriasRoutes = require("./routes/categorias");
const productosRoutes = require("./routes/productos");
const imagenesRoutes = require("./routes/imagenes");

// Registrar rutas
app.use("/categorias", categoriasRoutes);
app.use("/productos", productosRoutes);
app.use("/imagenes", imagenesRoutes);

// ======= INICIAR SERVIDOR =======
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
