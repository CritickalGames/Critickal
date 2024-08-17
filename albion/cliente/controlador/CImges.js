//TODO: KLASx Krei Legi Agordi Sxangxi
import * as Controlador_generico from "CGenerico";
export class CImgs extends Controlador_generico{
    constructor() {
        this.url = './server/modelos/tablas/MImgs.php';
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(itemID, dir, archivo, formato) {
        await $.ajax({
            url: this.url,
            type: 'POST',
            data: { action: 'insertar_fila', itemID:itemID, dir:dir, archivo:archivo, formato:formato},
            dataType: 'json',
            success: function(response) {
                const result = JSON.parse(response);
                if (result.success || result.success == null) {
                    console.log('Ciudad agregada');
                    console.info(result.success);
                    console.info(result);
                    return true;
                }  else {
                    console.error("AGREGAR:",
                        "\nCodigo: ",result.error.code,
                        "\nArchivo: ",result.error.file,
                        "\nLinea: ",result.error.line,
                        "\nMensaje: ",result.error.message);
                    return false;
                }
            },
            error: function(e) {
                console.error('Error en la petición:', e);
                return false;
            }
        });
    }
    async actualizar(itemID, dir, archivo, formato) { // Agordi
        await $.ajax({
            url: this.url,
            type: 'POST',
            data: { action: 'actualizar_por_id', itemID:itemID, dir:dir, archivo:archivo, formato:formato },
            dataType: 'json',
            success: function(response) {
                const result = JSON.parse(response);
                if (result.success || result.success == null) {
                    console.log('Ciudad agregada');
                    console.info(result.success);
                    console.info(result);
                    return true;
                }  else {
                    console.error("ACTUALIZAR:",
                        "\nCodigo: ",result.error.code,
                        "\nArchivo: ",result.error.file,
                        "\nLinea: ",result.error.line,
                        "\nMensaje: ",result.error.message);
                    return false;
                }
            },
            error: function() {
                console.error('Error en la petición:', error);
                return false;
            }
        });
    }
    
    async eliminar(id) { // Sxangxi
        await $.ajax({
            url: this.url,
            type: 'POST',
            data: { action: 'borrar_por_id', id: id },
            dataType: 'json',
            success: function(response) {
                const result = JSON.parse(response);
                if (result.success || result.success == null) {
                    console.log('Ciudad eleminada');
                    console.info(result.success);
                    console.info(result);
                    return true;
                }  else {
                    console.error("ELIMINAR:",
                        "\nCodigo: ",result.error.code,
                        "\nArchivo: ",result.error.file,
                        "\nLinea: ",result.error.line,
                        "\nMensaje: ",result.error.message);
                    return false;
                }
            },
            error: function() {
                console.error('Error en la petición:', error);
                return false;
            }
        });
    }
}