<?php
require_once "./MTabla_generica.php"; 
// Llamado por su respectivo controlador en el cliente

class MCiudades extends MTabla_generica {
    protected const TABLA = "ciudades";
    protected const ATRIBUTOS = ["ID","nombre"];

    protected function insert_into(string ...$valores): bool {
        return parent::insert_into(...$valores);
    }
    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insert(string $id, string $nombre){
        $this->insert_into($id, $nombre);
    }

    protected function borrar(string $condicion): bool {
        return parent::borrar($condicion);
    }

    public function borrar_por_id(string $id){
        $condicion = self::ATRIBUTOS[0]."='$id'";
        $this->borrar($condicion);
    }

    protected function select_(string $atr="*", string $condicion="1"): array|string {
        return parent::select_($atr, $condicion);
    }
    
    protected function update_(string $set, string $condicion="1", string $update_tipo=""): array|string {
        return parent::update_($set, $condicion, $update_tipo);
    }
    /**
     * @param string $id
     * @param string $atr
     * @param string $nuevo_valor
     * @return void
     */
    public function update_por_id(string $id, string $nuevo_valor){
        $set = self::ATRIBUTOS[1]."='$nuevo_valor'";
        $condicion = self::ATRIBUTOS[0]."='$id'";
        $this->update_($set, $condicion);
    }


    protected function executeAction($action): array {
        switch ($action) {
            case 'insert':
                $id = $_POST['id'] ?? null;
                $nombre = $_POST['nombre'] ?? null;
                return ['success' => $this->insert($id, $nombre)];
            case 'update_por_id':
                $id = $_POST['id'] ?? null;
                $nuevo_valor = $_POST['nuevo_valor'] ?? null;
                return ['success' => $this->update_por_id($id, $nuevo_valor)];
            case 'borrar_por_id':
                $id = $_POST['id'] ?? null;
                return ['success' => $this->borrar_por_id($id)];
            default:
                return parent::executeAction($action);// Llama al método de la clase base para acciones no específicas
        }
    }
}

//Gestor de AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $obj = new MCiudades();
    $obj->gestionarAjax();
}
?>
