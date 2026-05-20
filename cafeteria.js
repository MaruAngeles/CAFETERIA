// productos que ya vienen por defecto
let productos = [

    {
        id: 1,
        nombre: "Cafe Latte",
        precio: 65,
        categoria: "Bebida"
    },

    {
        id: 2,
        nombre: "Cheesecake",
        precio: 75,
        categoria: "Postre"
    }

];


// aqui se guardan los pedidos
let pedidos = [];


// total de todo lo vendido
let totalAcumulado = 0;


// referencias del html
const formulario = document.getElementById("formProducto");

const inputId = document.getElementById("productoId");
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputCategoria = document.getElementById("categoria");

const tablaProductos = document.getElementById("tablaProductos");

const totalCaja = document.getElementById("totalCaja");

const listaPedidos = document.getElementById("listaPedidos");


// para mostrar los productos en la tabla
function renderizarProductos() {

    tablaProductos.innerHTML = "";

    productos.forEach(function (producto) {

        let fila = document.createElement("tr");

        fila.innerHTML = `

            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.categoria}</td>

            <td>

                <button class="pedir"
                onclick="agregarPedido(${producto.id})">
                    Pedir
                </button>

                <button class="editar"
                onclick="editarProducto(${producto.id})">
                    Editar
                </button>

                <button class="eliminar"
                onclick="eliminarProducto(${producto.id})">
                    Eliminar
                </button>

            </td>

        `;

        tablaProductos.appendChild(fila);

    });

}


// para agregar productos nuevos
function agregarProducto(nombre, precio, categoria) {

    let nuevoProducto = {

        id: productos.length + 1,
        nombre: nombre,
        precio: precio,
        categoria: categoria

    };

    productos.push(nuevoProducto);

    console.log("Producto agregado:");
    console.log(nuevoProducto);

    renderizarProductos();

}


// para cargar datos y editarlos
function editarProducto(id) {

    let producto = productos.find(function (p) {

        return p.id === id;

    });

    inputId.value = producto.id;
    inputNombre.value = producto.nombre;
    inputPrecio.value = producto.precio;
    inputCategoria.value = producto.categoria;

}


// guardar cambios del producto
function actualizarProducto(id, nombre, precio, categoria) {

    let producto = productos.find(function (p) {

        return p.id === id;

    });

    producto.nombre = nombre;
    producto.precio = precio;
    producto.categoria = categoria;

    console.log("Producto actualizado:");
    console.log(producto);

    renderizarProductos();

}


// eliminar productos
function eliminarProducto(id) {

    productos = productos.filter(function (producto) {

        return producto.id !== id;

    });

    console.log(`Producto eliminado con ID: ${id}`);

    renderizarProductos();

}


// funcion de caja para agregar pedidos
function agregarPedido(idProducto) {

    let producto = productos.find(function (p) {

        return p.id === idProducto;

    });

    pedidos.push(producto);

    totalAcumulado += producto.precio;

    console.log(`
    Pedido agregado:
    ${producto.nombre} - $${producto.precio}
    `);

    console.log("Pedidos actuales:");
    console.log(pedidos);

    console.log(`
    Total acumulado:
    $${totalAcumulado}
    `);

    renderizarPedidos();

}


// para mostrar pedidos en pantalla
function renderizarPedidos() {

    listaPedidos.innerHTML = "";

    pedidos.forEach(function (pedido) {

        let elemento = document.createElement("li");

        elemento.textContent =
            `${pedido.nombre} - $${pedido.precio}`;

        listaPedidos.appendChild(elemento);

    });

    totalCaja.textContent =
        `$${totalAcumulado}`;

}


// guardar desde el formulario
formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    let id = inputId.value;

    let nombre = inputNombre.value;

    let precio = Number(inputPrecio.value);

    let categoria = inputCategoria.value;

    if (nombre === "" || precio <= 0 || categoria === "") {

        console.log("Faltan datos");

        return;

    }

    // si no hay id se agrega
    if (id === "") {

        agregarProducto(nombre, precio, categoria);

    }

    // si ya existe id entonces se edita
    else {

        actualizarProducto(
            Number(id),
            nombre,
            precio,
            categoria
        );

    }

    formulario.reset();

    inputId.value = "";

});


// ==========================
// MODULO CLIENTE
// ==========================


// para mostrar menu en consola
function consultarProductos() {

    console.log("===== MENU =====");

    productos.forEach(function (producto) {

        console.log(`
        ID: ${producto.id}
        Producto: ${producto.nombre}
        Precio: $${producto.precio}
        Categoria: ${producto.categoria}
        `);

    });

}


// para crear pedidos desde cliente
function crearPedidoCliente(idProducto) {

    let producto = productos.find(function (p) {

        return p.id === idProducto;

    });

    if (producto) {

        console.log(`
        Cliente pidio:
        ${producto.nombre} - $${producto.precio}
        `);

        agregarPedido(idProducto);

    }

    else {

        console.log("Producto no encontrado");

    }

}


// listar pedidos del cliente
function listarPedidosCliente() {

    console.log("===== PEDIDOS =====");

    pedidos.forEach(function (pedido, index) {

        console.log(`
        ${index + 1}. ${pedido.nombre}
        Precio: $${pedido.precio}
        `);

    });

    console.log(`
    TOTAL:
    $${totalAcumulado}
    `);

}


// cargar todo al inicio
renderizarProductos();

renderizarPedidos();


// ejemplos en consola
consultarProductos();

crearPedidoCliente(1);

listarPedidosCliente();