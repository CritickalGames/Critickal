//TODO: KLASx Krei Legi Agordi Sxangxi
import { CGenerico } from "./CGenerico.js";

export class CCiudades extends CGenerico {
    constructor() {
        super();
        CGenerico.setURL('./server/modelos/tablas/MCiudades.php');
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(id, nombre) {
        await $.ajax({
            url: CGenerico.getURL(),
            type: 'POST',
            data: { action: 'insertar_fila', id: id, nombre: nombre },
            dataType: 'json',
            success: function(response) {
                    console.info(response);
                if (response.success || response.success == null) {
                    console.log('Ciudad agregada');
                    console.info(response.success);
                    return true;
                } else {
                    console.error("AGREGAR:",
                        "\nCodigo: ", response.error.code,
                        "\nArchivo: ", response.error.file,
                        "\nLinea: ", response.error.line,
                        "\nMensaje: ", response.error.message);
                    return false;
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la petición:', textStatus, errorThrown);
                console.error('Detalles:', jqXHR.responseText);
                return false;
            }
        });
    }
    async actualizar(id, nuevo_valor) { // Agordi
        await $.ajax({
            url: CGenerico.getURL(),
            type: 'POST',
            data: { action: 'actualizar_por_id', id: id, nuevo_valor: nuevo_valor},
            dataType: 'json',
            success: function(response) {
                if (response.success || response.success == null) {
                    console.log('Ciudad agregada');
                    console.info(response.success);
                    return true;
                }  else {
                    console.error("ACTUALIZAR:",
                        "\nCodigo: ",response.error.code,
                        "\nArchivo: ",response.error.file,
                        "\nLinea: ",response.error.line,
                        "\nMensaje: ",response.error.message);
                    return false;
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la petición:', textStatus, errorThrown);
                console.error('Detalles:', jqXHR.responseText);
                return false;
            }
        });
    }
    
    async eliminar(id) { // Sxangxi
        await $.ajax({
            url: CGenerico.getURL(),
            type: 'POST',
            data: { action: 'borrar_por_id', id: id},
            dataType: 'json',
            success: function(response) {
                if (response.success || response.success == null) {
                    console.log('Ciudad eleminada');
                    console.info(response.success);
                    return true;
                }  else {
                    console.error("ELIMINAR:",
                        "\nCodigo: ",response.error.code,
                        "\nArchivo: ",response.error.file,
                        "\nLinea: ",response.error.line,
                        "\nMensaje: ",response.error.message);
                    return false;
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la petición:', textStatus, errorThrown);
                console.error('Detalles:', jqXHR.responseText);
                return false;
            }
        });
    }
}