<?php
require_once '../dbconfig.php';
$conexion = getDBConnection();

// Crear tabla de proyectos RSE si no existe
$sql = "CREATE TABLE IF NOT EXISTS rse_projects (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    popupImage VARCHAR(255) NOT NULL,
    active TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

if ($conexion->query($sql) === TRUE) {
    echo "<div style='background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>
            Tabla 'rse_projects' creada correctamente o ya existía.
          </div>";
    
    // Verificar si la columna language existe
    $result = $conexion->query("SHOW COLUMNS FROM rse_projects LIKE 'language'");
    if ($result->num_rows === 0) {
        // Agregar la columna language si no existe
        $alterSql = "ALTER TABLE rse_projects ADD COLUMN language ENUM('es', 'en') NOT NULL DEFAULT 'es'";
        if ($conexion->query($alterSql) === TRUE) {
            echo "<div style='background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>
                    Campo language agregado correctamente a la tabla rse_projects.
                  </div>";
            
            // Actualizar registros existentes a español por defecto
            $updateSql = "UPDATE rse_projects SET language = 'es' WHERE language IS NULL";
            if ($conexion->query($updateSql) === TRUE) {
                echo "<div style='background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>
                        Registros existentes actualizados con idioma español por defecto.
                      </div>";
            } else {
                echo "<div style='background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>
                        Error al actualizar registros existentes: " . $conexion->error . "
                      </div>";
            }
        } else {
            echo "<div style='background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>
                    Error al agregar el campo language: " . $conexion->error . "
                  </div>";
        }
    } else {
        echo "<div style='background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>
                El campo language ya existe en la tabla rse_projects.
              </div>";
    }
} else {
    echo "<div style='background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>
            Error al crear la tabla: " . $conexion->error . "
          </div>";
}

// Verificar si hay datos de ejemplo para insertar
if (isset($_POST['insert_sample'])) {
    // Insertar datos de ejemplo
    $sample_data = [
        [
            'image' => './assets/rse/campo-alfalfa.jpg',
            'title' => 'Campo de alfalfa',
            'popupImage' => './assets/rse/campo-alfalfa-popup.jpg'
        ],
        [
            'image' => './assets/rse/quesos-ylla.jpg',
            'title' => 'Quesos Ylla',
            'popupImage' => './assets/rse/quesos-ylla-popup.jpg'
        ],
        [
            'image' => './assets/rse/laguna-blanca.jpg',
            'title' => 'Laguna Blanca',
            'popupImage' => './assets/rse/laguna-blanca-popup.jpg'
        ]
    ];
    
    $success = true;
    foreach ($sample_data as $data) {
        $stmt = $conexion->prepare("INSERT INTO rse_projects (image, title, popupImage) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", 
            $data['image'], 
            $data['title'], 
            $data['popupImage']
        );
        
        if (!$stmt->execute()) {
            $success = false;
            echo "<div style='background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>
                    Error al insertar datos de ejemplo: " . $stmt->error . "
                  </div>";
            break;
        }
        $stmt->close();
    }
    
    if ($success) {
        echo "<div style='background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>
                Datos de ejemplo insertados correctamente.
              </div>";
    }
}

// Formulario para insertar datos de ejemplo
echo '<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuración de Base de Datos RSE</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 800px;
        }
        h1 {
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Configuración de Base de Datos RSE</h1>
        
        <div class="card mb-4">
            <div class="card-header">
                Datos de ejemplo
            </div>
            <div class="card-body">
                <p>Si deseas insertar datos de ejemplo en la tabla de proyectos RSE, haz clic en el siguiente botón:</p>
                <form method="post">
                    <button type="submit" name="insert_sample" class="btn btn-primary">Insertar datos de ejemplo</button>
                </form>
            </div>
        </div>
        
        <div class="mt-4">
            <a href="rse-admin.php" class="btn btn-success">Ir al panel de administración RSE</a>
            <a href="admin.php" class="btn btn-secondary">Ir al panel de administración principal</a>
        </div>
    </div>
</body>
</html>';

$conexion->close();
?>

