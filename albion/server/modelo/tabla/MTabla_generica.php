<?php
require_once "./../MConexion.php";
/**
 * Es llamado por todos los modelos de las tablas. Mciudades.php, por ejemplo
*/
class MTabla_generica {
    protected MConexion_Singleton $db_obj;

    protected const TABLA = "";
    protected const ATRIBUTOS = [""];

    public function __construct() {
        $this->db_obj = MConexion_Singleton::getInstance();
    }

    private function enviar_consulta(string $sql, array $params = []){
        return $this->db_obj->enviarConsultaPreparada($sql, $params);
    }
    private function enviar_solicitud(string $sql, array $params = []){
        return $this->db_obj->enviar_solicitud($sql, $params);
    }
    protected function insert_into(string ...$params) {
        $atr = implode(', ', array_map(fn($v) => $v, static::ATRIBUTOS));
        $placeholders = implode(', ', array_fill(0, count($params), '?'));

        $tabla = static::TABLA;
        $sql = "INSERT INTO $tabla($atr) VALUES($placeholders)";
        $stmt = $this->enviar_consulta($sql, $params);
        return $stmt;
    }
    protected function select_from_where(string $atr="*", string $condicion="1", array $params=[]) {
        $tabla = static::TABLA;
        $sql = "SELECT $atr FROM $tabla WHERE $condicion";
        $stmt = $this->enviar_solicitud($sql, $params);
        return $stmt;
    }
    protected function update_set_where(string $set, string $condicion = "1", string $update_tipo = "", array $params=[]){
        $tabla = static::TABLA;
        $sql = "UPDATE $update_tipo $tabla SET $set WHERE $condicion";
        $stmt = $this->enviar_consulta($sql, $params);
        return $stmt;
    }
    protected function delete_from_where(string $condicion, array $params=[]) {
        $tabla = static::TABLA;
        $sql = "DELETE FROM $tabla WHERE $condicion";
        $stmt = $this->enviar_consulta($sql, $params);
        return $stmt;
    }
    public function select_todo(){
        $return = $this->select_from_where("*", "1");
        return $return;
    }


    public function gestionarAjax() {
        $action = $_POST['action'] ?? null;
        $response = $this->executeAction($action);

        echo json_encode($response);
        exit;
    }
    protected function executeAction($action): array {
        switch ($action) {
            default:
                return $this->select_todo();
        }
    }
}
?>
