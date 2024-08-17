<?php
require_once "./MTabla_generica.php"; 
// Llamado por su respectivo controlador en el cliente

class MJugadores extends MTabla_generica {
    protected const TABLA = "jugadores";
    protected const ATRIBUTOS = ["ID", "Nombre", "presupuesto"];

    protected function insert_into(string ...$valores): bool {
        return parent::insert_into(...$valores);
    }
    protected function update_(string $set, string $condicion="1", string $update_tipo=""): array|string {
        return parent::update_($set, $condicion, $update_tipo);
    }

    protected function select_(string $atr="*", string $condicion="1"): array|string {
        return parent::select_($atr, $condicion);
    }
    
    public function update_generico(string $atr, string $nuevo_valor, string $where = "1"){
        $set = "$atr=$nuevo_valor";
        $condicion = $where;
        $this->update_($set, $condicion);
    }

    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insert(string $id, string $nombre, string $presupuesto){
        $this->insert_into($id, $nombre, $presupuesto);
    }

    protected function borrar(string $condicion): bool {
        return parent::borrar($condicion);
    }
    protected function executeAction($action): array {
        switch ($action) {
            case 'insert':
                //ID, Nombre, presupuesto
                $id = $_POST['id'] ?? null;
                $Nombre = $_POST['Nombre'] ?? null;
                $presupuesto = $_POST['presupuesto'] ?? null;
                return ['success' => $this->insert($id, $Nombre, $presupuesto)];
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
