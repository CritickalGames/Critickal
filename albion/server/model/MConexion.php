<?php
/**
 * Sólo es llamado por "tablas/MTabla_generica.php"
 */
class MConexion_Singleton extends Consultas
{
    private static ?MConexion_Singleton $instance = null;
    /**
     * TODO: $this->db_obj = MConexion_Singleton::getInstance(); en el cosntructor del modelo
     */
    private function __construct() {
        $this->_abrirConexion();
    }
    /**
     * TODO: $this->db_obj = MConexion_Singleton::getInstance(); en el cosntructor del modelo
     * @return MConexion_Singleton
     */
    public static function getInstance(): MConexion_Singleton {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    /**
     * Se usa únicamente, en el constructor.
     * @return void
     */
    private function _abrirConexion(): void {
        $server = 'localhost:3306';
        $usuario = 'root';
        $contraseña = '';
        $basededatos = 'albion_tabla';
        $this->_conexion_obj = new mysqli($server, $usuario, $contraseña, $basededatos);
        if ($this->_conexion_obj->connect_error) {
            die("Conexión fallida: " . $this->_conexion_obj->connect_error);
        }
    }

    public function cerrarConexion(): void {
        if ($this->_conexion_obj) {
            $this->_conexion_obj->close();
        }
    }
    /**
     * Da un string para el debug
     * @return string
     */
    public function debug_comprobar_conexion(): string {
        return ($this->_conexion_obj !== null) ? "true" : "false";
    }
    private function __clone() {}

    public function __wakeup() {
        self::getInstance();
    }
}

class Consultas{
    protected ?mysqli $_conexion_obj = null;
    public function enviarConsultaPreparada(string $sql, array $params = []) {
        if (!isset($this->_conexion_obj)) {
            die("La conexión no está inicializada.");
        }

        $stmt = $this->_conexion_obj->prepare($sql);
        if ($stmt === false) {
            die("Error al preparar la consulta: " . $this->_conexion_obj->error);
        }

        if ($params) {
            // Asocia los parámetros con el tipo de datos
            $types = str_repeat('s', count($params)); // 's' para string, cambia según el tipo de datos
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        return $stmt;
    }
    public function enviar_solicitud(string $sql, array $params = []){
        return $this->_get_json_decode($sql, $params);
    }

    private function _get_json_encode(string $sql): string {
        $json = $this->get_($sql);
        return json_encode($json);
    }
    private function _get_json_decode(string $sql, array $params = []): array {
        return $this->get_($sql, $params);
    }

    private function get_(string $sql, array $params = []): array {
        $result = $this->enviarConsultaPreparada($sql, $params);
        $result = $result->get_result();
        if (mysqli_num_rows($result) > 0) {
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            return [];
        }
    }
}
?>
