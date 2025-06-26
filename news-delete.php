<?php
require_once 'dbconfig.php';
$conexion = getDBConnection();

// Verificar si se proporcionó un ID
if (!isset($_GET['id']) || empty($_GET['id'])) {
    header("Location: admin.php");
    exit;
}

$id = intval($_GET['id']);

// Obtener información de la noticia para posiblemente eliminar archivos
$stmt = $conexion->prepare("SELECT image, modalImage FROM noticias WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    // Eliminar la noticia de la base de datos
    $stmt = $conexion->prepare("DELETE FROM noticias WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        // Redireccionar al panel de administración con mensaje de éxito
        header("Location: admin.php?success=delete");
        exit;
    } else {
        // Error al eliminar
        header("Location: admin.php?error=delete");
        exit;
    }
} else {
    // La noticia no existe
    header("Location: admin.php");
    exit;
}

$stmt->close();
$conexion->close();
?>

