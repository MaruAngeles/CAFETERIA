let productos = [
    {
        id: 1,
        nombre: "Cafe Latte",
        precio: 65,
        categoria: "Bebida",
        promocion: "2x1"
    },
    {
        id: 2,
        nombre: "Cheesecake",
        precio: 75,
        categoria: "Postre",
        promocion: "10% descuento"
    },
    {
        id: 3,
        nombre: "Capuccino",
        precio: 70,
        categoria: "Bebida",
        promocion: "Sin promociones"
    }
];

// Funcion para listar los productos
function consultarProductos() {

    console.log("\n===== MENU =====");

    productos.forEach(producto => {

        console.log(
            `${producto.id}. ${producto.nombre} - $${producto.precio} - ${producto.categoria} - ${producto.promocion}`
        );

    });

}

//Funcion para buscar productos segun su id
function buscarProducto(id) {

    return productos.find(
        producto => producto.id === id
    );

}

//funcion para agregar un nuevo producto 
function agregarProducto(nombre, precio, categoria, promocion) {

    let nuevoProducto = {
        id: productos.length + 1,
        nombre,
        precio,
        categoria,
        promocion
    };

    productos.push(nuevoProducto);

    console.log("\nProducto agregado correctamente.");

}

// Funcion para editar producto

function editarProducto(id, nuevoNombre) {

    let producto = buscarProducto(id);

    if (!producto) {

        console.log("\nProducto no encontrado.");
        return;

    }

    producto.nombre = nuevoNombre;

    console.log("\nProducto actualizado.");

}

//Para eliminar producto segun su id

function eliminarProducto(id) {

    let cantidadInicial = productos.length;

    productos = productos.filter(
        producto => producto.id !== id
    );

    if (cantidadInicial === productos.length) {

        console.log("\nProducto no encontrado.");
        return;

    }

    console.log("\nProducto eliminado.");

}

//Muestra productos bararos
function productosBaratos() {

    let baratos = productos.filter(
        producto => producto.precio <= 70
    );

    console.log("\n===== PRODUCTOS BARATOS =====");

    baratos.forEach(producto => {

        console.log(
            `${producto.id}. ${producto.nombre} - $${producto.precio}`
        );

    });

}

//Muestra productos caros
function productosCaros() {

    let caros = productos.filter(
        producto => producto.precio > 70
    );

    console.log("\n===== PRODUCTOS CAROS =====");

    caros.forEach(producto => {

        console.log(
            `${producto.id}. ${producto.nombre} - $${producto.precio}`
        );

    });

}

// Filtra por la categoria de bebidas

function bebidas() {

    let listaBebidas = productos.filter(
        producto => producto.categoria === "Bebida"
    );

    console.log("\n===== BEBIDAS =====");

    listaBebidas.forEach(producto => {

        console.log(
            `${producto.id}. ${producto.nombre} - $${producto.precio}`
        );

    });

}

// Filtra solo los postres
function postres() {

    let listaPostres = productos.filter(
        producto => producto.categoria === "Postre"
    );

    console.log("\n===== POSTRES =====");

    listaPostres.forEach(producto => {

        console.log(
            `${producto.id}. ${producto.nombre} - $${producto.precio}`
        );

    });

}

// Exporta funciones

module.exports = {
    productos,
    consultarProductos,
    buscarProducto,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    productosBaratos,
    productosCaros,
    bebidas,
    postres
};

//Menu

const readline = require("node:readline/promises");

const consola = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


async function menuCocina() {

    let opcion = "";

    while (opcion !== "0") {

        console.log("\n===== COCINA =====");

        console.log("1. Ver productos");
        console.log("2. Agregar producto");
        console.log("3. Editar producto");
        console.log("4. Eliminar producto");
        console.log("5. Productos baratos");
        console.log("6. Productos caros");
        console.log("7. Bebidas");
        console.log("8. Postres");
        console.log("0. Salir");

        opcion = await consola.question(
            "\nElige una opcion: "
        );

        // Vver productos
        if (opcion === "1") {

            consultarProductos();

        }

        // agregar productos
        else if (opcion === "2") {

            let nombre = await consola.question(
                "Nombre: "
            );

            let precio = Number(
                await consola.question(
                    "Precio: "
                )
            );

            let categoria = await consola.question(
                "Categoria: "
            );

            let promocion = await consola.question(
                "Promocion: "
            );

            agregarProducto(
                nombre,
                precio,
                categoria,
                promocion
            );

        }

        //editar
        else if (opcion === "3") {

            consultarProductos();

            let id = Number(
                await consola.question(
                    "\nID del producto: "
                )
            );

            let nuevoNombre = await consola.question(
                "Nuevo nombre: "
            );

            editarProducto(id, nuevoNombre);

        }

        // eliminar
        else if (opcion === "4") {

            consultarProductos();

            let id = Number(
                await consola.question(
                    "\nID del producto: "
                )
            );

            eliminarProducto(id);

        }

        // filtrar baratos
        else if (opcion === "5") {

            productosBaratos();

        }

        // filtrar caros
        else if (opcion === "6") {

            productosCaros();

        }

        // bebidas
        else if (opcion === "7") {

            bebidas();

        }

        // postres
        else if (opcion === "8") {

            postres();

        }

        
        else if (opcion !== "0") {

            console.log("\nOpcion no valida.");

        }

    }

    consola.close();

    console.log("\nPrograma terminado.");

}


if (require.main === module) {

    menuCocina();

}