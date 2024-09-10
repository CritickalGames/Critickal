//TODO: KLASx Krei Legi Agordi Sxangxi
import { CGenerico } from "./generico/CGenerico.js";

export class COrdenes extends CGenerico{
    static url = ""
    static CLASE = COrdenes
    static _super_setURL(url){
        super.setURL(url);
        this.CLASE.url = url;
    }
    static _super_getURL(){
        return super.getURL(this.CLASE.name);
    }
    super_mostrar(callback, html_id){
        this.constructor.mostrar(this.constructor, callback, html_id);
    }
    _super_control_success(response){
        super.control_success(response);
    }
    _super_control_errores(jqXHR, textStatus, errorThrown){
        super.control_errores(jqXHR, textStatus, errorThrown);
    }
    constructor() {
        super();   
        this.constructor._super_setURL('./server/modelos/tablas/MOrdenes.php');
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(ciudad, item, compra, venta) {
        if (!ciudad || !item) {
            alert("Falta ciudad o item: son una foreing key");
            throw new Error("Falta ciudad o item: son una foreing key");
        }
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'insertar_fila', ciudadID: ciudad, item:item, compra:compra, venta:venta},
            dataType: 'json',
            success: function(response) {
                return self._super_control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self._super_control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    async actualizar(ciudad, item, compra, venta) { // Agordi

        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'actualizar_por_id', ciudad:ciudad, item:item, compra:compra, venta:venta},
            dataType: 'json',
            success: function(response) {
                return self._super_control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self._super_control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    
    async eliminar(ciudad, item) { // Sxangxi
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'borrar_por_id', ciudadID: ciudad, item: item},
            dataType: 'json',
            success: function(response) {
                return self._super_control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self._super_control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
}