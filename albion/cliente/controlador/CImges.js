//TODO: KLASx Krei Legi Agordi Sxangxi
import { CGenerico } from "./CGenerico.js";

export class CImges extends CGenerico{
    url = ""
    static setURL(url){
        super.setURL(url);
        CImges.url = url;
    }
    static getURL(){
        console.clear();
        return super.getURL(CImges.name);
    }
    mostrar(callback, html_id){
        CImges.mostrar(CImges, callback, html_id);
    }
    control_success(response){
        super.control_success(response);
    }
    control_errores(jqXHR, textStatus, errorThrown){
        super.control_errores(jqXHR, textStatus, errorThrown);
    }
    constructor() {
        super();   
        CImges.setURL('./server/modelos/tablas/MImges.php');
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(itemID, dir, archivo, formato) {
        if ((formato == "")) {
            alert("Falta formato");
            throw new Error("Falta formato");
        }
        if ((formato == "jpg") || (formato == "png") || (formato == "jpeg")) {
            formato = "."+formato;
        }
        
        const self = this;
        await $.ajax({
            url: CImges.getURL(),
            type: 'POST',
            data: { action: 'insertar_fila', itemID:itemID, dir:dir, archivo:archivo, formato:formato},
            dataType: 'json',
            success: function(response) {
                return self.control_success(response);
            },
            error: function(e) {
                return self.control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    async actualizar(itemID, dir, archivo, formato) { // Agordi
        const self = this;
        await $.ajax({
            url: CImges.getURL(),
            type: 'POST',
            data: { action: 'actualizar_por_id', itemID:itemID, dir:dir, archivo:archivo, formato:formato },
            dataType: 'json',
            success: function(response) {
                return self.control_success(response);
            },
            error: function() {
                return self.control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    
    async eliminar(id) { // Sxangxi
        const self = this;
        await $.ajax({
            url: CImges.getURL(),
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