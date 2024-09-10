//TODO: KLASx Krei Legi Agordi Sxangxi
import { CGenerico } from "./generico/CGenerico.js";

export class CCiudades extends CGenerico {
    static url = ""
    static CLASE = CCiudades
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
        this.constructor._super_setURL('./server/modelos/tablas/MCiudades.php');
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(id, nombre) {        
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'insertar_fila', id: id, nombre: nombre },
            dataType: 'json',
            success: function(response) {
                return self._super_control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self._super_control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    async actualizar(id, nuevo_valor) { // Agordi
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'actualizar_por_id', id: id, nuevo_valor: nuevo_valor},
            dataType: 'json',
            success: function(response) {
                return self._super_control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self._super_control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    
    async eliminar(id) { // Sxangxi
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'borrar_por_id', id: id},
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