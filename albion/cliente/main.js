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
    const Imges = new ADMIN.Imges();
    const Items = new ADMIN.Items();
    const Jugadores_historiales = new ADMIN.Jugadores_historiales();
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
    
    async function control_errors(success, OBJ, operacion) {
        if (success || success==null) {
            console.log("Operación: "+operacion+" ciudad");  
            await OBJ.mostrar(actualizarHTML_callback);
        } else {
            console.error("No se pudo "+operacion+" la ciudad", success);
        }
    }
    
    
    // Botones de Ciudad
    $('#agregar_Ciudad').on('click', async function() {
        const id = $('#ciudad_ID').val();
        const nombre = $('#ciudad_nombre').val();
    
        const success = await Ciudades.agregar(id, nombre);
        control_errors(success,Ciudades,"agregar");
    });
    $('#mostrar_Ciudades').on('click', async function() {
        await Ciudades.mostrar(actualizarHTML_callback);
    });
    $("#actualizar_Ciudad").click(async function() {
        const id = $("#ciudad_ID").val();
        const nuevoNombre = $("#ciudad_nombre").val();

        const success = await Ciudades.actualizar(id, nuevoNombre);
        control_errors(success,Ciudades,"actualizar");
    });
    $("#eliminar_Ciudad").click(async function() {
        const id = $("#ciudad_ID").val();
        
        const success = await Ciudades.eliminar(id);
        control_errors(success,Ciudades,"eliminar");
    });
    // Botones de Imgs
    $('#agregar_Img').on('click', async function() {
        const id = $("#img_itemID").val();
        const dir = $("#img_dir").val();
        const archivo = $("#img_archivo").val();
        const formato = $("#img_formato").val();
    
        const success = await Imges.agregar(id, dir, archivo, formato);
        control_errors(success,Imges,"agregar");
    });
    $('#mostrar_Imges').on('click', async function() {
        await Imges.mostrar(actualizarHTML_callback);
    });
    $("#actualizar_Img").click(async function() {
        const id = $("#img_itemID").val();
        const dir = $("#img_dir").val();
        const archivo = $("#img_archivo").val();
        const formato = $("#img_formato").val();

        const success = await Imges.actualizar(id, dir, archivo, formato);
        control_errors(success,Imges,"actualizar");
    });
    $("#eliminar_Img").click(async function() {
        const id = $("#img_itemID").val();

        const success = await Imges.eliminar(id);
        control_errors(success,Imges,"eliminar");
    });
    // Botones de Items
    $('#agregar_Item').on('click', async function() {
        const id = $('#itemes_ID').val();
        const tipo = $('#itemes_tipo').val();
        const nombrePrincipal = $('#itemes_nombrePrincipal').val();
        const tier = $('#itemes_tier').val();
        const nivel = $('#itemes_nivel').val();
        const rareza = $('#itemes_rareza').val();
        const cualidad = $('#itemes_cualidad').val();
    
        const success = await Itemes.agregar(
            id, tipo, nombrePrincipal,
            tier,nivel,rareza,cualidad
        );
        control_errors(success,Itemes,"agregar");
    });
    $('#mostrar_Itemes').on('click', async function() {
        await Itemes.mostrar(actualizarHTML_callback);
    });
    $("#actualizar_Item").click(async function() {
        const id = $('#itemes_ID').val();
        const tipo = $('#itemes_tipo').val();
        const nombrePrincipal = $('#itemes_nombrePrincipal').val();
        const tier = $('#itemes_tier').val();
        const nivel = $('#itemes_nivel').val();
        const rareza = $('#itemes_rareza').val();
        const cualidad = $('#itemes_cualidad').val();

        const success = await Itemes.actualizar(
            id, tipo, nombrePrincipal,
            tier,nivel,rareza,cualidad
        );
        control_errors(success,Itemes,"actualizar");
    });
    $("#eliminar_Item").click(async function() {
        const id = $("#itemes_ID").val();

        const success = await Itemes.eliminar(id);
        control_errors(success,Itemes,"eleminar");
    });
    // Botones de Jugadores
    $('#agregar_Jugador').on('click', async function() {
        const id = $('#jugador_ID').val();
        const nombre = $('#jugador_nombre').val();
        const presupuesto = $('#jugador_presupuesto').val();

        const success = await Jugadores.agregar(id, nombre, presupuesto);
        control_errors(success,Jugadores,"agregar");
    });
    $('#mostrar_Jugadores').on('click', async function() {
        await Jugadores.mostrar(actualizarHTML_callback);
    });
    $("#actualizar_Jugador").click(async function() {
        const id = $('#jugador_ID').val();
        const nombre = $('#jugador_nombre').val();
        const presupuesto = $('#jugador_presupuesto').val();

        const success = await Jugadores.actualizar(id, nombre, presupuesto);
        control_errors(success,Jugadores,"actualizar");
    });
    $("#eliminar_Jugador").click(async function() {
        const id = $("#jugador_ID").val();

        const success = await Jugadores.eliminar(id);
        control_errors(success,Jugadores,"eliminar");
    });
    // Botones de Jugadores_historial
    $('#agregar_Jugador_historial').on('click', async function() {
        const jugador = $('#jugador_historial_id_jugador').val();
        const item = $('#jugador_historial_id_item').val();
        const cant = $('#jugador_historial_item_cant').val();
        const precio = $('#jugador_historial_item_precio').val();
        const monto = $('#jugador_historial_monto').val();
    
        const success = await Jugadores_historiales.agregar(
            jugador, item, cant, precio, monto
        );
        control_errors(success,Jugadores_historiales,"agregar");
    });
    $('#mostrar_Jugadores_historiales').on('click', async function() {
        await Jugadores_historiales.mostrar(actualizarHTML_callback);
    });
    $("#actualizar_Jugador_historial").click(async function() {
        const jugador = $('#jugador_historial_id_jugador').val();
        const item = $('#jugador_historial_id_item').val();
        const cant = $('#jugador_historial_item_cant').val();
        const precio = $('#jugador_historial_item_precio').val();
        const monto = $('#jugador_historial_monto').val();
 
        const success = await Jugadores_historiales.actualizar(
            jugador, item, cant, precio, monto
        );
        control_errors(success,Jugadores_historiales,"actualizar");
    });
    $("#eliminar_Jugador_historial").click(async function() {
        const id = $("#jugador_historial_id_movimiento").val();

        const success = await Jugadores_historiales.eliminar(id);
        control_errors(success,Jugadores_historiales,"eliminar");
    });
    // Botones de Ordenes
    $('#agregar_Orden').on('click', async function() {
        const ciudad = $('#mostrar_Ordenes').val();
        const item = $('#agregar_Orden').val();
        const compra = $('#eliminar_Orden').val();
        const venta = $('#ciudadID').val();
    
        const success = await Ordenes.agregar(ciudad, item, compra, venta);
        control_errors(success,Ordenes,"agregar");
    });
    $('#mostrar_Ordenes').on('click', async function() {
        await Ordenes.mostrar(actualizarHTML_callback);
    });
    $("#actualizar_Orden").click(async function() {
        const id = $("#ciudadID").val();
        const nuevoNombre = $("#ciudadNombre").val();
        const success = await Ordenes.actualizar(id, nuevoNombre);
        control_errors(success,Ordenes,"actualizar");
    });
    $("#eliminar_Orden").click(async function() {
        const id = $("#ciudadID").val();
        const success = await Ordenes.eliminar(id);
        control_errors(success,Ordenes,"eliminar");
    });

    // Llamar al método mostrar para inicializar la vista
    Ciudades.mostrar(actualizarHTML_callback);
});

