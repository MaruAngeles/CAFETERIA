const cocina = require("./cocina");


let pedidos = [];


let totalAcumulado = 0;

//funcion para agregar pedidos

function agregarPedido(idProducto) {

    let producto = cocina.buscarProducto(idProducto);

    if (!producto) {

        console.log("\nProducto no encontrado.");
        return;

    }

    pedidos.push(producto);

    totalAcumulado += producto.precio;

    console.log(
        `\nPedido agregado: ${producto.nombre}`
    );

}

// Lista de pedidos

function listarPedidos() {

    console.log("\n===== PEDIDOS =====");

    if (pedidos.length === 0) {

        console.log("No hay pedidos.");
        return;

    }

    pedidos.forEach(({ nombre, precio }, index) => {

        console.log(
            `${index + 1}. ${nombre} - $${precio}`
        );

    });

}

//Calculo de la cuenta
function calcularCuenta() {

    let subtotal = pedidos.reduce(
        (acumulador, pedido) => {

            return acumulador + pedido.precio;

        },
        0
    );

    let iva = subtotal * 0.16;

    let total = subtotal + iva;

    console.log("\n===== CUENTA =====");

    console.log(`Subtotal: $${subtotal}`);
    console.log(`IVA: $${iva}`);
    console.log(`Total: $${total}`);

}

//Exporta los modulos
module.exports = {
    pedidos,
    totalAcumulado,
    agregarPedido,
    listarPedidos,
    calcularCuenta
};

// menu

const readline = require("node:readline/promises");

const consola = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



async function menuCaja() {

    let opcion = "";

    while (opcion !== "0") {

        console.log("\n===== CAJA =====");

        console.log("1. Ver productos");
        console.log("2. Agregar pedido");
        console.log("3. Ver pedidos");
        console.log("4. Calcular cuenta");
        console.log("0. Salir");

        opcion = await consola.question(
            "\nElige una opcion: "
        );

        
        if (opcion === "1") {

            cocina.consultarProductos();

        }

       
        else if (opcion === "2") {

            cocina.consultarProductos();

            let idProducto = Number(
                await consola.question(
                    "\nID del producto: "
                )
            );

            agregarPedido(idProducto);

        }

        else if (opcion === "3") {

            listarPedidos();

        }

        else if (opcion === "4") {

            calcularCuenta();

        }

        else if (opcion !== "0") {

            console.log("\nOpcion no valida.");

        }

    }

    consola.close();

    console.log("\nPrograma terminado.");

}



if (require.main === module) {

    menuCaja();

}