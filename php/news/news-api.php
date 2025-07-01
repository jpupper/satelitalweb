<?php
require_once '../dbconfig.php';
$conexion = getDBConnection();

// Establecer cabeceras para JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Obtener el idioma de la consulta, por defecto español
$language = isset($_GET['lang']) ? $_GET['lang'] : 'es';

// Obtener noticias activas del idioma especificado
$sql = "SELECT * FROM noticias WHERE active = 1 AND language = ? ORDER BY date DESC";
$stmt = $conexion->prepare($sql);
$stmt->bind_param('s', $language);
$stmt->execute();
$resultado = $stmt->get_result();

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

