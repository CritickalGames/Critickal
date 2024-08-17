//TODO: KLASx Krei Legi Agordi Sxangxi

export class CGenerico {
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
}