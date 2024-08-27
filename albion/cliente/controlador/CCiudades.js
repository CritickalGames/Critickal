//TODO: KLASx Krei Legi Agordi Sxangxi
import { CGenerico } from "./CGenerico.js";

export class CCiudades extends CGenerico {
    url = ""
    static setURL(url){
        super.setURL(url);
        CCiudades.url = url;
    }
    static getURL(){
        console.clear();
        return super.getURL(CCiudades.name);
    }
    mostrar(callback, html_id){
        CCiudades.mostrar(CCiudades, callback, html_id);
    }
    control_success(response){
        super.control_success(response);
    }
    control_errores(jqXHR, textStatus, errorThrown){
        super.control_errores(jqXHR, textStatus, errorThrown);
    }
    constructor() {
        super();   
        CCiudades.setURL('./server/modelos/tablas/MCiudades.php');
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(id, nombre) {
        console.log("AGREGAR CIUDAD");
        
        const self = this;
        await $.ajax({
            url: CCiudades.getURL(),
            type: 'POST',
            data: { action: 'insertar_fila', id: id, nombre: nombre },
            dataType: 'json',
            success: function(response) {
                return self.control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self.control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    async actualizar(id, nuevo_valor) { // Agordi
        const self = this;
        await $.ajax({
            url: CCiudades.getURL(),
            type: 'POST',
            data: { action: 'actualizar_por_id', id: id, nuevo_valor: nuevo_valor},
            dataType: 'json',
            success: function(response) {
                return self.control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self.control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    
    async eliminar(id) { // Sxangxi
        const self = this;
        await $.ajax({
            url: CCiudades.getURL(),
            type: 'POST',
            data: { action: 'borrar_por_id', id: id},
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