<?php
require_once "./../MConexion.php";

class MTabla_generica {
    protected MConexion_Singleton $db_obj;

    protected const TABLA = "";
    protected const ATRIBUTOS = "";

    public function __construct() {
        $this->db_obj = MConexion_Singleton::getInstance();
    }

    public function borrar(string $condicion) {
        return $this->db_obj->delete_set(static::TABLA, $condicion); // Utiliza static:: para acceso polimórfico
    }

    protected function insert_into(string ...$valores) {
        $valores_str = implode(', ', array_map(fn($v) => "'$v'", $valores));
        return $this->db_obj->insert_into_set(static::TABLA, static::ATRIBUTOS, $valores_str);
    }

    public function select_todo() {
        return $this->db_obj->select(static::TABLA);
    }
}
?>
