//TODO: KLASx Krei Legi Agordi Sxangxi

export class CCiudades {
    constructor() {
        this.url = './server/modelos/tablas/MCiudades.php';
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(id, nombre) {
        await $.ajax({
            url: this.url,
            type: 'POST',
            data: { action: 'insertar_fila', id: id, nombre: nombre },
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
    async mostrar(callback) { // Legi
        await $.ajax({
            url: this.url,
            type: 'POST',
            data: { action: 'select_todo' },
            success: function(response) {
                const data = JSON.parse(response);
                if (callback && typeof callback === 'function') {
                    callback(data); // Llama al callback con los datos
                    console.info("Ya se hizo callback");
                }
            },
            error: function(response) {
                console.error('Error en la petición:', error);
            }
        });
    }
    async actualizar(id, nuevo_valor) { // Agordi
        await $.ajax({
            url: this.url,
            type: 'POST',
            data: { action: 'actualizar_por_id', id: id, nuevo_valor: nuevo_valor},
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