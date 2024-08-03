//!Elige el usuario
//!De momento, sólo habrá un usuario

import { CCiudades } from './controladores/CCiudades.js'; // Asegúrate de que la ruta sea correcta

$(document).ready(function() {
    // Crear una instancia de CCiudades
    const ciudades = new CCiudades();
    
    // Función para actualizar el HTML con los datos obtenidos
    function actualizarHTML(data) {
        $('#resultado').empty(); // Limpia el div
        data.forEach(item => {
            $('#resultado').append(`<p>ID: ${item.ID}, Nombre: ${item.nombre}</p>`);
        });
    }

    // Llamar al método mostrar para inicializar la vista
    ciudades.mostrar(actualizarHTML);
    
    // Ejemplo de uso del método agregar
    $('#agregarCiudad').on('click', function() {
        const id = $('#ciudadID').val();
        const nombre = $('#ciudadNombre').val();
        ciudades.agregar(id, nombre);
        ciudades.mostrar(actualizarHTML);
    });
    
    // Botón para solo mostrar datos
    $('#mostrarDatos').on('click', function() {
        ciudades.mostrar(actualizarHTML);
    });
});

