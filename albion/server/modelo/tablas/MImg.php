<?php
require_once "./../MConexion.php";

class MImg
{
    private MConexion_Singleton $db_obj;

    const TABLA = "img";
    const ATRIBUTOS = "itemID, dir, archivo, formato";

    public function __construct() {
        $this->db_obj = MConexion_Singleton::getInstance();
    }

    public function borrar(string $condicion) {
        $TABLA = self::TABLA;
        return $this->db_obj->delete_set($TABLA, $condicion);
    }

    public function insert(string $id, string $nombre) {
        $TABLA = self::TABLA;
        $ATRIBUTOS = self::ATRIBUTOS;
        return $this->db_obj->insert_into_set($TABLA, $ATRIBUTOS, "'$id', '$nombre'");
    }

    public function select_todo(){
        $TABLA = self::TABLA;
        $ATRIBUTOS = self::ATRIBUTOS;
        return $this->db_obj->select($TABLA);
    }
}

//$ciudades = new MCiudades();
//echo "Iniciamos: ";
//echo " ";
//$ciudades->insert("pp","ppantano");
//$ciudades->borrar("ID = 'pp'");
//print_r($ciudades->select_todo());

?>