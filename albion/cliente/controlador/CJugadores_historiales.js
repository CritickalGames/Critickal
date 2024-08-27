//TODO: KLASx Krei Legi Agordi Sxangxi
import { CGenerico } from "./CGenerico.js";

export class CJugadores_historiales extends CGenerico{
    url = ""
    static setURL(url){
        super.setURL(url);
        CJugadores_historiales.url = url;
    }
    static getURL(){
        console.clear();
        return super.getURL(CJugadores_historiales.name);
    }
    mostrar(callback, html_id){
        CJugadores_historiales.mostrar(CJugadores_historiales, callback, html_id);
    }
    control_success(response){
        super.control_success(response);
    }
    control_errores(jqXHR, textStatus, errorThrown){
        super.control_errores(jqXHR, textStatus, errorThrown);
    }
    constructor() {
        super();   
        CJugadores_historiales.setURL('./server/modelos/tablas/MJugadores_historiales.php');
    }// el resto de funciones serán KLASx para trabajar con los modelos

    async agregar(id_movimiento, id_jugador, id_item, item_cant, item_precio, monto) {
        if ((id_jugador == "") || (id_item == "") || (item_cant == "" || parseInt(item_cant) <= 0)) {
            let error = "como mínimo uno de estos argumentos está vacío: id_jugador, id_item, item_cant. No puedes comprar o vender 0 o menos";
            alert(error);
            throw new Error(error);
        }
        if ((item_precio =="") && (monto =="")) {
            let error = "Pon un valor distinto a 0.A precio o a monto. No pueden ser ambos vacíos";
            alert(error);
            throw new Error(error);
        }
        if ((item_precio =="0") && (monto =="0")) {
            let error = "Pon un valor distinto a precio o a monto. No pueden ser ambos 0";
            alert(error);
            throw new Error(error);
        }
        item_precio = (item_precio=="" && monto !="") ? monto/item_cant:item_precio;
        item_precio = (parseInt(item_precio)>0) ? item_precio : String((parseInt(item_precio)*-1))
        monto = (monto=="" && item_precio !="") ? item_precio*item_cant:monto;
        const self = this;
        await $.ajax({
            url: CJugadores_historiales.getURL(),
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
                return self.control_success(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                return self.control_errores(jqXHR, textStatus, errorThrown);
            }
        });
    }
    
    async actualizar(id_movimiento, id_jugador, id_item, item_cant, item_precio, monto) {
        if ((item_precio =="") && (monto =="")) {
            let error = "Pon un valor distinto a 0.A precio o a monto. No pueden ser ambos vacíos";
            alert(error);
            throw new Error(error);
        }
        if ((item_precio =="0") && (monto =="0")) {
            let error = "Pon un valor distinto a precio o a monto. No pueden ser ambos 0";
            alert(error);
            throw new Error(error);
        }
        item_precio = (item_precio=="" && monto !="") ? monto/item_cant:item_precio;
        item_precio = (parseInt(item_precio)>0) ? item_precio : String((parseInt(item_precio)*-1))
        monto = (monto=="" && item_precio !="") ? item_precio*item_cant:monto;
        const self = this;
        await $.ajax({
            url: CJugadores_historiales.getURL(),
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
            url: CJugadores_historiales.getURL(),
            type: 'POST',
            data: { action: 'borrar_por_id', id_movimiento: id},
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