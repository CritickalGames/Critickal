//TODO: KLASx Krei Legi Agordi Sxangxi

export class CCiudades {
    constructor() {
        this.url = './server/modelos/tablas/MCiudades.php';
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(id, nombre) {
        try {
            const response = await $.ajax({
                url: this.url,
                type: 'POST',
                data: { action: 'insert', id: id, nombre: nombre },
            });
            const result = JSON.parse(response);
            if (result.success || result.success == null) {
                console.log('Ciudad agregada correctamente');
                return true;
            } else {
                console.error("No tuvo éxito");
                console.log(result);
                return false;
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            return false;
        }
    }
    async mostrar(callback) { // Legi
        try {
            const response = await $.ajax({
                url: this.url,
                type: 'POST',
                data: { action: 'select_todo' }
            });
            
            const data = JSON.parse(response);
            if (callback && typeof callback === 'function') {
                callback(data); // Llama al callback con los datos
            }
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    }
    
    async actualizar(id, nuevo_valor) { // Agordi
        try {
            const response = await $.ajax({
                url: this.url,
                type: 'POST',
                data: { action: 'update_por_id', id: id, nuevo_valor: nuevo_valor }
            });
    
            const result = JSON.parse(response);
            if (result.success || result.success == null) {
                console.log('Ciudad actualizada correctamente');
                return true;
            } else {
                console.error("No tuvo éxito");
                console.log(result);
                return false;
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            return false;
        }
    }
    
    async eliminar(id) { // Sxangxi
        try {
            const response = await $.ajax({
                url: this.url,
                type: 'POST',
                data: { action: 'borrar_por_id', id: id }
            });
    
            const result = JSON.parse(response);
            if (result.success || result.success == null) {
                console.log('Ciudad eliminada correctamente');
                return true;
            } else {
                console.error("No tuvo éxito");
                console.log(result);
                return false;
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            return false;
        }
    }

}