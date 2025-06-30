<?php
// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME','ghmsatelital');


// Conexión a la base de datos
/*define('DB_HOST', 'localhost');
define('DB_USER', 'c1700065_ghm');
define('DB_PASS', 'LUpupe42su');
define('DB_NAME', 'c1700065_ghm');
*/
/*define('DB_HOST', 'localhost');
define('DB_USER', 'arsatelitalghm_ghm');
define('DB_PASS', 'vivajeyder2025+');
define('DB_NAME', 'arsatelitalghm_bd');
*/

// Función para obtener la conexión
function getDBConnection() {
    $conexion = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Verificar conexión
    if ($conexion->connect_error) {
        die("Conexión fallida: " . $conexion->connect_error);
    }
    
    return $conexion;
}
?>