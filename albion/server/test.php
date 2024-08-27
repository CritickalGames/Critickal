<?php
$ATRIBUTOS = ["itemID", "dir", "archivo", "formato"];

$dir = "dir";
$archivo = "";
$formato = "";

$itemID = "0";

$set = '';
$externos = array();
$array = [$dir, $archivo, $formato]; // eliminar elementos vacíos
$keys = array_keys($array); // obtener los índices del array original
foreach ($keys as $i => $key) {
    if ($array[$key] == "") {
        continue; // Sale del bucle completamente
    }
    $set .= $ATRIBUTOS[$i+1] . "=?, ";
    $externos[] = $array[$key];
    echo $set;
    echo "<br>";
}
$externos[] = $itemID;
$set = rtrim($set, ', ');
$condicion = $ATRIBUTOS[0]."=?";

echo $set;
echo "<br>";
echo $condicion;
echo "<br>";
var_dump($externos);