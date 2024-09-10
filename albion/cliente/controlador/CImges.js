//TODO: KLASx Krei Legi Agordi Sxangxi
import { CGenerico } from "./generico/CGenerico.js";

export class CImges extends CGenerico{
    static url = ""
    static CLASE = CImges
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
        this.constructor._super_setURL('./server/modelos/tablas/MImges.php');
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(itemID, dir, archivo, formato) {
        if (!itemID) {
            alert("Falta itemID: es una foreing key");
            throw new Error("Falta itemID: es una foreing key");
        }
        if ((formato == "")||(formato != "jpg") && (formato != "png") && (formato != "jpeg")) {
            alert(`Falta formato: .jpg||.png||.jpeg El punto no es nacesario;${formato}`);
            throw new Error("Falta formato: jpg||png||jpeg El punto no es nacesario");
        }
        if ((formato == "jpg") || (formato == "png") || (formato == "jpeg")) {
            formato = "."+formato;
        }
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'insertar_fila', itemID:itemID, dir:dir, archivo:archivo, formato:formato},
            dataType: 'json',
            success: function(response) {
                return self._super_control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self._super_control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    async actualizar(itemID, dir, archivo, formato) { // Agordi
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'actualizar_por_id', itemID:itemID, dir:dir, archivo:archivo, formato:formato },
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