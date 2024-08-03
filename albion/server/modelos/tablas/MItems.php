<?php
require_once "./MTabla_generica.php"; // Asegúrate de incluir la clase base

class MItems extends MTabla_generica {
    protected const TABLA = "items";
    protected const ATRIBUTOS = "ID, tipo, nombreprincipal, tier, nivel, rareza";

    protected function insert_into(string ...$valores): bool {
        return parent::insert_into(...$valores);
    }
    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insert(
        string $ID, string $tipo, 
        string $nombreprincipal, string $tier, 
        string $nivel, string $rareza){
        $this->insert_into($ID, $tipo, $nombreprincipal, $tier, $nivel, $rareza);
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
                $id = $_POST['id'] ?? null;
                $tipo = $_POST['tipo'] ?? null;
                $nombreprincipal = $_POST['nombreprincipal'] ?? null;
                $tier = $_POST['tier'] ?? null;
                $nivel = $_POST['nivel'] ?? null;
                $rareza = $_POST['rareza'] ?? null;
                return ['success' => $this->insert($id, $tipo, $nombreprincipal, $tier, $nivel, $rareza)];
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