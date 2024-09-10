// CItemes.js
import { CGenerico } from "./generico/CGenerico.js";

export class CItemes extends CGenerico {
    static url = ""
    static CLASE = CItemes
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
        this.constructor._super_setURL('./server/modelos/tablas/MItemes.php');
    }

    async agregar(id, tipo, nombre_principal, tier, nivel, rareza, cualidad) {
        if (!id) {
            alert("ID necesita valor");
            throw new Error("Falta itemID: es una foreing key");
        }
        tier = tier || 1;
        nivel = nivel || 0;
        rareza = rareza || 1;
        cualidad = cualidad ||1;
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'insertar_fila', 
                id: id, 
                tipo: tipo, 
                nombre_principal: nombre_principal, 
                tier: tier, 
                nivel: nivel, 
                rareza: rareza,
                cualidad: cualidad },
            dataType: 'json',
            success: function(response) {
                return self._super_control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self._super_control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }

    async actualizar(id, nuevo_tipo, nuevo_nombre_principal, nuevo_tier, nuevo_nivel, nuevo_rareza, nuevo_cualidad) {
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'actualizar_por_id', id: id, nuevo_tipo: nuevo_tipo, nuevo_nombre_principal: nuevo_nombre_principal, nuevo_tier: nuevo_tier, nuevo_nivel: nuevo_nivel, nuevo_rareza: nuevo_rareza, nuevo_cualidad: nuevo_cualidad },
            dataType: 'json',
            success: function(response) {
                return self._super_control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self._super_control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }

    async eliminar(id) {
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'borrar_por_id', id: id },
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