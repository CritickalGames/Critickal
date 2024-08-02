<?php
require_once "./../MConexion.php";
/**
 * Es llamado por todos los modelos de las tablas. Mciudades.php, por ejemplo
*/
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
    /**
     * TODO: Crea un "insert" publico que le mande los valores al insert_into
     * @param string[] $valores
     * @return bool|mysqli_result
     */
    protected function insert_into(string ...$valores) {
        $valores_str = implode(', ', array_map(fn($v) => "'$v'", $valores));
        return $this->db_obj->insert_into_set(static::TABLA, static::ATRIBUTOS, $valores_str);
    }
    /**
     * @param string $atr
     * @param string $condicion
     * @return array|string
     */
    protected function select_(string $atr="*", string $condicion="1") {
        return $this->db_obj->select(static::TABLA, $atr, $condicion);
    }

    protected function update_(string $set, string $condicion, string $update_tipo){
        return $this->db_obj->update_set(static::TABLA, $set, $condicion, $update_tipo);
    }
}

?>
