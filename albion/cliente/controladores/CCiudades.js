export class CCiudades {
    constructor() {
        this.url = './server/modelos/tablas/MCiudades.php';
    }

    mostrar(callback) {
        $.ajax({
            url: this.url,
            type: 'POST',
            data: { action: 'select_todo' },
            success: (response) => {
                const data = JSON.parse(response);
                if (callback && typeof callback === 'function') {
                    callback(data); // Llama al callback con los datos
                }
            },
            error: (xhr, status, error) => {
                console.error('Error en la petición:', error);
            }
        });
    }

    agregar(id, nombre) {
        $.ajax({
            url: this.url,
            type: 'POST',
            data: { action: 'insert', id: id, nombre: nombre },
            success: (response) => {
                const result = JSON.parse(response);
                if (result.success) {
                    console.log('Ciudad agregada correctamente');
                }
            },
            error: (xhr, status, error) => {
                console.error('Error en la petición:', error);
            }
        });
    }
}