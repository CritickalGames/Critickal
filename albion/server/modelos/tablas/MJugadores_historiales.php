<?php
require_once "./MTabla_generica.php"; 
// Llamado por su respectivo controlador en el cliente

class MJugadores_historiales extends MTabla_generica {
    protected const TABLA = "jugadores_historiales";
    protected const ATRIBUTOS = ["id_movimiento", "id_jugador", "id_item", "item_cant", "item_precio", "monto"];
    protected const CONDICION = self::ATRIBUTOS[0]."=?";
}

class Jugadores_historiales_consultas extends MJugadores_historiales {
    public function insertar_fila(string $id_movimiento, string $id_jugador, string $id_item, string $item_cant, string $item_precio, string $monto) {
        return $this->insert_into($id_movimiento, $id_jugador, $id_item, $item_cant, $item_precio, $monto);
    }

    public function actualizar_por_id(string $id_movimiento, string $id_jugador, string $id_item, string $item_cant, string $item_precio, string $monto) {
        $set = '';
        $externos = array();
        $array = [$id_jugador, $id_item, $item_cant, $item_precio, $monto]; // eliminar elementos vacíos
        $keys = array_keys($array); // obtener los índices del array original
        foreach ($keys as $i => $key) {
            if ($array[$key] == "") {
                continue; // Sale del bucle completamente
            }
            $set .= self::ATRIBUTOS[$i+1] . "=?, ";
            $externos[] = $array[$key];
        }
        $externos[] = $id_movimiento;
        $set = rtrim($set, ', ');
        // El orden de los parámetros importa
        $this->update_set_where($set, static::CONDICION, "", $externos);
    }

    public function borrar_por_id(string $id_movimiento) {
        $this->delete_from_where(static::CONDICION, [$id_movimiento]);
    }

    protected function executeAction($action): array|string {
        switch ($action) {
            case 'insertar_fila':
                $id_movimiento = $_POST['id_movimiento'] ?? null;
                $id_jugador = $_POST['id_jugador'] ?? null;
                $id_item = $_POST['id_item'] ?? null;
                $item_cant = $_POST['item_cant'] ?? null;
                $item_precio = $_POST['item_precio'] ?? null;
                $monto = $_POST['monto'] ?? null;
                try {
                    return json_encode(['success' => $this->insertar_fila($id_movimiento, $id_jugador, $id_item, $item_cant, $item_precio, $monto)]);
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
                $id_movimiento = $_POST['id_movimiento'] ?? null;
                $id_jugador = $_POST['id_jugador'] ?? null;
                $id_item = $_POST['id_item'] ?? null;
                $item_cant = $_POST['item_cant'] ?? null;
                $item_precio = $_POST['item_precio'] ?? null;
                $monto = $_POST['monto'] ?? null;
                try {
                    return json_encode(['success' => $this->actualizar_por_id($id_movimiento, $id_jugador, $id_item, $item_cant, $item_precio, $monto)]);
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
                $id_movimiento = $_POST['id_movimiento'] ?? null;
                try {
                    return json_encode(['success' => $this->borrar_por_id($id_movimiento)]);
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
                return parent::executeAction($action); // Llama al método de la clase base para acciones no específicas
        }
    }
}

//Gestor de AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $obj = new Jugadores_historiales_consultas();
    $obj->gestionarAjax();
}
?>