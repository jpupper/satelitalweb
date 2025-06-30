<?php
require_once '../dbconfig.php';
$conexion = getDBConnection();

// Establecer cabeceras para JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Obtener proyectos RSE activos
$sql = "SELECT * FROM rse_projects WHERE active = 1 ORDER BY id DESC";
$resultado = $conexion->query($sql);

$proyectos = [];

if ($resultado->num_rows > 0) {
    while($fila = $resultado->fetch_assoc()) {
        $proyectos[] = $fila;
    }
}

// Devolver los proyectos en formato JSON
echo json_encode($proyectos);

$conexion->close();
?>

