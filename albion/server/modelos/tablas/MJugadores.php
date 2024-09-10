<?php
require_once "./MTabla_generica.php"; 
// Llamado por su respectivo controlador en el cliente

class MJugadores extends MTabla_generica {
    protected const TABLA = "jugadores";
    protected const ATRIBUTOS = ["ID", "Nombre", "presupuesto"];
    protected const CONDICION = self::ATRIBUTOS[0]."=?";
}

class Jugadores_consultas extends MJugadores{
    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insertar_fila(string $id, string $nombre, string $presupuesto){
        $this->insert_into($id, $nombre, $presupuesto);
    }
    public function actualizar_por_id(string $id, string $nombre, string $presupuesto){
        $set = self::ATRIBUTOS[1]."=?,".self::ATRIBUTOS[2]."=?";
        //El orden de los parametros importa
        $this->update_set_where($set, static::CONDICION, "", [$nombre, $presupuesto, $id]);
    }
    public function borrar_por_id(string $id){
        $this->delete_from_where(static::CONDICION, [$id]);
    }
    protected function executeAction($action): array|string{
        switch ($action){//Select_all es generico y está en Tabla_generica
            case 'insertar_fila':
                $id = $_POST['id'] ?? null;
                $nombre = $_POST['nombre'] ?? null;
                $presupuesto = $_POST['presupuesto'] ?? null;
                try {
                    return ['success' => $this->insertar_fila($id, $nombre, $presupuesto)];
                } catch (mysqli_sql_exception $e) {
                    // Captura el error y envíalo en formato JSON
                    return $this->error($e);
                }
            case 'actualizar_por_id':
                $id = $_POST['id'] ?? null;
                $nombre = $_POST['nuevo_valor'] ?? null;
                $presupuesto = $_POST['presupuesto'] ?? null;
                try{
                    return ['success' => $this->actualizar_por_id($id, $nombre, $presupuesto)];
                } catch (mysqli_sql_exception $e) {
                    // Captura el error y envíalo en formato JSON
                    return $this->error($e);
                }
            case 'borrar_por_id':
                $id = $_POST['id'] ?? null;
                try {
                    return ['success' => $this->borrar_por_id($id)];
                } catch (mysqli_sql_exception $e) {
                    // Captura el error y envíalo en formato JSON
                    return $this->error($e);
                }
            default:
                return parent::executeAction($action);// Llama al método de la clase base para acciones no específicas
        }
    }
}
//Gestor de AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $obj = new Jugadores_consultas();
    $obj->gestionarAjax();
}
?>
