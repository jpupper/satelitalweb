<?php
require_once 'dbconfig.php';
$conexion = getDBConnection();

// Borrar tablas existentes
$sqlDropGaleria = "DROP TABLE IF EXISTS galeria";
$sqlDropNoticias = "DROP TABLE IF EXISTS noticias";

if ($conexion->query($sqlDropGaleria) === TRUE) {
    echo "<div style='color: green; margin: 10px 0;'>✓ Tabla galeria borrada exitosamente.</div>";
} else {
    echo "<div style='color: red; margin: 10px 0;'>✗ Error borrando tabla galeria: " . $conexion->error . "</div>";
}

if ($conexion->query($sqlDropNoticias) === TRUE) {
    echo "<div style='color: green; margin: 10px 0;'>✓ Tabla noticias borrada exitosamente.</div>";
} else {
    echo "<div style='color: red; margin: 10px 0;'>✗ Error borrando tabla noticias: " . $conexion->error . "</div>";
}

// Crear la base de datos si no existe
$sql = "CREATE DATABASE IF NOT EXISTS " . DB_NAME;
if ($conexion->query($sql) === TRUE) {
    echo "Base de datos creada exitosamente o ya existente.<br>";
} else {
    die("Error creando base de datos: " . $conexion->error);
}

// Seleccionar la base de datos
$conexion->select_db(DB_NAME);

// Crear tabla galeria con los dos campos de párrafos y el nuevo campo para la imagen del popup
$sqlGaleria = "CREATE TABLE IF NOT EXISTS galeria (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    rutadeImagen VARCHAR(255) NOT NULL,
    rutaImagenPopup VARCHAR(255) DEFAULT NULL,
    titulo VARCHAR(255) NOT NULL,
    subtitulo VARCHAR(255) NOT NULL,
    parrafo_izquierdo TEXT NOT NULL,
    parrafo_derecho TEXT NOT NULL
)";

if ($conexion->query($sqlGaleria) === TRUE) {
    echo "Tabla galeria creada exitosamente.<br>";
} else {
    echo "Error creando tabla galeria: " . $conexion->error . "<br>";
}

// Verificar si la columna rutaImagenPopup existe, si no, agregarla
$checkColumn = $conexion->query("SHOW COLUMNS FROM galeria LIKE 'rutaImagenPopup'");
if ($checkColumn->num_rows == 0) {
    $alterTable = "ALTER TABLE galeria ADD COLUMN rutaImagenPopup VARCHAR(255) DEFAULT NULL";
    if ($conexion->query($alterTable) === TRUE) {
        echo "Columna rutaImagenPopup agregada exitosamente.<br>";
    } else {
        echo "Error agregando columna rutaImagenPopup: " . $conexion->error . "<br>";
    }
}

// Crear tabla noticias
$sqlNoticias = "CREATE TABLE IF NOT EXISTS noticias (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    texto1 TEXT NOT NULL,
    tituloblanco TEXT NOT NULL,
    tituloverde TEXT NOT NULL,
    parrafo TEXT NOT NULL,
    rutadeimagen VARCHAR(255) NOT NULL
)";

if ($conexion->query($sqlNoticias) === TRUE) {
    echo "Tabla noticias creada exitosamente.<br>";
} else {
    echo "Error creando tabla noticias: " . $conexion->error . "<br>";
}

// Crear directorio de uploads si no existe
if (!file_exists('uploads')) {
    if (mkdir('uploads', 0777, true)) {
        echo "Directorio de uploads creado exitosamente.<br>";
    } else {
        echo "Error al crear el directorio de uploads. Por favor, créalo manualmente.<br>";
    }
}

$conexion->close();

echo "<br>Proceso de configuración completado. Ahora puedes acceder al <a href='admin.php'>panel de administración</a>.";
?>

