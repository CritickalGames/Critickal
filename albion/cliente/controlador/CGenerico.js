//TODO: KLASx Krei Legi Agordi Sxangxi

export class CGenerico {
    static urls={}; // Propiedad estática para la URL

    static setURL(newURL) {
        console.log("Seteando " + newURL);
        let hijo = this
        hijo.url = newURL; // Asigna la propiedad url a la clase hija
        console.log(hijo.name); // Muestra en consola el nombre de la clase hija
        console.log(hijo.url);

        CGenerico.urls[this.name] = newURL;
        console.log(CGenerico.urls);
    }

    static getURL(hijo_nombre) {
        console.log(CGenerico.urls[hijo_nombre]);
        
        return CGenerico.urls[hijo_nombre];
    }

    control_success(res){
        if (res.success || res.success == null) {
            console.log('Ciudad eleminada');
            console.info(res.success);
            return true;
        }  else {
            console.error("ELIMINAR:",
                "\nCodigo: ",res.error.code,
                "\nArchivo: ",res.error.file,
                "\nLinea: ",res.error.line,
                "\nMensaje: ",res.error.menssage);
            alert("Mensaje: ",res.error.menssage);
            return false;
        }
    }

    control_errores(jqXHR, textStatus, errorThrown){
        console.error('Error en la petición:', textStatus, errorThrown);
        console.error('Detalles:', jqXHR.responseText);
        return false;
    }

    static async mostrar(hijo, callback, html_id) {
        hijo = CGenerico.getURL(hijo.name)        
        if (!hijo) {
            throw new Error("La URL no está definida.");
        }
        await $.ajax({
            url: hijo,
            type: 'POST',
            data: { action: 'select_todo' },
            dataType: 'json',
            success: function(response) {
                if (callback && typeof callback === 'function') {
                    callback(response, html_id); // Llama al callback con los datos
                    console.info("Ya se hizo callback");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la petición:', textStatus, errorThrown);
                console.error('Detalles:', jqXHR.responseText);
            }
        });
    }
}
