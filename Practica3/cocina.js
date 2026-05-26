// cocina.js
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


let inventario = {
    cafe: 4,
    leche: 4,
    azucar: 6,
    quesoCrema: 2,
    galleta: 2
};

let recetas = {
    1: { // Cafe Latte
        cafe: 1,
        leche: 1,
        azucar: 1
    },
    2: { // Cheesecake
        quesoCrema: 1,
        galleta: 1,
        azucar: 1
    },
    3: { // Capuccino
        cafe: 1,
        leche: 1
    }
};





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

// Funcion para revisar si hay ingredientes suficientes para preparar
// un producto.
function obtenerIngredienteFaltante(receta) {

    return Object.keys(receta).find(
        ingrediente => inventario[ingrediente] < receta[ingrediente]
    );

}

// Funcion para descontar ingredientes del inventario cuando se prepara
// correctamente un producto.
function descontarIngredientes(receta) {

    Object.keys(receta).forEach(ingrediente => {

        inventario[ingrediente] -= receta[ingrediente];

    });

}

// Promesa para simular la preparacion en cocina.
// - resolve: producto preparado.
// - reject: error en cocina o falta ingrediente.
function prepararProducto(id, simularError = false) {

    return new Promise((resolve, reject) => {

        let producto = buscarProducto(id);

        setTimeout(() => {

            if (!producto) {

                reject("Producto no encontrado.");
                return;

            }

            if (simularError) {

                reject(`Error en cocina preparando ${producto.nombre}.`);
                return;

            }

            let receta = recetas[producto.id];

            if (!receta) {

                reject(`No hay receta para ${producto.nombre}.`);
                return;

            }

            let ingredienteFaltante = obtenerIngredienteFaltante(receta);

            if (ingredienteFaltante) {

                reject(`Falta ingrediente: ${ingredienteFaltante}.`);
                return;

            }

            descontarIngredientes(receta);

            resolve(`${producto.nombre} preparado correctamente.`);

        }, 1000);

    });

}

// Funcion para ver el inventario actual.
function consultarInventario() {

    console.log("\n===== INVENTARIO =====");

    Object.keys(inventario).forEach(ingrediente => {

        console.log(
            `${ingrediente}: ${inventario[ingrediente]}`
        );

    });

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

//Muestra productos baratos
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
    inventario,
    recetas,
    consultarProductos,
    buscarProducto,
    prepararProducto,
    consultarInventario,
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
        console.log("9. Preparar producto");
        console.log("10. Ver inventario");
        console.log("11. Simular error en cocina");
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

        // Preparar producto usando promesa.
        else if (opcion === "9") {

            consultarProductos();

            let id = Number(
                await consola.question(
                    "\nID del producto a preparar: "
                )
            );

            try {

                let resultado = await prepararProducto(id);

                console.log(`\n${resultado}`);

            } catch (error) {

                console.log(`\n${error}`);

            }

        }
        // Mostrar inventario.
        else if (opcion === "10") {

            consultarInventario();

        }

        // Simular un error en cocina usando la misma promesa.
        else if (opcion === "11") {

            consultarProductos();

            let id = Number(
                await consola.question(
                    "\nID del producto a preparar: "
                )
            );

            try {

                let resultado = await prepararProducto(id, true);

                console.log(`\n${resultado}`);

            } catch (error) {

                console.log(`\n${error}`);

            }

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
