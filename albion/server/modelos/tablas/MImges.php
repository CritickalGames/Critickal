<?php
require_once "./MTabla_generica.php"; 
// Llamado por su respectivo controlador en el cliente

class MImges extends MTabla_generica {
    protected const TABLA = "Imges";
    protected const ATRIBUTOS = ["itemID", "dir", "archivo", "formato"];
    protected const CONDICION = self::ATRIBUTOS[0]."=?";
}
class Imges_consultas extends MImges{
    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insertar_fila(string $itemID, string $dir, string $archivo, string $formato){
        $this->insert_into($itemID, $dir, $archivo, $formato);
    }
    public function actualizar_por_id(string $itemID, string $dir, string $archivo, string $formato){
        $set = '';
        $externos = array();
        $array = [$dir, $archivo, $formato]; // eliminar elementos vacíos
        $keys = array_keys($array); // obtener los índices del array original
        foreach ($keys as $i => $key) {
            if ($array[$key] == "") {
                continue; // Sale del bucle completamente
            }
            $set .= self::ATRIBUTOS[$i+1] . "=?, ";
            $externos[] = $array[$key];
        }
        $externos[] = $itemID;
        $set = rtrim($set, ', ');
        //El orden de los parametros importa
        $this->update_set_where($set, static::CONDICION, "", $externos);
    }
    public function borrar_por_id(string $id){
        $this->delete_from_where(static::CONDICION, [$id]);
    }
    protected function executeAction($action): array|string{
        switch ($action) {//Select_all es generico y está en Tabla_generica
            case 'insertar_fila':
                $itemID = $_POST['itemID'] ?? null;
                $dir = $_POST['dir'] ?? null;
                $archivo = $_POST['archivo'] ?? null;
                $formato = $_POST['formato'] ?? null;
                try {
                    return json_encode(['success' => $this->insertar_fila($itemID, $dir, $archivo, $formato)]);
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
                $itemID = $_POST['itemID'] ?? null;
                $dir = $_POST['dir'] ?? null;
                $archivo = $_POST['archivo'] ?? null;
                $formato = $_POST['formato'] ?? null;
                try{
                    return json_encode(['success' => $this->actualizar_por_id($itemID, $dir, $archivo, $formato)]);
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
                    return ['success' => $this->borrar_por_id($id)];
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
    $obj = new Imges_consultas();
    $obj->gestionarAjax();
}

?>
