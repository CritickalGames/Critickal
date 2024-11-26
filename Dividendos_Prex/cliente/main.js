import * as ADMIN from './controladores/barriles/Barril_admin.js';

const Acciones = new ADMIN.Acciones();

const html_acciones = "consola"
// Declara un objeto global para almacenar la información
const formularioData = {};

async function actualizarHTML_callback(data, html_id) {
    html_id = "#"+html_id
    console.log(html_id);
    $(html_id).empty(); // * Limpia el div
    data.forEach(item => {
        let texto = '';
        for (const key in item) {
            texto += `${key}: ${item[key]} || `;
        }

        console.log(texto);
        $(html_id).append(`<p>${texto}</p>`);            
    });
}

async function control_errors(success, OBJ, operacion, html_id) {
    if (success || success==null) {
        console.log("Operación: "+operacion+" "+html_id);  
       await OBJ.super_mostrar(actualizarHTML_callback, html_id);
    } else {
        console.error("No se pudo "+operacion+" la ciudad", success);
    }
}

document.getElementById('enviar').addEventListener('click', async function(event)
{

    // Obtén los valores de los campos del formulario
    const simbolo = document.getElementById('simbolo').value;
    const precio = document.getElementById('precio').value;
    const dividendo = document.getElementById('dividendo').value;
    const tipo = document.getElementById('tipo').value;
    const meses_de_pago = document.getElementById('meses_de_pago').value;
    const rendimiento = document.getElementById('rendimiento').value;
    const inversion = document.getElementById('inversion').value;
    const ganancia = document.getElementById('ganancia').value;

    const success = await Acciones.agregar(
        simbolo, precio, dividendo, 
        tipo, meses_de_pago, rendimiento, 
        inversion, ganancia);
    control_errors(success, Acciones,"agregar", html_acciones);
});
document.getElementById('eliminar').addEventListener('click', async function(event)
{
    const simbolo = document.getElementById('simbolo').value;
    const success = await Acciones.eliminar(simbolo);
    control_errors(success, Acciones,"eliminar", html_acciones);
});
document.getElementById('mostrar').addEventListener('click', async function(event)
{
    const success = await Acciones.super_mostrar(actualizarHTML_callback, html_acciones);
    control_errors(success, Acciones,"mostrar", html_acciones);
});
document.getElementById('actualizar').addEventListener('click', async function(event)
{
    const simbolo = document.getElementById('simbolo').value;
    const precio = document.getElementById('precio').value;
    const dividendo = document.getElementById('dividendo').value;
    const tipo = document.getElementById('tipo').value;
    const meses_de_pago = document.getElementById('meses_de_pago').value;
    const rendimiento = document.getElementById('rendimiento').value;
    const inversion = document.getElementById('inversion').value;
    const ganancia = document.getElementById('ganancia').value;
    const success = await Acciones.actualizar(
        simbolo, precio, dividendo, 
        tipo, meses_de_pago, rendimiento, 
        inversion, ganancia);
    control_errors(success, Acciones,"actualizar", html_acciones);
});