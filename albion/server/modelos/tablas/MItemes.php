<?php
require_once "./MTabla_generica.php"; 

class MItemes extends MTabla_generica {
    protected const TABLA = "itemes";
    protected const ATRIBUTOS = ["ID", "tipo", "nombre_principal", "tier", "nivel", "rareza", "cualidad"];
    protected const CONDICION = self::ATRIBUTOS[0]."=?";
}
class Itemes_consultas extends MItemes{
    public function insertar_fila(
        string $id,
        string $tipo,
        string $nombre_principal,
        string $tier,
        string $nivel,
        string $rareza,
        string $cualidad){
        $this->insert_into($id, $tipo, $nombre_principal, $tier, $nivel, $rareza, $cualidad);
    }
    public function actualizar_por_id(
        string $id, 
        string $nuevo_tipo, 
        string $nuevo_nombre_principal, 
        string $nuevo_tier, 
        string $nuevo_nivel, 
        string $nuevo_rareza,
        string $nuevo_cualidad){
        $set = implode("=?,", array_slice(self::ATRIBUTOS, 1))."=?"; // tipo, nombre_principal, tier, nivel, rareza, cualidad
        $this->update_set_where($set, static::CONDICION, "", [$nuevo_tipo, $nuevo_nombre_principal, $nuevo_tier, $nuevo_nivel, $nuevo_rareza, $nuevo_cualidad, $id]);
    }
    public function borrar_por_id(string $id){
        $this->delete_from_where(static::CONDICION, [$id]);
    }
    protected function executeAction($action): array|string{
        switch ($action) {
            case 'insertar_fila':
                $id = $_POST['id'] ?? null;
                $tipo = $_POST['tipo'] ?? null;
                $nombre_principal = $_POST['nombre_principal'] ?? null;
                $tier = $_POST['tier'] ?? null;
                $nivel = $_POST['nivel'] ?? null;
                $rareza = $_POST['rareza'] ?? null;
                $cualidad = $_POST['cualidad'] ?? null;
                try {
                    return json_encode(['success' => $this->insertar_fila($id, $tipo, $nombre_principal, $tier, $nivel, $rareza, $cualidad)]);
                } catch (mysqli_sql_exception $e) {
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
                $nuevo_tipo = $_POST['nuevo_tipo'] ?? null;
                $nuevo_nombre_principal = $_POST['nuevo_nombre_principal'] ?? null;
                $nuevo_tier = $_POST['nuevo_tier'] ?? null;
                $nuevo_nivel = $_POST['nuevo_nivel'] ?? null;
                $nuevo_rareza = $_POST['nuevo_rareza'] ?? null;
                $nuevo_cualidad = $_POST['nuevo_cualidad'] ?? null;
                try {
                    return json_encode(['success' => $this->actualizar_por_id($id, $nuevo_tipo, $nuevo_nombre_principal, $nuevo_tier, $nuevo_nivel, $nuevo_rareza, $nuevo_cualidad)]);
                } catch (mysqli_sql_exception $e) {
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
    $obj = new Itemes_consultas();
    $obj->gestionarAjax();
}

?>
