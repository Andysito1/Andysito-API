const API_URL = "http://localhost:3000";

// Cargar categorías
async function cargarCategorias() {
  const res = await fetch(`${API_URL}/categorias`);
  const categorias = await res.json();
  const menu = document.getElementById("menuCategorias");
  menu.innerHTML = `
    <a href="#" onclick="cargarProductos()" class="nav-link fw-bold text-primary">Todos</a>
  `;
  categorias.forEach(cat => {
    menu.innerHTML += `
      <a href="#" onclick="cargarProductos(${cat.id})" class="nav-link">${cat.nombre}</a>
    `;
  });
}

// Cargar productos
async function cargarProductos(categoriaId=null) {
  const res = await fetch(`${API_URL}/productos`);
  let productos = await res.json();

  if (categoriaId) {
    productos = productos.filter(p => p.categoria_id == categoriaId);
  }

  const lista = document.getElementById("listaProductos");
  lista.innerHTML = "";
  document.getElementById("detalleProducto").classList.add("d-none");

  productos.forEach(p => {
    lista.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text">S/ ${p.precio}</p>
            <small class="text-muted">${p.categoria}</small>
            <div class="mt-3">
              <button class="btn btn-sm btn-primary" onclick="verDetalle(${p.id})">
                Ver detalle
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// Ver detalle
async function verDetalle(id) {
  const res = await fetch(`${API_URL}/imagenes/${id}`);
  const imagenes = await res.json();
  const detalle = document.getElementById("detalleProducto");
  const contenedor = document.getElementById("imagenesProducto");

  detalle.classList.remove("d-none");
  contenedor.innerHTML = "";

  if (imagenes.length === 0) {
    contenedor.innerHTML = `<p class="text-muted">No hay imágenes disponibles</p>`;
  } else {
    imagenes.forEach(img => {
      contenedor.innerHTML += `
        <img src="${img.url}" class="img-thumbnail" style="width:150px; height:150px; object-fit:cover">
      `;
    });
  }
}

// Manejo de sesión
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const adminLink = document.getElementById("adminLink");

// Abrir modal de login
btnLogin.addEventListener("click", () => {
  new bootstrap.Modal(document.getElementById("loginModal")).show();
});

// Validar login (usuario fijo: admin / pass: 1234)
document.getElementById("formLogin").addEventListener("submit", e => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "admin" && pass === "1234") {
    localStorage.setItem("isAdmin", "true");
    alert("Bienvenido Admin!");
    bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
    actualizarUI();
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});

// Cerrar sesión
btnLogout.addEventListener("click", () => {
  localStorage.removeItem("isAdmin");
  alert("Sesión cerrada");
  actualizarUI();
});

// Mostrar/ocultar opciones según rol
function actualizarUI() {
  if (localStorage.getItem("isAdmin") === "true") {
    adminLink.classList.remove("d-none");
    btnLogin.classList.add("d-none");
    btnLogout.classList.remove("d-none");
  } else {
    adminLink.classList.add("d-none");
    btnLogin.classList.remove("d-none");
    btnLogout.classList.add("d-none");
  }
}

// Inicializar
cargarCategorias();
cargarProductos();
actualizarUI();