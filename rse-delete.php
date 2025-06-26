<?php
require_once 'dbconfig.php';
$conexion = getDBConnection();

// Verificar si se proporcionó un ID
if (!isset($_GET['id']) || empty($_GET['id'])) {
    header("Location: rse-admin.php");
    exit;
}

$id = intval($_GET['id']);

// Obtener información del proyecto para posiblemente eliminar archivos
$stmt = $conexion->prepare("SELECT image, popupImage FROM rse_projects WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    // Eliminar el proyecto de la base de datos
    $stmt = $conexion->prepare("DELETE FROM rse_projects WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        // Redireccionar al panel de administración con mensaje de éxito
        header("Location: rse-admin.php?success=delete");
        exit;
    } else {
        // Error al eliminar
        header("Location: rse-admin.php?error=delete");
        exit;
    }
} else {
    // El proyecto no existe
    header("Location: rse-admin.php");
    exit;
}

$stmt->close();
$conexion->close();
?>

