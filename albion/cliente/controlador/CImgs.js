//TODO: KLASx Krei Legi Agordi Sxangxi

export class CImgs {
    constructor() {
        this.url = './server/modelos/tablas/MImgs.php';
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(itemID, dir, archivo, formato) {
        try {
            const response = await $.ajax({
                url: this.url,
                type: 'POST',
                data: { action: 'insertar_fila', itemID:itemID, dir:dir, archivo:archivo, formato:formato},
            });
            const result = JSON.parse(response);
            if (result.success || result.success == null) {
                console.log('Img agregada');
                console.info(result.success);
                console.info(result);
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
                data: { action: 'actualizar_por_id', id: id, nuevo_valor: nuevo_valor }
            });
    
            const result = JSON.parse(response);
            if (result.success || result.success == null) {
                console.log('Ciudad actualizada');
                console.info(result.success);
                console.info(result);
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
                console.log('Ciudad eliminada');
                console.info(result.success);
                console.info(result);
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