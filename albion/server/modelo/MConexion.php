<?php

class MConexion
{
    private $conexion;
    private function abrirConexion() {
        $server = 'localhost:3306';
        $usuario = 'root';
        $contraseña = '';
        $basededatos = 'albion_tabla';
        $this->conexion = new mysqli($server, $usuario, $contraseña, $basededatos);
        if ($this->conexion->connect_error) {
            die("Conexion fallida: " . $this->conexion->connect_error);
        }
        return $this->conexion;
    }
    private function cerrarConexion() {
        $this->conexion->close();
    }
    private function enviarConsulta(string $sql){
        $conexion = $this->abrirConexion();
        $result=mysqli_query($conexion,$sql);
        $this->cerrarConexion();
        return $result;
    }
    private function get(string $sql){
        $result=$this->enviarConsulta($sql);
        if(mysqli_num_rows($result)>0){
            $row= $result -> fetch_all(MYSQLI_ASSOC);
            return $row;
        }else{
            return $row=[mysqli_num_rows($result)];
        }
    }

    public function delete(string $tabla, string $condicion){
        return $this->enviarConsulta("DELETE FROM $tabla WHERE $condicion");
    }

    public function get_json_encode(string $sql){
        $json = $this->get($sql);
        return (json_encode($json));
    }
    public function get_json_decode(string $sql){
        $json = $this->get($sql);
        return $json;
    }

    public function set(string $tabla, string $atr, string $valores){
        return $this->enviarConsulta("INSERT INTO $tabla($atr) VALUES($valores)");
    }
    
}

$conexionBD = new MConexion();

?>