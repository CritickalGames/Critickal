//?Elige el usuario
//!De momento, sólo habrá un usuario
/**
 * ! Incorporar KLASx a la tabla
 * ! TODO: hacer que CJugadores_historiales.js actualice el presupuesto del jugador en cuestion
 * ! NO controlar los auto increment. Se supone que los movimientos no se deben eliminar
 * ! TODO: cuando una orden misma orden se agregue por segunda vez y salte el error 1062, debe llamar a Actualizar tabla
 * ! TODO: cambiar nombre de la tabla "jugadores_historial" a "movimientos". También actualizar nombre en html
 * *TODO: Comprobar si funcionan "historailes" y "ordenes"
 * Todo: Login
 * Todo: Perfiles para la base de datos
 * //!Todo: Evitar inyección SQL
 * Todo: Perfiles en el cliente
 * Todo: Un motor de busqueda para items ya que los nombres de los items están separados por categorias.
 * Todo: Un selector de itmes en forma de lista similar a albion
 * Todo: Una lista de "objetos favoritos del jugador" para que revise actualice sus precios de formas más rápida
 */
/** 
 * *Cosas que ya funcionan
 * * KLASx: Ciudades, Itemes, Imges, Jugadores, Jugadores_historial, Ordenes
 * * Evitar Iyección SQL
 */

import * as ADMIN from './controlador/barriles/Barril_admin.js'; // Asegúrate de que la ruta sea correcta

$(document).ready(function() {
    // Crear una instancia de CCiudades
    const Ciudades = new ADMIN.Ciudades();
    const Imges = new ADMIN.Imges();
    const Itemes = new ADMIN.Itemes();
    const Jugadores_historiales = new ADMIN.Jugadores_historiales();
    const Jugadores = new ADMIN.Jugadores();
    const Ordenes = new ADMIN.Ordenes();
    
    const html_ciudades = "resultado_ciudades"
    const html_imges = "resultado_imges"
    const html_itemes = "resultado_itemes"
    const html_jugadores = "resultado_jugadores"
    const html_jugadores_historiales = "resultado_jugadores_historiales"
    const html_ordenes = "resultado_ordenes"


    
    async function actualizarHTML_callback(data,html_id) {
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

    async function succes_result(callback, ...parametros) {
        return callback(...parametros);
    }
    
    async function control_errors(success, OBJ, operacion, html_id) {
        if (success || success==null) {
            console.log("Operación: "+operacion+" ciudad");  
            await OBJ.super_mostrar(actualizarHTML_callback, html_id);
        } else {
            console.error("No se pudo "+operacion+" la ciudad", success);
        }
    }
    
    // * Botones de Ciudad
    try {
        $('#agregar_Ciudad').on('click', async function() {
            const id = $('#ciudad_ID').val();
            const nombre = $('#ciudad_nombre').val();
        
            const success = await Ciudades.agregar(id, nombre);
            control_errors(success,Ciudades,"agregar", html_ciudades);
        });
        $('#mostrar_Ciudades').on('click', async function() {
            await Ciudades.super_mostrar(actualizarHTML_callback, html_ciudades);
        });
        $("#actualizar_Ciudad").click(async function() {
            const id = $("#ciudad_ID").val();
            const nuevoNombre = $("#ciudad_nombre").val();

            const success = await Ciudades.actualizar(id, nuevoNombre);
            control_errors(success,Ciudades,"actualizar", html_ciudades);
        });
        $("#eliminar_Ciudad").click(async function() {
            const id = $("#ciudad_ID").val();
            
            const success = await Ciudades.eliminar(id);
            control_errors(success,Ciudades,"eliminar", html_ciudades);
        });
    } catch (error) {
        
    }
     // * Botones de Imgs
    try {
        $('#agregar_Img').on('click', async function() {
            const id = $("#img_itemID").val();
            const dir = $("#img_dir").val();
            const archivo = $("#img_archivo").val();
            const formato = $("#img_formato").val();
        
            const success = await Imges.agregar(id, dir, archivo, formato);
            control_errors(success,Imges,"agregar", html_imges);
        });
        $('#mostrar_Imges').on('click', async function() {
            await Imges.super_mostrar(actualizarHTML_callback, html_imges);
        });
        $("#actualizar_Img").click(async function() {
            const id = $("#img_itemID").val();
            const dir = $("#img_dir").val();
            const archivo = $("#img_archivo").val();
            const formato = $("#img_formato").val();

            const success = await Imges.actualizar(id, dir, archivo, formato);
            control_errors(success,Imges,"actualizar", html_imges);
        });
        $("#eliminar_Img").click(async function() {
            const id = $("#img_itemID").val();

            const success = await Imges.eliminar(id);
            control_errors(success,Imges,"eliminar", html_imges);
        });
    } catch (error) {
        
    }
    // * Botones de Items
    try {
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
            control_errors(success,Itemes,"agregar", html_itemes);
        });
        $('#mostrar_Itemes').on('click', async function() {
            await Itemes.super_mostrar(actualizarHTML_callback, html_itemes);
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
            control_errors(success,Itemes,"actualizar", html_itemes);
        });
        $("#eliminar_Item").click(async function() {
            const id = $("#itemes_ID").val();

            const success = await Itemes.eliminar(id);
            control_errors(success,Itemes,"eleminar", html_itemes);
        });
    } catch (error) {
        
    }
    // * Botones de Jugadores
    try {
        $('#agregar_Jugador').on('click', async function() {
            const id = $('#jugador_ID').val();
            const nombre = $('#jugador_nombre').val();
            const presupuesto = $('#jugador_presupuesto').val();

            const success = await Jugadores.agregar(id, nombre, presupuesto);
            control_errors(success,Jugadores,"agregar", html_jugadores);
        });
        $('#mostrar_Jugadores').on('click', async function() {
            await Jugadores.super_mostrar(actualizarHTML_callback, html_jugadores);
        });
        $("#actualizar_Jugador").click(async function() {
            const id = $('#jugador_ID').val();
            const nombre = $('#jugador_nombre').val();
            const presupuesto = $('#jugador_presupuesto').val();

            const success = await Jugadores.actualizar(id, nombre, presupuesto);
            control_errors(success,Jugadores,"actualizar", html_jugadores);
        });
        $("#eliminar_Jugador").click(async function() {
            const id = $("#jugador_ID").val();

            const success = await Jugadores.eliminar(id);
            control_errors(success,Jugadores,"eliminar", html_jugadores);
        });
    } catch (error) {
        
    }
    // * Botones de Jugadores_historial
    try {
        $('#agregar_Jugador_historial').on('click', async function() {
            const movimiento = $('#jugador_historial_id_movimiento').val();
            const jugador = $('#jugador_historial_id_jugador').val();
            const item = $('#jugador_historial_id_item').val();
            const cant = $('#jugador_historial_item_cant').val();
            const precio = $('#jugador_historial_item_precio').val();
            const monto = $('#jugador_historial_monto').val();
        
            const success = await Jugadores_historiales.agregar(
                movimiento, jugador, item, cant, precio, monto
            );
            control_errors(success,Jugadores_historiales,"agregar", html_jugadores_historiales);
        });
        $('#mostrar_Jugadores_historiales').on('click', async function() {
            await Jugadores_historiales.super_mostrar(actualizarHTML_callback, html_jugadores_historiales);
        });
        $("#actualizar_Jugador_historial").click(async function() {
            const movimiento = $('#jugador_historial_id_movimiento').val();
            const jugador = $('#jugador_historial_id_jugador').val();
            const item = $('#jugador_historial_id_item').val();
            const cant = $('#jugador_historial_item_cant').val();
            const precio = $('#jugador_historial_item_precio').val();
            const monto = $('#jugador_historial_monto').val();
    
            const success = await Jugadores_historiales.actualizar(
                movimiento, jugador, item, cant, precio, monto
            );
            control_errors(success,Jugadores_historiales,"actualizar", html_jugadores_historiales);
        });
        $("#eliminar_Jugador_historial").click(async function() {
            const id = $("#jugador_historial_id_movimiento").val();

            const success = await Jugadores_historiales.eliminar(id);
            control_errors(success,Jugadores_historiales,"eliminar", html_jugadores_historiales);
        });
    } catch (error) {
        
    }
    // * Botones de Ordenes
    try {
        $('#agregar_Orden').on('click', async function() {
            const ciudad = $('#orden_ciudad').val();
            const item = $('#orden_item').val();
            const compra = $('#orden_compra').val();
            const venta = $('#orden_venta').val();
        
            const success = await Ordenes.agregar(ciudad, item, compra, venta);
            control_errors(success,Ordenes,"agregar", html_ordenes);
        });
        $('#mostrar_Ordenes').on('click', async function() {
            await Ordenes.super_mostrar(actualizarHTML_callback, html_ordenes);
        });
        $("#actualizar_Orden").click(async function() {
            const ciudad = $('#orden_ciudad').val();
            const item = $('#orden_item').val();
            const compra = $('#orden_compra').val();
            const venta = $('#orden_venta').val();
            const success = await Ordenes.actualizar(ciudad, item, compra, venta);
            control_errors(success,Ordenes,"actualizar", html_ordenes);
        });
        $("#eliminar_Orden").click(async function() {
            const ciudad = $('#orden_ciudad').val();
            const item = $('#orden_item').val();
            const success = await Ordenes.eliminar(ciudad, item);
            control_errors(success,Ordenes,"eliminar", html_ordenes);
        });
    } catch (error) {
        
    }
    

    // * Llamar al método mostrar para inicializar la vista
    Ciudades.super_mostrar(actualizarHTML_callback, html_ciudades)
    Imges.super_mostrar(actualizarHTML_callback, html_imges)
    Itemes.super_mostrar(actualizarHTML_callback, html_itemes)
    Jugadores_historiales.super_mostrar(actualizarHTML_callback, html_jugadores_historiales)
    Jugadores.super_mostrar(actualizarHTML_callback, html_jugadores)
    Ordenes.super_mostrar(actualizarHTML_callback, html_ordenes)
});

