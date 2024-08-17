<?php
require_once "./MTabla_generica.php"; 
// Llamado por su respectivo controlador en el cliente

class MItems extends MTabla_generica {
    protected const TABLA = "Items";
    protected const ATRIBUTOS = ["ID","tipo","nombreprincipal","tier","nivel", "rarerza","cualidad"];

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
class ItemsConsultas extends MItems{
    // Para que insert_into funcione, con argumentos distintos a ...$valores
    public function insertar_fila
    (string $ID,
    string $tipo,
    string $nombreprincipal,
    string $tier,
    string $nivel,
    string $rarerza,
    string $cualidad){
        $this->insert_into($ID, $tipo, $nombreprincipal, $tier, $nivel, $rarerza, $cualidad);
    }
    public function actualizar_por_id
    (string $ID,
    string $tipo,
    string $nombreprincipal,
    string $tier,
    string $nivel,
    string $rarerza,
    string $cualidad){
        $atributos = [$ID, $tipo, $nombreprincipal, $tier, $nivel, $rarerza, $cualidad];
        $set = "";
        for ($i=1; $i <= count($atributos); $i++) { 
            $set = ($atributos[$i]!=0) ? self::ATRIBUTOS[$i]."=?" : "" ;
        }
        $condicion = self::ATRIBUTOS[0]."=?";
        //El orden de los parametros importa
        $this->update_set_where($set, $condicion, "", [$ID, $tipo, $nombreprincipal, $tier, $nivel, $rarerza, $cualidad]);
    }
    public function borrar_por_id(string $id){
        $condicion = self::ATRIBUTOS[0]."=?";
        $this->delete_from_where($condicion, [$id]);
    }
    protected function executeAction($action): array|string{
        switch ($action) {//Select_all es generico y está en Tabla_generica
            case 'insertar_fila':
                $ID = $_POST['ID'] ?? null;
                $tipo = $_POST['tipo'] ?? null;
                $nombreprincipal = $_POST['nombreprincipal'] ?? null;
                $tier = $_POST['tier'] ?? null;
                $nivel = $_POST['nivel'] ?? null;
                $rarerza = $_POST['rarerza'] ?? null;
                $cualidad = $_POST['cualidad'] ?? null;
                try {
                    return json_encode(
                        ['success' 
                        => $this->insertar_fila($ID, $tipo, $nombreprincipal, $tier, $nivel, $rarerza, $cualidad)]);
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
                $ID = $_POST['ID'] ?? null;
                $tipo = $_POST['tipo'] ?? null;
                $nombreprincipal = $_POST['nombreprincipal'] ?? null;
                $tier = $_POST['tier'] ?? null;
                $nivel = $_POST['nivel'] ?? null;
                $rarerza = $_POST['rarerza'] ?? null;
                $cualidad = $_POST['cualidad'] ?? null;
                try{
                    return ['success' 
                    => $this->actualizar_por_id($ID, $tipo, $nombreprincipal, $tier, $nivel, $rarerza, $cualidad)];
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
    $obj = new ImgConsultas();
    $obj->gestionarAjax();
}

?>
