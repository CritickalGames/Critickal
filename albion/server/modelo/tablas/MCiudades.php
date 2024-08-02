<?php
require_once "./../MConexion.php";
require_once "./MTabla_generica.php"; // Asegúrate de incluir la clase base

class MCiudades extends MTabla_generica {
    protected const TABLA = "ciudades";
    protected const ATRIBUTOS = "ID, Nombre";

    protected function insert_into(string ...$valores): bool {
        return parent::insert_into(...$valores);
    }
    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insert(string $id, string $nombre){
        $this->insert_into($id, $nombre);
    }

    public function borrar(string $condicion): bool {
        return parent::borrar($condicion);
    }

    public function select_todo(): array {
        return parent::select_todo();
    }
}

// Ejemplo de uso
$ciudades = new MCiudades();
echo "Iniciamos: ";
// Insertar una ciudad
//$ciudades->insert("pp", "ppantano");
// Borrar una ciudad
//$ciudades->borrar("ID = 'pp'");
// Seleccionar todas las ciudades
print_r($ciudades->select_todo());
?>
