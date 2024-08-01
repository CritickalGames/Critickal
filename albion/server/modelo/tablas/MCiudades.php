<?php
require_once "./../MConexion.php";

class MCiudades
{
    private MConexion_Singleton $db_obj;

    const _tabla = "ciudades";
    const _atributos = "ID, Nombre";

    public function __construct() {
        $this->db_obj = MConexion_Singleton::getInstance();
    }

    public function borrar(string $condicion) {
        $_tabla = self::_tabla;
        return $this->db_obj->delete($_tabla, $condicion);
    }

    public function insert(string $id, string $nombre) {
        $_tabla = self::_tabla;
        $_atributos = self::_atributos;
        return $this->db_obj->set($_tabla, $_atributos, "'$id', '$nombre'");
    }
}

$ciudades = new MCiudades();
echo "Iniciamos: ";
echo " ";
//$ciudades->insert("pp","ppantano");
$ciudades->borrar("ID = 'pp'");
?>
