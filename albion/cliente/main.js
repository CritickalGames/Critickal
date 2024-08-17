//?Elige el usuario
//!De momento, sólo habrá un usuario
/**
 * Todo: Login
 * Todo: Perfiles para la base de datos
 * !Todo: Evitar inyección SQL
 * Todo: perfiles en el cliente
 * Todo: un motor de busqueda para items ya que los nombres de los items están separados por categorias.
 * Todo: Un selector de itmes en forma de lista similar a albion
 * Todo: Una lista de "objetos favoritos del jugador" para que revise actualice sus precios de formas más rápida
 */

//import * as ADMIN from './controlador/barriles/Barril_admin.js'; // Asegúrate de que la ruta sea correcta
import {CCiudades} from './controlador/CCiudades.js'; // Asegúrate de que la ruta sea correcta

$(document).ready(function() {
    // Crear una instancia de CCiudades
    //const Ciudades = new ADMIN.Ciudades();
    let Ciudades = new CCiudades();/*
    const Imgs = new ADMIN.Imgs();
    const Items = new ADMIN.Items();
    const Jugadores_historial = new ADMIN.Jugadores_historial();
    const Jugadores = new ADMIN.Jugadores();
    const Ordenes = new ADMIN.Ordenes();*/
    
    
    async function actualizarHTML_callback(data) {
        $('#resultado').empty(); // Limpia el div
        data.forEach(item => {
            $('#resultado').append(`<p>ID: ${item.ID}, Nombre: ${item.nombre}</p>`);
        });
    }

    async function succes_result(callback, ...parametros) {
        return callback(...parametros);
    }
    
    // Ejemplo de uso del método agregar
    $('#agregarCiudad').on('click', async function() {
        const id = $('#ciudadID').val();
        const nombre = $('#ciudadNombre').val();
    
        try {
            const success = await Ciudades.agregar(id, nombre);
            if (success || success==null) {
                console.log("Operación: agregar ciudad");  
                await Ciudades.mostrar(actualizarHTML_callback);
            } else {
                console.error("No se pudo agregar la ciudad", success);
            }
        } catch (error) {
            console.error("Error: no se pudo agregar:", error);
        }
    });
    
    // Botón para solo mostrar datos
    $('#mostrarDatos').on('click', async function() {
        await Ciudades.mostrar(actualizarHTML_callback);
    });
    $("#actualizar").click(async function() {
        const id = $("#ciudadID").val();
        const nuevoNombre = $("#ciudadNombre").val();
        const success = await Ciudades.actualizar(id, nuevoNombre);
        if (success || success==null) {
            console.log("Operación: actualizar ciudad"); 
            await Ciudades.mostrar(actualizarHTML_callback);
        } else {
            console.log("No se pudo actualizar la ciudad");
        }
    });
    $("#eliminar").click(async function() {
        const id = $("#ciudadID").val();
        const success = await Ciudades.eliminar(id);
        if (success || success==null) {
            console.log("Operación: eleminar ciudad"); 
            await Ciudades.mostrar(actualizarHTML_callback);
        } else {
            console.log("No se pudo eliminar la ciudad");
        }
    });

    // Llamar al método mostrar para inicializar la vista
    Ciudades.mostrar(actualizarHTML_callback);
});

