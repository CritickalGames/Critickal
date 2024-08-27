//TODO: KLASx Krei Legi Agordi Sxangxi
import { CGenerico } from "./CGenerico.js";

export class COrdenes extends CGenerico{
    url = ""
    static setURL(url){
        super.setURL(url);
        COrdenes.url = url;
    }
    static getURL(){
        console.clear();
        return super.getURL(COrdenes.name);
    }
    mostrar(callback, html_id){
        COrdenes.mostrar(COrdenes, callback, html_id);
    }
    control_success(response){
        super.control_success(response);
    }
    control_errores(jqXHR, textStatus, errorThrown){
        super.control_errores(jqXHR, textStatus, errorThrown);
    }
    constructor() {
        super();   
        COrdenes.setURL('./server/modelos/tablas/MOrdenes.php');
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(ciudad, item, compra, venta) {
        const self = this;
        await $.ajax({
            url: COrdenes.getURL(),
            type: 'POST',
            data: { action: 'insertar_fila', ciudadID: ciudad, item:item, compra:compra, venta:venta},
            dataType: 'json',
            success: function(response) {
                return self.control_success(response);

            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self.control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    async actualizar(ciudad, item, compra, venta) { // Agordi

        const self = this;
        await $.ajax({
            url: COrdenes.getURL(),
            type: 'POST',
            data: { action: 'actualizar_por_id', ciudad:ciudad, item:item, compra:compra, venta:venta},
            dataType: 'json',
            success: function(response) {
                return self.control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self.control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    
    async eliminar(ciudad, item) { // Sxangxi
        await $.ajax({
            url: COrdenes.getURL(),
            type: 'POST',
            data: { action: 'borrar_por_id', ciudadID: ciudad, item: item},
            dataType: 'json',
            success: function(response) {
                return self.control_success(response);

            },
            error: function(jqXHR, textStatus, errorThrown) {
                return this.control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
}