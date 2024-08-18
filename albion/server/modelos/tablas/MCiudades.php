<?php
require_once "./MTabla_generica.php"; 
// Llamado por su respectivo controlador en el cliente

class MCiudades extends MTabla_generica {
    protected const TABLA = "ciudades";
    protected const ATRIBUTOS = ["ID","nombre"];

    protected function insert_into(string ...$valores){
        return parent::insert_into(...$valores);
    }
    protected function select_from_where(string $atr="*", string $condicion="1", array $params=[]) {
        return parent::select_from_where($atr, $condicion, $params);
    }
    
    protected function update_set_where(string $set, string $condicion = "1", string $update_tipo = "", array $params=[]) {
        return parent::update_set_where($set, $condicion, $update_tipo, $params);
    }
    protected function delete_from_where(string $condicion, array $params=[]) {
        return parent::delete_from_where($condicion, $params);
    }
}
class CiudadConsultas extends MCiudades{
    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insertar_fila(string $id, string $nombre){
        $this->insert_into($id, $nombre);
    }
    public function actualizar_por_id(string $id, string $nuevo_valor){
        $set = self::ATRIBUTOS[1]."=?";
        $condicion = self::ATRIBUTOS[0]."=?";
        //El orden de los parametros importa
        $this->update_set_where($set, $condicion, "", [$nuevo_valor, $id]);
    }
    public function borrar_por_id(string $id){
        $condicion = self::ATRIBUTOS[0]."=?";
        $this->delete_from_where($condicion, [$id]);
    }
    protected function executeAction($action): array|string{
        switch ($action) {//Select_all es generico y está en Tabla_generica
            case 'insertar_fila':
                $id = $_POST['id'] ?? null;
                $nombre = $_POST['nombre'] ?? null;
                try {
                    return json_encode(['success' => $this->insertar_fila($id, $nombre)]);
                } catch (mysqli_sql_exception $e) {
                    // Captura el error y envíalo en formato JSON
                    return json_encode([
                        'success' => false,
                        'error' => [
                            'message' => $e->getMessage(),
                            'code' => $e->getCode(),
                            'file' => $e->getFile(),
                            'line' => $e->getLine()
                        ]
                    ]);
                }
            case 'actualizar_por_id':
                $id = $_POST['id'] ?? null;
                $nuevo_valor = $_POST['nuevo_valor'] ?? null;
                try{
                    return ['success' => $this->actualizar_por_id($id, $nuevo_valor)];
                } catch (mysqli_sql_exception $e) {
                    // Captura el error y envíalo en formato JSON
                    return json_encode([
                        'success' => false,
                        'error' => [
                            'message' => $e->getMessage(),
                            'code' => $e->getCode(),
                            'file' => $e->getFile(),
                            'line' => $e->getLine()
                        ]
                    ]);
                }
            case 'borrar_por_id':
                $id = $_POST['id'] ?? null;
                try {
                    return json_encode(['success' => $this->borrar_por_id($id)]);
                } catch (mysqli_sql_exception $e) {
                    // Captura el error y envíalo en formato JSON
                    return json_encode([
                        'success' => false,
                        'error' => [
                            'message' => $e->getMessage(),
                            'code' => $e->getCode(),
                            'file' => $e->getFile(),
                            'line' => $e->getLine()
                        ]
                    ]);
                }
            default:
                return parent::executeAction($action);// Llama al método de la clase base para acciones no específicas
        }
    }
}
//Gestor de AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $obj = new CiudadConsultas();
    $obj->gestionarAjax();
}
?>
