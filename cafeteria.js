// Productos iniciales de la cafeteria.
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

// Aqui se guardan los pedidos.
let pedidos = [];

// Total de todo lo vendido.
let totalAcumulado = 0;

// Busca el siguiente ID para un producto nuevo.
function obtenerSiguienteId() {
    if (productos.length === 0) {
        return 1;
    }

    let ids = productos.map(function(producto) {
        return producto.id;
    });

    return Math.max(...ids) + 1;
}

// Muestra los productos en consola.
function consultarProductos() {
    console.log("===== MENU =====");

    productos.forEach(function(producto) {
        console.log(
            producto.id + ". " +
            producto.nombre + " - $" +
            producto.precio + " - " +
            producto.categoria
        );
    });

    return productos;
}

// Busca un producto por su ID.
function buscarProducto(id) {
    return productos.find(function(producto) {
        return producto.id === id;
    });
}

// Agrega un producto nuevo.
function agregarProducto(nombre, precio, categoria) {
    if (nombre === "" || precio <= 0 || categoria === "") {
        console.log("Faltan datos del producto.");
        return;
    }

    let nuevoProducto = {
        id: obtenerSiguienteId(),
        nombre: nombre,
        precio: precio,
        categoria: categoria
    };

    productos.push(nuevoProducto);

    console.log("Producto agregado:");
    console.log(nuevoProducto);
}

// Actualiza un producto existente.
function actualizarProducto(id, nombre, precio, categoria) {
    let producto = buscarProducto(id);

    if (!producto) {
        console.log("Producto no encontrado.");
        return;
    }

    if (nombre === "" || precio <= 0 || categoria === "") {
        console.log("Faltan datos del producto.");
        return;
    }

    producto.nombre = nombre;
    producto.precio = precio;
    producto.categoria = categoria;

    console.log("Producto actualizado:");
    console.log(producto);
}

// Elimina un producto por su ID.
function eliminarProducto(id) {
    let cantidadInicial = productos.length;

    productos = productos.filter(function(producto) {
        return producto.id !== id;
    });

    if (productos.length === cantidadInicial) {
        console.log("Producto no encontrado.");
        return;
    }

    console.log("Producto eliminado con ID: " + id);
}

// Crea un pedido con un producto del menu.
function crearPedidoCliente(idProducto) {
    let producto = buscarProducto(idProducto);

    if (!producto) {
        console.log("Producto no encontrado.");
        return;
    }

    pedidos.push(producto);
    totalAcumulado += producto.precio;

    console.log("Pedido agregado:");
    console.log(producto.nombre + " - $" + producto.precio);
}

// Muestra los pedidos y el total en consola.
function listarPedidosCliente() {
    console.log("===== PEDIDOS =====");

    if (pedidos.length === 0) {
        console.log("No hay pedidos.");
    }

    pedidos.forEach(function(pedido, index) {
        console.log(
            (index + 1) + ". " +
            pedido.nombre + " - $" +
            pedido.precio
        );
    });

    console.log("TOTAL: $" + totalAcumulado);

    return pedidos;
}

// Herramienta de Node para escribir y leer desde la consola.
const readline = require("node:readline/promises");

const consola = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Muestra las opciones disponibles.
function mostrarOpciones() {
    console.log("\n===== CAFETERIA =====");
    console.log("1. Ver productos");
    console.log("2. Agregar producto");
    console.log("3. Editar producto");
    console.log("4. Eliminar producto");
    console.log("5. Crear pedido");
    console.log("6. Ver pedidos");
    console.log("0. Salir");
}

// Inicia el menu interactivo.
async function iniciarMenu() {
    let opcion = "";

    while (opcion !== "0") {
        mostrarOpciones();
        opcion = await consola.question("Elige una opcion: ");

        if (opcion === "1") {
            consultarProductos();
        } else if (opcion === "2") {
            let nombre = await consola.question("Nombre: ");
            let precio = Number(await consola.question("Precio: "));
            let categoria = await consola.question("Categoria: ");

            agregarProducto(nombre.trim(), precio, categoria.trim());
        } else if (opcion === "3") {
            consultarProductos();

            let id = Number(await consola.question("ID a editar: "));
            let nombre = await consola.question("Nuevo nombre: ");
            let precio = Number(await consola.question("Nuevo precio: "));
            let categoria = await consola.question("Nueva categoria: ");

            actualizarProducto(id, nombre.trim(), precio, categoria.trim());
        } else if (opcion === "4") {
            consultarProductos();

            let id = Number(await consola.question("ID a eliminar: "));

            eliminarProducto(id);
        } else if (opcion === "5") {
            consultarProductos();

            let idProducto = Number(await consola.question("ID del producto: "));

            crearPedidoCliente(idProducto);
        } else if (opcion === "6") {
            listarPedidosCliente();
        } else if (opcion !== "0") {
            console.log("Opcion no valida.");
        }
    }

    consola.close();
    console.log("Programa terminado.");
}

iniciarMenu();
