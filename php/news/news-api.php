<?php
require_once '../dbconfig.php';
$conexion = getDBConnection();

// Establecer cabeceras para JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Obtener noticias activas
$sql = "SELECT * FROM noticias WHERE active = 1 ORDER BY date DESC";
$resultado = $conexion->query($sql);

$noticias = [];

if ($resultado->num_rows > 0) {
    while($fila = $resultado->fetch_assoc()) {
        // Formatear la fecha para mostrarla en el formato deseado
        $fecha = new DateTime($fila['date']);
        $fila['formattedDate'] = $fecha->format('d/m/Y');
        
        $noticias[] = $fila;
    }
}

// Devolver las noticias en formato JSON
echo json_encode($noticias);

$conexion->close();
?>

