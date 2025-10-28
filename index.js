// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 3000;

// ======= MIDDLEWARES =======
app.use(cors());
app.use(bodyParser.json());
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
        url: process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`,
        description: "Servidor de la API",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ======= IMPORTAR RUTAS =======
const categoriasRoutes = require("./routes/categorias");
const productosRoutes = require("./routes/productos");
const imagenesRoutes = require("./routes/imagenes");

app.use("/categorias", categoriasRoutes);
app.use("/productos", productosRoutes);
app.use("/imagenes", imagenesRoutes);

// ======= INICIAR SERVIDOR =======
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
  console.log(`📘 Swagger Docs: /api-docs`);
});
