//TODO: KLASx Krei Legi Agordi Sxangxi
import { CGenerico } from "./generico/CGenerico.js";

export class CAcciones extends CGenerico {
    static url = ""
    static CLASE = CAcciones
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
        this.constructor._super_setURL('./server/modelos/tablas/MAcciones.php');
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(simbolo, precio, dividendo, tipo, meses_de_pago, rendimiento, inversion, ganancia) { 
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'insertar_fila', simbolo: simbolo, precio: precio, dividendo: dividendo, tipo: tipo, meses_de_pago: meses_de_pago, rendimiento: rendimiento, inversion: inversion, ganancia: ganancia },
            dataType: 'json',
            success: function(response) {
                return self._super_control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self._super_control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }

    async actualizar(simbolo, precio, dividendo, tipo, meses_de_pago, rendimiento, inversion, ganancia) { 
        console.log(simbolo, precio, dividendo, tipo, meses_de_pago, rendimiento, inversion, ganancia);
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'actualizar_por_id', simbolo: simbolo, precio: precio, dividendo: dividendo, tipo: tipo, meses_de_pago: meses_de_pago, rendimiento: rendimiento, inversion: inversion, ganancia: ganancia },
            dataType: 'json',
            success: function(response) {
                console.log(response["success"]);
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