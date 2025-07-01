<?php
require_once '../dbconfig.php';
$conexion = getDBConnection();

// Establecer cabeceras para JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Obtener el idioma de la consulta, por defecto español
$language = isset($_GET['lang']) ? $_GET['lang'] : 'es';

// Obtener proyectos RSE activos del idioma especificado
$sql = "SELECT * FROM rse_projects WHERE active = 1 AND language = ? ORDER BY id DESC";
$stmt = $conexion->prepare($sql);
$stmt->bind_param('s', $language);
$stmt->execute();
$resultado = $stmt->get_result();

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

