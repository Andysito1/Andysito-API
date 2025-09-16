const API_URL = "http://localhost:3000";

// Verificar si es admin
if (localStorage.getItem("isAdmin") !== "true") {
  alert("Acceso denegado. Solo administradores.");
  window.location.href = "index.html";
}

// Categoría
document.getElementById("formCategoria").addEventListener("submit", async e => {
  e.preventDefault();
  const nombre = document.getElementById("nombreCategoria").value;
  await fetch(`${API_URL}/categorias`, {
    method:"POST", headers:{'Content-Type':'application/json'},
    body:JSON.stringify({nombre})
  });
  alert("Categoría registrada");
  e.target.reset();
});

// Producto
document.getElementById("formProducto").addEventListener("submit", async e => {
  e.preventDefault();
  const nombre = document.getElementById("nombreProducto").value;
  const precio = document.getElementById("precioProducto").value;
  const categoria_id = document.getElementById("categoriaProducto").value;
  await fetch(`${API_URL}/productos`, {
    method:"POST", headers:{'Content-Type':'application/json'},
    body:JSON.stringify({nombre, precio, categoria_id})
  });
  alert("Producto registrado");
  e.target.reset();
});

// Imagen
document.getElementById("formImagen").addEventListener("submit", async e => {
  e.preventDefault();
  const url = document.getElementById("urlImagen").value;
  const producto_id = document.getElementById("productoImagen").value;
  await fetch(`${API_URL}/imagenes`, {
    method:"POST", headers:{'Content-Type':'application/json'},
    body:JSON.stringify({url, producto_id})
  });
  alert("Imagen registrada");
  e.target.reset();
});
