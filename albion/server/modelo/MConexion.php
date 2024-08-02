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
    /**
     * Se usa unicamente en el get_() y los terminados en _set()
     * @param string $sql
     * @return bool|mysqli_result
     */
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
    /**
     * !El set y la condición debe ser estructurado en los Modelos de las tablas
     * sql: insert into _ vales _
     * @param string $tabla
     * @param string $atr
     * @param string $valores
     * @return bool|mysqli_result
     */
    public function insert_into_set(string $tabla, string $atr, string $valores): bool|mysqli_result {
        return $this->_enviarConsulta("INSERT INTO $tabla($atr) VALUES($valores)");
    }
    /**
     * !El set y la condición debe ser estructurado en los Modelos de las tablas
     * sql: delete _ where _|1
     * @param string $tabla
     * @param string $condicion
     * @return bool|mysqli_result
     */
    public function delete_set(string $tabla, string $condicion="1"): bool|mysqli_result {
        return $this->_enviarConsulta("DELETE FROM $tabla WHERE $condicion");
    }
    /**
     * !El set y la condición debe ser estructurado en los Modelos de las tablas
     * sql: update _ set _ where _|1
     * @param string $tabla
     * @param string $set
     * @param string $condicion
     * @param string $update_tipo Opcional; Ejemplo de uso: INNER JOIN tba on tabla.tba_id = tba.id
     * @return bool|mysqli_result
     */
    public function update_set(string $tabla, string $set, string $condicion="1", string $update_tipo=""): bool|mysqli_result {
        return $this->_enviarConsulta("UPDATE $update_tipo $tabla SET $set WHERE $condicion");
    }
    /**
     * @param string $sql
     * @return string devuelve un json
     */
    private function _get_json_encode(string $sql): string {
        $json = $this->get_($sql);
        return json_encode($json);
    }
    /**
     * Usado para conseguir consultas de la base de datos.
     * @param string $sql
     * @return array
     */
    private function _get_json_decode(string $sql): array {
        return $this->get_($sql);
    }

    private function get_(string $sql): array {
        $result = $this->_enviarConsulta($sql);
        if (mysqli_num_rows($result) > 0) {
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            return [];
        }
    }
    /**
     * sql: select _ from _ where _|1
     * @param string $tabla
     * @param string $atr
     * @param string $condicion
     * @return string|array
     */
    public function select(string $tabla, string $atr="*", string $condicion="1"){
        return $this->_get_json_decode("SELECT $atr FROM $tabla WHERE $condicion");
    }
    private function __clone() {}

    public function __wakeup() {
        self::getInstance();
    }
}
?>
