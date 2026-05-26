const cocina = require("./cocina");

let pedidos = [];

let totalAcumulado = 0;


// FUNCION CALLBACK PARA NOTIFICACIONES
function notificarEstado(mensaje) {

    console.log(`\n[NOTIFICACION]: ${mensaje}`);

}


// FUNCION PARA AGREGAR PEDIDOS
async function agregarPedido(idProducto, callback) {

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


    // PREPARAR PRODUCTO EN COCINA
    try {

        let resultado = await cocina.prepararProducto(idProducto);

        
        // CALLBACK CUANDO EL PEDIDO ESTA LISTO
        callback(resultado);

    } catch (error) {

        
        // CALLBACK SI OCURRE ERROR
        callback(error);

    }

}


// FUNCION PARA CANCELAR PEDIDO
function cancelarPedido(index, callback) {

    if (
        index < 0 ||
        index >= pedidos.length
    ) {

        console.log("\nPedido no valido.");
        return;

    }

    let pedidoCancelado = pedidos.splice(index, 1)[0];

    totalAcumulado -= pedidoCancelado.precio;


    // CALLBACK CUANDO EL PEDIDO ES CANCELADO
    callback(
        `Pedido cancelado: ${pedidoCancelado.nombre}`
    );

}


// FUNCION PARA LISTAR PEDIDOS
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


// FUNCION PARA CALCULAR CUENTA
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


// EXPORTAR MODULOS
module.exports = {
    pedidos,
    totalAcumulado,
    agregarPedido,
    cancelarPedido,
    listarPedidos,
    calcularCuenta
};


// MENU
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
        console.log("5. Cancelar pedido");
        console.log("0. Salir");

        opcion = await consola.question(
            "\nElige una opcion: "
        );


        // VER PRODUCTOS
        if (opcion === "1") {

            cocina.consultarProductos();

        }


        // AGREGAR PEDIDO
        else if (opcion === "2") {

            cocina.consultarProductos();

            let idProducto = Number(
                await consola.question(
                    "\nID del producto: "
                )
            );

            await agregarPedido(
                idProducto,
                notificarEstado
            );

        }


        // VER PEDIDOS
        else if (opcion === "3") {

            listarPedidos();

        }


        // CALCULAR CUENTA
        else if (opcion === "4") {

            calcularCuenta();

        }


        // CANCELAR PEDIDO
        else if (opcion === "5") {

            listarPedidos();

            let index = Number(
                await consola.question(
                    "\nNumero del pedido a cancelar: "
                )
            );

            cancelarPedido(
                index - 1,
                notificarEstado
            );

        }


        // OPCION INVALIDA
        else if (opcion !== "0") {

            console.log("\nOpcion no valida.");

        }

    }

    consola.close();

    console.log("\nPrograma terminado.");

}


// EJECUTAR MENU
if (require.main === module) {

    menuCaja();

}