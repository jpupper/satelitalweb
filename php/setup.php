<?php
require_once 'dbconfig.php';
$conexion = getDBConnection();

// Crear la tabla noticias si no existe
$sql = "CREATE TABLE IF NOT EXISTS noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    titleBlack VARCHAR(255) NOT NULL,
    titleGreen VARCHAR(255),
    description TEXT NOT NULL,
    modalImage VARCHAR(255) NOT NULL,
    modalTextLeft TEXT NOT NULL,
    modalTextRight TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE
)";

if ($conexion->query($sql) === TRUE) {
    echo "<div style='background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>
            Tabla 'noticias' creada correctamente o ya existía.
          </div>";

    // Verificar si la columna language existe
    $result = $conexion->query("SHOW COLUMNS FROM noticias LIKE 'language'");
    if ($result->num_rows === 0) {
        // Agregar la columna language si no existe
        $alterSql = "ALTER TABLE noticias ADD COLUMN language ENUM('es', 'en') NOT NULL DEFAULT 'es'";
        if ($conexion->query($alterSql) === TRUE) {
            echo "<div style='background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>
                    Campo language agregado correctamente a la tabla noticias.
                  </div>";

            // Actualizar registros existentes a español por defecto
            $updateSql = "UPDATE noticias SET language = 'es' WHERE language IS NULL";
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
                El campo language ya existe en la tabla noticias.
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
            'image' => './assets/galeria/mineria.png',
            'category' => 'RSE',
            'titleBlack' => 'Mineria',
            'titleGreen' => '',
            'description' => 'La actividad minera en sigue en expansión con nuevos proyectos en exploración y producción. Ghm, en conjunto con el gobierno provincial, buscan impulsar inversiones y empleo local, priorizando el desarrollo sostenible. Comunidades cercanas siguen de cerca el impacto ambiental y económico de la industria.',
            'modalImage' => './assets/galeria/mineriapop.png',
            'modalTextLeft' => 'La actividad minera sigue en expansión con nuevos proyectos en exploración y producción. Ghm, en conjunto con el gobierno provincial, buscan impulsar inversiones y empleo local, priorizando el desarrollo sostenible.',
            'modalTextRight' => 'Comunidades cercanas siguen de cerca el impacto ambiental y económico de la industria .'
        ],
        [
            'image' => './assets/galeria/alfalfa.png',
            'category' => 'SOSTENIBILIDAD',
            'titleBlack' => 'Campo de',
            'titleGreen' => 'Alfalfa',
            'description' => 'En nuestra empresa, sostenemos un compromiso firme con la sustentabilidad y el cuidado del medio ambiente. Contamos con tres hectáreas principalmente dedicadas al cultivo de alfalfa, además de cultivar especies como orégano y tomillo. Aprovechamos la diversidad natural de nuestros terrenos para optimizar la producción agrícola, promoviendo un equilibrio sostenible que respete y preserve los ecosistemas locales.',
            'modalImage' => './assets/galeria/alfalfa.png',
            'modalTextLeft' => 'En nuestra empresa, sostenemos un compromiso firme con la sustentabilidad y el cuidado del medio ambiente. Contamos con tres hectáreas principalmente dedicadas al cultivo de alfalfa, además de cultivar especies como orégano y tomillo.',
            'modalTextRight' => 'Aprovechamos la diversidad natural de nuestros terrenos para optimizar la producción agrícola, promoviendo un equilibrio sostenible que respete y preserve los ecosistemas locales.'
        ]
    ];
    
    $success = true;
    foreach ($sample_data as $data) {
        $stmt = $conexion->prepare("INSERT INTO noticias (image, category, titleBlack, titleGreen, description, modalImage, modalTextLeft, modalTextRight) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssss", 
            $data['image'], 
            $data['category'], 
            $data['titleBlack'], 
            $data['titleGreen'], 
            $data['description'], 
            $data['modalImage'], 
            $data['modalTextLeft'], 
            $data['modalTextRight']
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
    <title>Configuración de Base de Datos</title>
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
        <h1>Configuración de Base de Datos</h1>
        
        <div class="card mb-4">
            <div class="card-header">
                Datos de ejemplo
            </div>
            <div class="card-body">
                <p>Si deseas insertar datos de ejemplo en la tabla de noticias, haz clic en el siguiente botón:</p>
                <form method="post">
                    <button type="submit" name="insert_sample" class="btn btn-primary">Insertar datos de ejemplo</button>
                </form>
            </div>
        </div>
        
        <div class="mt-4">
            <a href="admin.php" class="btn btn-success">Ir al panel de administración</a>
        </div>
    </div>
</body>
</html>';

$conexion->close();
?>

