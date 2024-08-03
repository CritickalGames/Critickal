<?php
require_once "./MTabla_generica.php"; // Asegúrate de incluir la clase base

class MOrdenes extends MTabla_generica {
    protected const TABLA = "items";
    protected const ATRIBUTOS = "ciudadID, itemID, precio_compra, precio_venta";

    protected function insert_into(string ...$valores): bool {
        return parent::insert_into(...$valores);
    }
    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insert(
        string $ciudadID, string $itemID, 
        string $precio_compra, string $precio_venta){
        $this->insert_into($ciudadID, $itemID, $precio_compra, $precio_venta);
    }

    public function borrar(string $condicion): bool {
        return parent::borrar($condicion);
    }

    protected function select_(string $atr="*", string $condicion="1"): array|string {
        return parent::select_($atr, $condicion);
    }

    protected function update_(string $set, string $condicion="1", string $update_tipo=""): array|string {
        return parent::update_($set, $condicion, $update_tipo);
    }

    public function update_generico(string $atr, string $nuevo_valor, string $where = "1"){
        $set = "$atr=$nuevo_valor";
        $condicion = $where;
        $this->update_($set, $condicion);
    }
    protected function executeAction($action): array {
        switch ($action) {
            case 'insert':
                $ciudadID = $_POST['ciudadID'] ?? null;
                $itemID = $_POST['itemID'] ?? null;
                $precio_compra = $_POST['precio_compra'] ?? null;
                $precio_venta = $_POST['precio_venta'] ?? null;
                return ['success' => $this->insert($ciudadID, $itemID, $precio_compra, $precio_venta)];
            default:
                return parent::executeAction($action); // Llama al método de la clase base para acciones no específicas
        }
    }
}

//Gestor de AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $obj = new MCiudades();
    $obj->gestionarAjax();
}
?>