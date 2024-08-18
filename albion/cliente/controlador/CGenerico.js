//TODO: KLASx Krei Legi Agordi Sxangxi

export class CGenerico {
    static url = ''; // Propiedad estática para la URL

    static setURL(newURL) {
        this.url = newURL;
    }

    static getURL() {
        return this.url;
    }

    async mostrar(callback) {
        if (!CGenerico.url) {
            throw new Error("La URL no está definida.");
        }
        await $.ajax({
            url: CGenerico.url,
            type: 'POST',
            data: { action: 'select_todo' },
            dataType: 'json',
            success: function(response) {
                if (callback && typeof callback === 'function') {
                    callback(response); // Llama al callback con los datos
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
