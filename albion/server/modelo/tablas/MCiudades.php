<?php
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

    protected function select_(string $atr="*", string $condicion="1"): array|string {
        return parent::select_($atr, $condicion);
    }

    public function select_todo(){
        $this->select_();
    }
    
    protected function update_(string $set, string $condicion="1", string $update_tipo=""): array|string {
        return parent::update_($set, $condicion, $update_tipo);
    }

    public function update_generico(string $atr, string $nuevo_valor, string $where = "1"){
        $set = "$atr=$nuevo_valor";
        $condicion = $where;
        $this->update_($set, $condicion);
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
