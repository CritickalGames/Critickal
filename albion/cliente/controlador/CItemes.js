// CItemes.js
import { CGenerico } from "./CGenerico.js";

export class CItemes extends CGenerico {
    static url = ""
    static setURL(url){
        super.setURL(url);
        CItemes.url = url;
    }
    static getURL(){
        console.clear();
        return super.getURL(CItemes.name);
    }
    mostrar(callback, html_id){
        CItemes.mostrar(CItemes, callback, html_id);
    }
    control_success(response){
        super.control_success(response);
    }
    control_errores(jqXHR, textStatus, errorThrown){
        super.control_errores(jqXHR, textStatus, errorThrown);
    }
    constructor() {
        super();
        CItemes.setURL('./server/modelos/tablas/MItemes.php');
    }

    async agregar(id, tipo, nombre_principal, tier, nivel, rareza, cualidad) {
        const self = this;
        await $.ajax({
            url: CItemes.getURL(),
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
                return self.control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self.control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }

    async actualizar(id, nuevo_tipo, nuevo_nombre_principal, nuevo_tier, nuevo_nivel, nuevo_rareza, nuevo_cualidad) {
        const self = this;
        await $.ajax({
            url: CItemes.getURL(),
            type: 'POST',
            data: { action: 'actualizar_por_id', id: id, nuevo_tipo: nuevo_tipo, nuevo_nombre_principal: nuevo_nombre_principal, nuevo_tier: nuevo_tier, nuevo_nivel: nuevo_nivel, nuevo_rareza: nuevo_rareza, nuevo_cualidad: nuevo_cualidad },
            dataType: 'json',
            success: function(response) {
                return self.control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self.control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }

    async eliminar(id) {
        const self = this;
        await $.ajax({
            url: CItemes.getURL(),
            type: 'POST',
            data: { action: 'borrar_por_id', id: id },
            dataType: 'json',
            success: function(response) {
                return self.control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self.control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
}