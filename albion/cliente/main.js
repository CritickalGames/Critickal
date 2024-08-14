//?Elige el usuario
//!De momento, sólo habrá un usuario
/**
 * Todo: Login
 * Todo: Perfiles para la base de datos
 * !Todo: Evitar inyección SQL
 * Todo: perfiles en el cliente
 */

import { CCiudades } from './controladores/CCiudades.js'; // Asegúrate de que la ruta sea correcta

$(document).ready(function() {
    // Crear una instancia de CCiudades
    const ciudades = new CCiudades();
    
    
    async function actualizarHTML_callback(data) {
        $('#resultado').empty(); // Limpia el div
        data.forEach(item => {
            $('#resultado').append(`<p>ID: ${item.ID}, Nombre: ${item.nombre}</p>`);
        });
    }

    // Llamar al método mostrar para inicializar la vista
    ciudades.mostrar(actualizarHTML_callback);
    
    // Ejemplo de uso del método agregar
    $('#agregarCiudad').on('click', async function() {
        const id = $('#ciudadID').val();
        const nombre = $('#ciudadNombre').val();
    
        try {
            const success = await ciudades.agregar(id, nombre);
            if (success) {
                await ciudades.mostrar(actualizarHTML_callback);
            } else {
                console.log("No se pudo agregar la ciudad");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
    
    // Botón para solo mostrar datos
    $('#mostrarDatos').on('click', async function() {
        await ciudades.mostrar(actualizarHTML_callback);
    });
    $("#actualizar").click(async function() {
        const id = $("#ciudadID").val();
        const nuevoNombre = $("#ciudadNombre").val();
        const success = await ciudades.actualizar(id, nuevoNombre);
        if (success) {
            await ciudades.mostrar(actualizarHTML_callback);
        } else {
            console.log("No se pudo actualizar la ciudad");
        }
    });
    $("#eliminar").click(async function() {
        const id = $("#ciudadID").val();
        const success = await ciudades.eliminar(id);
        if (success) {
            await ciudades.mostrar(actualizarHTML_callback);
        } else {
            console.log("No se pudo eliminar la ciudad");
        }
    });
});

