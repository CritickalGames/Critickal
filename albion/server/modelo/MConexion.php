<?php
class MConexion_Singleton
{
    private static ?MConexion_Singleton $instance = null;
    private ?mysqli $_conexion_obj = null;

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

    public function comprobar_conexion(): string {
        return ($this->_conexion_obj !== null) ? "true" : "false";
    }

    private function _enviarConsulta(string $sql) {
        if (!isset($this->_conexion_obj)) {
            die("La conexión no está inicializada.");
        }
        $result = mysqli_query($this->_conexion_obj, $sql);
        if ($result === false) {
            die("Error en la consulta: " . mysqli_error($this->_conexion_obj));
        }
        return $result;
    }

    public function set(string $tabla, string $atr, string $valores): bool {
        return $this->_enviarConsulta("INSERT INTO $tabla($atr) VALUES($valores)") !== false;
    }

    public function delete(string $tabla, string $condicion): bool {
        return $this->_enviarConsulta("DELETE FROM $tabla WHERE $condicion") !== false;
    }

    public function get_json_encode(string $sql): string {
        $json = $this->get($sql);
        return json_encode($json);
    }

    public function get_json_decode(string $sql): array {
        return $this->get($sql);
    }

    private function get(string $sql): array {
        $result = $this->_enviarConsulta($sql);
        if (mysqli_num_rows($result) > 0) {
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            return [];
        }
    }

    private function __clone() {}

    public function __wakeup() {
        self::getInstance();
    }
}
?>
