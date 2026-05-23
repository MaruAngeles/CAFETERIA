const readline = require("node:readline/promises");

const cocina = require("./cocina");
const caja = require("./caja");

const consola = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/// funcion para mostrar productos disponibles
function mostrarProductos() {

    console.log("===== PRODUCTOS =====");

    cocina.productos.forEach(producto => {

        console.log(
            `${producto.id}. ${producto.nombre} - $${producto.precio}`
        );

        console.log(`Promocion: ${producto.promocion}`);

    });

}

// Menu
function mostrarMenu() {

    console.log("\n===== CLIENTE =====");

    console.log("1. Ver productos");
    console.log("2. Crear pedido");
    console.log("3. Ver pedidos");
    console.log("4. Ver total");
    console.log("0. Salir");

}

// Inicializa el menu
async function iniciarMenu() {

    let opcion = "";

    while (opcion !== "0") {

        mostrarMenu();

        opcion = await consola.question(
            "Elige una opcion: "
        );

        if (opcion === "1") {

            mostrarProductos();

        } else if (opcion === "2") {

            mostrarProductos();

            let id = Number(
                await consola.question(
                    "ID del producto: "
                )
            );

            caja.agregarPedido(id);

        } else if (opcion === "3") {

            caja.listarPedidos();

        } else if (opcion === "4") {

            caja.calcularCuenta();

        } else if (opcion !== "0") {

            console.log("Opcion no valida.");

        }

    }

    consola.close();

    console.log("Programa terminado.");

}

iniciarMenu();