<?php
require_once "./MZona_tablaBase.php"; 
// Llamado por su respectivo controlador en el cliente

class MAcciones extends MZona_tablaBase {
    protected const TABLA = "acciones";
    protected const ATRIBUTOS = ["simbolo", "precio", "dividendo", "tipo", "meses_de_pago", "rendimiento", "inversion", "ganancia"];
    protected const CONDICION = self::ATRIBUTOS[0]."=?";

}
class Acciones_consultas extends MAcciones {
    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insertar_fila(string $simbolo, string $precio, string $dividendo, string $tipo, string $meses_de_pago, string $rendimiento, string $inversion, string $ganancia) {
        $this->insert_into($simbolo, $precio, $dividendo, $tipo, $meses_de_pago, $rendimiento, $inversion, $ganancia);
    }

    public function actualizar_por_id(string $simbolo, string $precio, string $dividendo, string $tipo, string $meses_de_pago, string $rendimiento, string $inversion, string $ganancia) {
        $set = self::ATRIBUTOS[1]."=?, ".self::ATRIBUTOS[2]."=?, "
            .self::ATRIBUTOS[3]."=?, ".self::ATRIBUTOS[4]."=?, "
            .self::ATRIBUTOS[5]."=?, ".self::ATRIBUTOS[6]."=?, "
            .self::ATRIBUTOS[7] . "=?";
        return $this->update_set_where($set, static::CONDICION, "", [
        $precio, $dividendo, $tipo, $meses_de_pago, $rendimiento, $inversion, $ganancia, $simbolo]);
    }

    public function borrar_por_id(string $id) {
        $this->delete_from_where(static::CONDICION, [$id]);
        return static::CONDICION;
    }

    protected function executeAction($action): array|string {
        switch ($action) {
            case 'insertar_fila':
                $simbolo = $_POST['simbolo'] ?? "null";
                $precio = $_POST['precio'] ?? "null";
                $dividendo = $_POST['dividendo'] ?? "null";
                $tipo = $_POST['tipo'] ?? "null";
                $meses_de_pago = $_POST['meses_de_pago'] ?? "null";
                $rendimiento = $_POST['rendimiento'] ?? "null";
                $inversion = $_POST['inversion'] ?? "null";
                $ganancia = $_POST['ganancia'] ?? "null";
                try {
                    return ['success' => $this->insertar_fila($simbolo, $precio, $dividendo, $tipo, $meses_de_pago, $rendimiento, $inversion, $ganancia)];
                } catch (mysqli_sql_exception $e) {
                    // Captura el error y envíalo en formato JSON
                    return $this->error($e);
                }
            case 'actualizar_por_id':
                $simbolo = $_POST['simbolo'] ?? "null";
                $precio = $_POST['precio'] ?? "null";
                $dividendo = $_POST['dividendo'] ?? "null";
                $tipo = $_POST['tipo'] ?? "null";
                $meses_de_pago = $_POST['meses_de_pago'] ?? "null";
                $rendimiento = $_POST['rendimiento'] ?? "null";
                $inversion = $_POST['inversion'] ?? "null";
                $ganancia = $_POST['ganancia'] ?? "null";
                try {
                    return ['success' => $this->actualizar_por_id($simbolo, $precio, $dividendo, $tipo, $meses_de_pago, $rendimiento, $inversion, $ganancia)];
                } catch (mysqli_sql_exception $e) {
                    // Captura el error y envíalo en formato JSON
                    return $this->error($e);
                }
            case 'borrar_por_id':
                $id = $_POST['id'] ?? "null";
                try {
                    return ['success' => $this->borrar_por_id($id)];
                } catch (mysqli_sql_exception $e) {
                    // Captura el error y envíalo en formato JSON
                    return $this->error($e);
                }
            default:
                return parent::executeAction($action); // Llama al método de la clase base para acciones no específicas
        }
    }
}
//Gestor de AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $obj = new Acciones_consultas();
    $obj->gestionarAjax();
}
$_POST['ganancia'] = 70;
$_POST['simbolo'] = "a";
$obj = new Acciones_consultas();
//$obj->gestionarAjax("actualizar_por_id");
?>
