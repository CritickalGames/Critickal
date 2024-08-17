//TODO: KLASx Krei Legi Agordi Sxangxi
import * as Controlador_generico from "CGenerico";

export class CItems extends Controlador_generico{
    constructor() {
        this.url = './server/modelos/tablas/MItems.php';
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(ID,tipo,nombreprincipal,tier,nivel,rarerza,cualidad) {
        await $.ajax({
            url: this.url,
            type: 'POST',
            data: { action: 'insertar_fila', 
                ID:ID,
                tipo:tipo,
                nombreprincipal:nombreprincipal,
                tier:tier,
                nivel:nivel, 
                rarerza:rarerza,
                cualidad:cualidad},
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
    async actualizar(ID,tipo,nombreprincipal,tier,nivel,rarerza,cualidad) { // Agordi
        await $.ajax({
            url: this.url,
            type: 'POST',
            data: { action: 'insertar_fila', 
                ID:ID,
                tipo:tipo,
                nombreprincipal:nombreprincipal,
                tier:tier,
                nivel:nivel, 
                rarerza:rarerza,
                cualidad:cualidad},
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
            data: { action: 'borrar_por_id', id: id},
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