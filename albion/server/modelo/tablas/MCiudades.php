<?php
require_once "./../MConexion.php";

class MCiudades extends MConexion
{
    const _tabla = "ciudades";
    const _atributos = "ID, Nombre";
    
    public function borrar(string $condicion){
        $_tabla = self::_tabla;
        return $this->delete($_tabla, "$condicion");
    }
    
    public function insert(string $id, string $nombre){
        $_tabla = self::_tabla;
        $_atributos = self::_atributos;
        return $this->set($_tabla, $_atributos, "'$id', '$nombre'");
    }
}

$ciudades = new MCiudades();
echo "iniciamos: ";
echo $ciudades->insert("pp","ppantano");
echo " ";
echo $ciudades->borrar("ID = 'pp'")
?>