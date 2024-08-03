<?php
require_once "./MTabla_generica.php"; // Asegúrate de incluir la clase base

class MJugadores_historial extends MTabla_generica {
    protected const TABLA = "jugadores_historial";
    protected const ATRIBUTOS = "id_movimiento, id_jugador, id_item, monto";

    protected function insert_into(string ...$valores): bool {
        return parent::insert_into(...$valores);
    }
    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insert(string $id_movimiento, string $id_jugador, string $id_item, string $monto){
        $this->insert_into($id_movimiento, $id_jugador, $id_item, $monto);
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
                //id_movimiento, id_jugador, id_item, monto
                $id_movimiento = $_POST['id_movimiento'] ?? null;
                $id_jugador = $_POST['id_jugador'] ?? null;
                $id_item = $_POST['id_item'] ?? null;
                $monto = $_POST['monto'] ?? null;
                return ['success' => $this->insert($id_movimiento, $id_jugador, $id_item, $monto)];
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
