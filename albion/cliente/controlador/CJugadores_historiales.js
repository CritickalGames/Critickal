//TODO: KLASx Krei Legi Agordi Sxangxi
import { CGenerico } from "./generico/CGenerico.js";

export class CJugadores_historiales extends CGenerico{
    static url = ""
    static CLASE = CJugadores_historiales
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
        this.constructor._super_setURL('./server/modelos/tablas/MJugadores_historiales.php');
    }// el resto de funciones serán KLASx para trabajar con los modelos

    _control_de_datos(id_jugador, id_item, item_cant, item_precio, monto){
        if (!id_jugador || !id_item) {
            alert("Falta id_jugador o id_item: son una foreing key");
            throw new Error("Falta id_jugador o id_item: son una foreing key");
        }
        if ((!item_cant)) {
            let error = "Está vacío: item_cant.";
            alert(error);
            throw new Error(error);
        }
        if ((!item_precio) && ((monto=="0") || (!monto))) {
            let error = "Pon un valor distinto de 0. A precio o a monto. No pueden ser ambos vacíos";
            alert(error);
            throw new Error(error);
        }
        if ((item_precio=="0") && ((monto=="0") || (!monto))) {
            let error = "Pon un valor distinto a precio o a monto. No pueden ser ambos 0";
            alert(error);
            throw new Error(error);
        }
        const PRECIO_INT = parseInt(item_precio);
        const MONTO_INT = parseInt(monto);
        const CANT_INT = parseInt(item_cant);
        item_precio = (!item_precio && item_precio=="0" && monto) ? MONTO_INT/CANT_INT:item_precio;
        item_precio = (PRECIO_INT<0) ? String(PRECIO_INT*-1):item_precio
        monto = ((!monto || monto=="0") && item_precio) ? (PRECIO_INT*CANT_INT)*-1:MONTO_INT*-1;

        return item_cant, item_precio, monto;
    }
    async agregar(id_movimiento, id_jugador, id_item, item_cant, item_precio, monto) {
        item_cant, item_precio, monto = this._control_de_datos(id_jugador, id_item, item_cant, item_precio, monto);
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { 
                action: 'insertar_fila', 
                id_movimiento: id_movimiento, 
                id_jugador: id_jugador, 
                id_item: id_item, 
                item_cant: item_cant, 
                item_precio: item_precio, 
                monto: monto 
            },
            dataType: 'json',
            success: function(response) {
                return self._super_control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self._super_control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    
    async actualizar(id_movimiento, id_jugador, id_item, item_cant, item_precio, monto) {
        if (!id_movimiento) {
            alert("Falta Id_Movimiento");
            throw new Error("Falta Id_Movimiento");
        }
        item_cant, item_precio, monto = this._control_de_datos(id_jugador, id_item, item_cant, item_precio, monto);
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { 
                action: 'actualizar_por_id', 
                id_movimiento: id_movimiento, 
                id_jugador: id_jugador, 
                id_item: id_item, 
                item_cant: item_cant, 
                item_precio: item_precio, 
                monto: monto 
            },
            dataType: 'json',
            success: function(response) {
                return self._super_control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self._super_control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    
    async eliminar(id_movimiento) { // Sxangxi
        if (!id_movimiento) {
            alert("Falta Id_Movimiento");
            throw new Error("Falta Id_Movimiento");
        }
        const self = this;
        await $.ajax({
            url: this.constructor._super_getURL(),
            type: 'POST',
            data: { action: 'borrar_por_id', id_movimiento: id_movimiento},
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