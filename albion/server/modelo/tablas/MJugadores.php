<?php
require_once "./MTabla_generica.php"; // Asegúrate de incluir la clase base

class MJugadores extends MTabla_generica {
    protected const TABLA = "jugadores";
    protected const ATRIBUTOS = "ID, Nombre, presupuesto";

    protected function insert_into(string ...$valores): bool {
        return parent::insert_into(...$valores);
    }
    protected function update_(string $set, string $condicion="1", string $update_tipo=""): array|string {
        return parent::update_($set, $condicion, $update_tipo);
    }

    protected function select_(string $atr="*", string $condicion="1"): array|string {
        return parent::select_($atr, $condicion);
    }

    public function select_todo(){
        $this->select_();
    }

    public function update_generico(string $atr, string $nuevo_valor, string $where = "1"){
        $set = "$atr=$nuevo_valor";
        $condicion = $where;
        $this->update_($set, $condicion);
    }

    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insert(string $id, string $nombre, string $presupuesto){
        $this->insert_into($id, $nombre, $presupuesto);
    }

    public function borrar(string $condicion): bool {
        return parent::borrar($condicion);
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
