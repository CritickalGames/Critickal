<?php
require_once "./MTabla_generica.php"; 
// Llamado por su respectivo controlador en el cliente

class MOrdenes extends MTabla_generica {
    protected const TABLA = "ordenes";
    protected const ATRIBUTOS = ["ciudadID", "itemID", "precio_compra", "precio_venta"];
    protected const CONDICION = self::ATRIBUTOS[0]."=? AND ".self::ATRIBUTOS[1]."=?";
}

class Ordenes_consultas extends MOrdenes{
    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insertar_fila(string $ciudadID, string $itemID, string $precio_compra, string $precio_venta){
        $this->insert_into($ciudadID, $itemID, $precio_compra, $precio_venta);
    }
    public function actualizar_por_id(string $ciudadID, string $itemID, string $precio_compra, string $precio_venta){
        $set = self::ATRIBUTOS[2]."=? , ".self::ATRIBUTOS[3]."=?";
        //El orden de los parametros importa
        $this->update_set_where($set, static::CONDICION, "", [$precio_compra, $precio_venta, $ciudadID, $itemID]);
    }
    public function borrar_por_id(string $ciudadID,string $itemID){
        $this->delete_from_where(static::CONDICION, [$ciudadID, $itemID]);
    }
    protected function executeAction($action): array|string{
        switch ($action){//Select_all es generico y está en Tabla_generica
            case 'insertar_fila':
                $ciudadID = $_POST['ciudadID'] ?? null;
                $itemID = $_POST['item'] ?? null;
                $precio_compra = $_POST['compra'] ?? null;
                $precio_venta = $_POST['venta'] ?? null;
                try {
                    return ['success' => $this->insertar_fila($ciudadID, $itemID, $precio_compra, $precio_venta)];
                } catch (mysqli_sql_exception $e) {
                    // Captura el error y envíalo en formato JSON
                    return $this->error($e);
                }
            case 'actualizar_por_id':
                $ciudad = $_POST['ciudad'] ?? null;
                $item = $_POST['item'] ?? null;
                $compra = $_POST['compra'] ?? null;
                $venta = $_POST['venta'] ?? null;
                try{
                    return ['success' => $this->actualizar_por_id($ciudad, $item, $compra, $venta)];
                } catch (mysqli_sql_exception $e) {
                    // Captura el error y envíalo en formato JSON
                    return $this->error($e);
                }
            case 'borrar_por_id':
                $ciudadID = $_POST['ciudadID'] ?? null;
                $item = $_POST['item'] ?? null;
                try {
                    return ['success' => $this->borrar_por_id($ciudadID, $item)];
                } catch (mysqli_sql_exception $e) {
                    // Captura el error y envíalo en formato JSON
                    return $this->error($e);
                }
            default:
                return parent::executeAction($action);// Llama al método de la clase base para acciones no específicas
        }
    }
}

//Gestor de AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $obj = new Ordenes_consultas();
    $obj->gestionarAjax();
}
?>