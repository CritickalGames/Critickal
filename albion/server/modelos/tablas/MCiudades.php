<?php
require_once "./MTabla_generica.php"; 
// Llamado por su respectivo controlador en el cliente

class MCiudades extends MTabla_generica {
    protected const TABLA = "ciudades";
    protected const ATRIBUTOS = ["ID","nombre"];
    protected const CONDICION = self::ATRIBUTOS[0]."=?";

}
class Ciudad_consultas extends MCiudades{
    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insertar_fila(string $id, string $nombre){
        $this->insert_into($id, $nombre);
    }
    public function actualizar_por_id(string $id, string $nuevo_valor){
        $set = self::ATRIBUTOS[1]."=?";
        //El orden de los parametros importa
        $this->update_set_where($set, static::CONDICION, "", [$nuevo_valor, $id]);
    }
    public function borrar_por_id(string $id){
        $this->delete_from_where(static::CONDICION, [$id]);
        return static::CONDICION;
    }
    protected function executeAction($action): array|string{
        switch ($action) {//Select_all es generico y está en Tabla_generica
            case 'insertar_fila':
                $id = $_POST['id'] ?? null;
                $nombre = $_POST['nombre'] ?? null;
                try {
                    return ['success' => $this->insertar_fila($id, $nombre)];
                } catch (mysqli_sql_exception $e) {
                    // Captura el error y envíalo en formato JSON
                    return $this->error($e);
                }
            case 'actualizar_por_id':
                $id = $_POST['id'] ?? null;
                $nuevo_valor = $_POST['nuevo_valor'] ?? null;
                try{
                    return ['success' => $this->actualizar_por_id($id, $nuevo_valor)];
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
    $obj = new Ciudad_consultas();
    $obj->gestionarAjax();
}
?>
