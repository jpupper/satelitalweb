<?php
require_once 'dbconfig.php';
$conexion = getDBConnection();

// Verificar conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Función para sanitizar inputs
function sanitizeInput($data) {
    global $conexion;
    return $conexion->real_escape_string(htmlspecialchars(trim($data)));
}

// Verificar si las columnas existen y crearlas si no
$check_columns = $conexion->query("SHOW COLUMNS FROM galeria LIKE 'parrafo_izquierdo'");
if ($check_columns->num_rows == 0) {
    // Las columnas no existen, ejecutar ALTER TABLE
    $alter_table = "ALTER TABLE galeria 
                    ADD COLUMN parrafo_izquierdo TEXT NOT NULL DEFAULT '',
                    ADD COLUMN parrafo_derecho TEXT NOT NULL DEFAULT ''";
    
    if (!$conexion->query($alter_table)) {
        echo "<div style='background-color: #f8d7da; color: #721c24; padding: 10px; margin: 10px 0; border: 1px solid #f5c6cb; border-radius: 4px;'>
            Error al modificar la tabla: " . $conexion->error . "
        </div>";
    } else {
        echo "<div style='background-color: #d4edda; color: #155724; padding: 10px; margin: 10px 0; border: 1px solid #c3e6cb; border-radius: 4px;'>
            Tabla actualizada correctamente con nuevas columnas.
        </div>";
    }
}

// Verificar si la columna rutaImagenPopup existe y crearla si no
$check_popup_column = $conexion->query("SHOW COLUMNS FROM galeria LIKE 'rutaImagenPopup'");
if ($check_popup_column->num_rows == 0) {
    $alter_table = "ALTER TABLE galeria ADD COLUMN rutaImagenPopup VARCHAR(255) DEFAULT NULL";
    
    if (!$conexion->query($alter_table)) {
        echo "<div style='background-color: #f8d7da; color: #721c24; padding: 10px; margin: 10px 0; border: 1px solid #f5c6cb; border-radius: 4px;'>
            Error al agregar columna rutaImagenPopup: " . $conexion->error . "
        </div>";
    } else {
        echo "<div style='background-color: #d4edda; color: #155724; padding: 10px; margin: 10px 0; border: 1px solid #c3e6cb; border-radius: 4px;'>
            Columna rutaImagenPopup agregada correctamente.
        </div>";
    }
}

// Manejo de la carga de imágenes para la galería
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit_galeria'])) {
    $titulo_primera = sanitizeInput($_POST['titulo_primera']);
    $titulo_segunda = sanitizeInput($_POST['titulo_segunda']);
    $titulo = $titulo_primera . '|' . $titulo_segunda;
    $subtitulo = sanitizeInput($_POST['subtitulo']);
    $parrafo_izquierdo = nl2br(sanitizeInput($_POST['parrafo_izquierdo']));
    $parrafo_derecho = nl2br(sanitizeInput($_POST['parrafo_derecho']));
    
    $rutaImagen = '';
    $rutaImagenPopup = '';
    
    // Procesar la imagen principal
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $info = getimagesize($_FILES['imagen']['tmp_name']);
        if ($info !== false) {
            $extension = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);
            $nombreArchivo = uniqid('galeria_') . '.' . $extension;
            $rutaImagen = 'uploads/' . $nombreArchivo;
            
            // Asegurarse de que el directorio uploads existe
            if (!file_exists('uploads')) {
                mkdir('uploads', 0777, true);
            }
            
            if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaImagen)) {
                header("Location: " . $_SERVER['PHP_SELF'] . "?error=Error al mover el archivo principal subido");
                exit();
            }
        } else {
            header("Location: " . $_SERVER['PHP_SELF'] . "?error=El archivo principal no es una imagen válida");
            exit();
        }
    } else {
        header("Location: " . $_SERVER['PHP_SELF'] . "?error=Error al subir la imagen principal: " . $_FILES['imagen']['error']);
        exit();
    }
    
    // Procesar la imagen del popup (opcional)
    if (isset($_FILES['imagen_popup']) && $_FILES['imagen_popup']['error'] === UPLOAD_ERR_OK) {
        $info = getimagesize($_FILES['imagen_popup']['tmp_name']);
        if ($info !== false) {
            $extension = pathinfo($_FILES['imagen_popup']['name'], PATHINFO_EXTENSION);
            $nombreArchivo = uniqid('popup_') . '.' . $extension;
            $rutaImagenPopup = 'uploads/' . $nombreArchivo;
            
            if (!move_uploaded_file($_FILES['imagen_popup']['tmp_name'], $rutaImagenPopup)) {
                // Si falla la carga de la imagen del popup, usamos la principal
                $rutaImagenPopup = $rutaImagen;
            }
        } else {
            // Si el archivo no es una imagen válida, usamos la principal
            $rutaImagenPopup = $rutaImagen;
        }
    } else {
        // Si no se subió imagen para el popup, usamos la principal
        $rutaImagenPopup = $rutaImagen;
    }
    
    // Insertar en la base de datos
    $sql = "INSERT INTO galeria (rutadeImagen, rutaImagenPopup, titulo, subtitulo, parrafo_izquierdo, parrafo_derecho) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($sql);
    
    if ($stmt === false) {
        die("Error en la preparación de la consulta: " . $conexion->error);
    }
    
    $stmt->bind_param("ssssss", $rutaImagen, $rutaImagenPopup, $titulo, $subtitulo, $parrafo_izquierdo, $parrafo_derecho);
    
    if ($stmt->execute()) {
        header("Location: " . $_SERVER['PHP_SELF'] . "?mensaje=Imagen agregada exitosamente a la galería");
        exit();
    } else {
        header("Location: " . $_SERVER['PHP_SELF'] . "?error=Error al insertar en la base de datos: " . $stmt->error);
        exit();
    }
}

// Manejo de la carga de noticias
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit_noticia'])) {
    $categoria = sanitizeInput($_POST['texto1']);
    $tituloblanco = sanitizeInput($_POST['tituloblanco']);
    $tituloverde = sanitizeInput($_POST['tituloverde']);
    // Modificado para preservar saltos de línea en el párrafo
    $parrafo = nl2br(sanitizeInput($_POST['parrafo']));
    
    if (isset($_FILES['imagen_noticia']) && $_FILES['imagen_noticia']['error'] === UPLOAD_ERR_OK) {
        $info = getimagesize($_FILES['imagen_noticia']['tmp_name']);
        if ($info !== false) {
            $extension = pathinfo($_FILES['imagen_noticia']['name'], PATHINFO_EXTENSION);
            $nombreArchivo = uniqid('noticia_') . '.' . $extension;
            $rutaImagen = 'uploads/' . $nombreArchivo;
            
            // Asegurarse de que el directorio uploads existe
            if (!file_exists('uploads')) {
                mkdir('uploads', 0777, true);
            }
            
            if (move_uploaded_file($_FILES['imagen_noticia']['tmp_name'], $rutaImagen)) {
                $sql = "INSERT INTO noticias (texto1, tituloblanco, tituloverde, parrafo, rutadeimagen) 
                        VALUES (?, ?, ?, ?, ?)";
                $stmt = $conexion->prepare($sql);
                
                if ($stmt === false) {
                    die("Error en la preparación de la consulta: " . $conexion->error);
                }
                
                $stmt->bind_param("sssss", $categoria, $tituloblanco, $tituloverde, $parrafo, $rutaImagen);
                
                if ($stmt->execute()) {
                    header("Location: " . $_SERVER['PHP_SELF'] . "?mensaje=Noticia agregada exitosamente");
                    exit();
                } else {
                    header("Location: " . $_SERVER['PHP_SELF'] . "?error=Error al insertar la noticia: " . $stmt->error);
                    exit();
                }
            } else {
                header("Location: " . $_SERVER['PHP_SELF'] . "?error=Error al mover el archivo subido");
                exit();
            }
        } else {
            header("Location: " . $_SERVER['PHP_SELF'] . "?error=El archivo no es una imagen válida");
            exit();
        }
    } else {
        header("Location: " . $_SERVER['PHP_SELF'] . "?error=Error al subir la imagen: " . $_FILES['imagen_noticia']['error']);
        exit();
    }
}

// Manejo de eliminación de registros de galería
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_galeria'])) {
    $id = (int)$_POST['id'];
    $ruta = sanitizeInput($_POST['ruta']);
    $rutaPopup = sanitizeInput($_POST['ruta_popup']);
    
    $sql = "DELETE FROM galeria WHERE id = ?";
    $stmt = $conexion->prepare($sql);
    
    if ($stmt === false) {
        die("Error en la preparación de la consulta: " . $conexion->error);
    }
    
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        if (file_exists($ruta)) {
            unlink($ruta);
        }
        if ($rutaPopup && $rutaPopup !== $ruta && file_exists($rutaPopup)) {
            unlink($rutaPopup);
        }
        header("Location: " . $_SERVER['PHP_SELF'] . "?mensaje=Registro de galería eliminado exitosamente");
    } else {
        header("Location: " . $_SERVER['PHP_SELF'] . "?error=Error al eliminar registro de galería: " . $stmt->error);
    }
    exit();
}

// Manejo de eliminación de noticias
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_noticia'])) {
    $id = (int)$_POST['id'];
    $ruta = sanitizeInput($_POST['ruta']);
    
    $sql = "DELETE FROM noticias WHERE id = ?";
    $stmt = $conexion->prepare($sql);
    
    if ($stmt === false) {
        die("Error en la preparación de la consulta: " . $conexion->error);
    }
    
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        if (file_exists($ruta)) {
            unlink($ruta);
        }
        header("Location: " . $_SERVER['PHP_SELF'] . "?mensaje=Noticia eliminada exitosamente");
    } else {
        header("Location: " . $_SERVER['PHP_SELF'] . "?error=Error al eliminar noticia: " . $stmt->error);
    }
    exit();
}

// Endpoint para obtener elementos de la galería
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get_gallery') {
    header('Content-Type: application/json');
    
    // Verificar si las columnas existen
    $check_columns = $conexion->query("SHOW COLUMNS FROM galeria LIKE 'parrafo_izquierdo'");
    $check_popup_column = $conexion->query("SHOW COLUMNS FROM galeria LIKE 'rutaImagenPopup'");
    
    if ($check_columns->num_rows == 0) {
        // Las columnas de párrafos no existen
        if ($check_popup_column->num_rows == 0) {
            // Tampoco existe la columna de imagen popup
            $sql = "SELECT id, rutadeImagen, titulo, subtitulo, '' as parrafo_izquierdo, '' as parrafo_derecho, rutadeImagen as rutaImagenPopup FROM galeria";
        } else {
            // Existe la columna de imagen popup pero no las de párrafos
            $sql = "SELECT id, rutadeImagen, titulo, subtitulo, '' as parrafo_izquierdo, '' as parrafo_derecho, rutaImagenPopup FROM galeria";
        }
    } else {
        // Las columnas de párrafos existen
        if ($check_popup_column->num_rows == 0) {
            // No existe la columna de imagen popup
            $sql = "SELECT id, rutadeImagen, titulo, subtitulo, parrafo_izquierdo, parrafo_derecho, rutadeImagen as rutaImagenPopup FROM galeria";
        } else {
            // Existen todas las columnas
            $sql = "SELECT id, rutadeImagen, titulo, subtitulo, parrafo_izquierdo, parrafo_derecho, rutaImagenPopup FROM galeria";
        }
    }
    
    $result = $conexion->query($sql);
    
    $items = [];
    while ($row = $result->fetch_assoc()) {
        // Si rutaImagenPopup es NULL o vacía, usar rutadeImagen
        if (empty($row['rutaImagenPopup'])) {
            $row['rutaImagenPopup'] = $row['rutadeImagen'];
        }
        $items[] = $row;
    }
    
    echo json_encode($items);
    exit;
}

// Endpoint para obtener noticias
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get_news') {
    header('Content-Type: application/json');
    $sql = "SELECT id, texto1, tituloblanco, tituloverde, parrafo, rutadeimagen FROM noticias";
    $result = $conexion->query($sql);
    
    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    
    echo json_encode($items);
    exit;
}

// Consultas para la vista
$check_columns = $conexion->query("SHOW COLUMNS FROM galeria LIKE 'parrafo_izquierdo'");
$check_popup_column = $conexion->query("SHOW COLUMNS FROM galeria LIKE 'rutaImagenPopup'");

if ($check_columns->num_rows == 0) {
    if ($check_popup_column->num_rows == 0) {
        $sql_galeria = "SELECT id, rutadeImagen, titulo, subtitulo, '' as parrafo_izquierdo, '' as parrafo_derecho, rutadeImagen as rutaImagenPopup FROM galeria";
    } else {
        $sql_galeria = "SELECT id, rutadeImagen, titulo, subtitulo, '' as parrafo_izquierdo, '' as parrafo_derecho, rutaImagenPopup FROM galeria";
    }
} else {
    if ($check_popup_column->num_rows == 0) {
        $sql_galeria = "SELECT id, rutadeImagen, titulo, subtitulo, parrafo_izquierdo, parrafo_derecho, rutadeImagen as rutaImagenPopup FROM galeria";
    } else {
        $sql_galeria = "SELECT id, rutadeImagen, titulo, subtitulo, parrafo_izquierdo, parrafo_derecho, rutaImagenPopup FROM galeria";
    }
}

$result_galeria = $conexion->query($sql_galeria);

$sql_noticias = "SELECT id, texto1, tituloblanco, tituloverde, parrafo, rutadeimagen FROM noticias";
$result_noticias = $conexion->query($sql_noticias);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administrador</title>
    <link rel="stylesheet" href="css/admin.css">
</head>
<body>
    <div class="container">
        <h1>Panel de Administrador</h1>

        <?php if (isset($_GET['mensaje'])): ?>
            <div class="mensaje exito"><?php echo htmlspecialchars($_GET['mensaje']); ?></div>
        <?php endif; ?>
        
        <?php if (isset($_GET['error'])): ?>
            <div class="mensaje error"><?php echo htmlspecialchars($_GET['error']); ?></div>
        <?php endif; ?>

        <h2>Agregar a la Galería</h2>
        <form method="POST" enctype="multipart/form-data">
            <div class="form-group">
                <label for="titulo_primera">Primera línea del título</label>
                <input type="text" name="titulo_primera" id="titulo_primera" placeholder="Primera línea del título" required>
            </div>
            <div class="form-group">
                <label for="titulo_segunda">Segunda línea del título</label>
                <input type="text" name="titulo_segunda" id="titulo_segunda" placeholder="Segunda línea del título" required>
            </div>
            <div class="form-group">
                <label for="subtitulo">Subtítulo</label>
                <input type="text" name="subtitulo" id="subtitulo" placeholder="Subtítulo de la imagen" required>
            </div>
            <div class="form-group">
                <label for="parrafo_izquierdo">Párrafo Izquierdo</label>
                <textarea 
                    name="parrafo_izquierdo" 
                    id="parrafo_izquierdo" 
                    placeholder="Párrafo que aparecerá en el lado izquierdo del popup" 
                    rows="4" 
                    required
                    style="white-space: pre-wrap;"
                ></textarea>
            </div>
            <div class="form-group">
                <label for="parrafo_derecho">Párrafo Derecho</label>
                <textarea 
                    name="parrafo_derecho" 
                    id="parrafo_derecho" 
                    placeholder="Párrafo que aparecerá en el lado derecho del popup" 
                    rows="4" 
                    required
                    style="white-space: pre-wrap;"
                ></textarea>
            </div>
            <div class="form-group">
                <label for="imagen">Imagen Principal (para la galería)</label>
                <input type="file" name="imagen" id="imagen" accept="image/*" required>
            </div>
            
            <div class="form-group image-section">
                <h3>Imagen para el Popup <span class="optional-label">(opcional - si no se sube, se usará la imagen principal)</span></h3>
                <input type="file" name="imagen_popup" id="imagen_popup" accept="image/*">
            </div>
            
            <button type="submit" name="submit_galeria">Cargar Imagen</button>
        </form>

        <h2>Agregar Noticia</h2>
        <form method="POST" enctype="multipart/form-data">
            <div class="form-group">
                <label for="texto1">Categoría (RSE, Innovación, etc.)</label>
                <input type="text" name="texto1" id="texto1" placeholder="Categoría" required>
            </div>
            <div class="form-group">
                <label for="tituloblanco">Título en Blanco</label>
                <input type="text" name="tituloblanco" id="tituloblanco" placeholder="Título que aparecerá en color blanco" required>
            </div>
            <div class="form-group">
                <label for="tituloverde">Título en Verde</label>
                <input type="text" name="tituloverde" id="tituloverde" placeholder="Título que aparecerá en color verde" required>
            </div>
            <div class="form-group">
                <label for="parrafo">Párrafo de la noticia</label>
                <textarea 
                    name="parrafo" 
                    id="parrafo" 
                    placeholder="Contenido principal de la noticia&#10;Usa Enter para crear nuevos párrafos" 
                    required
                    style="white-space: pre-wrap;"
                ></textarea>
            </div>
            <div class="form-group">
                <label for="imagen_noticia">Imagen de la noticia</label>
                <input type="file" name="imagen_noticia" id="imagen_noticia" accept="image/*" required>
            </div>
            <button type="submit" name="submit_noticia">Cargar Noticia</button>
        </form>

        <h2>Registros de la Galería</h2>
        <table>
            <tr>
                <th>Imagen Principal</th>
                <th>Imagen Popup</th>
                <th>Título</th>
                <th>Subtítulo</th>
                <th>Párrafo Izquierdo</th>
                <th>Párrafo Derecho</th>
                <th>Acciones</th>
            </tr>
            <?php while ($row = $result_galeria->fetch_assoc()): ?>
            <tr>
                <td>
                    <img src="<?php echo htmlspecialchars($row['rutadeImagen']); ?>" 
                         alt="Imagen de galería" 
                         class="preview-image">
                </td>
                <td>
                    <img src="<?php echo htmlspecialchars($row['rutaImagenPopup'] ? $row['rutaImagenPopup'] : $row['rutadeImagen']); ?>" 
                         alt="Imagen de popup" 
                         class="preview-image">
                </td>
                <td><?php echo htmlspecialchars($row['titulo']); ?></td>
                <td><?php echo htmlspecialchars($row['subtitulo']); ?></td>
                <td data-content><?php echo $row['parrafo_izquierdo']; ?></td>
                <td data-content><?php echo $row['parrafo_derecho']; ?></td>
                <td>
                    <form method="POST" onsubmit="return confirm('¿Está seguro de eliminar este registro?');">
                        <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                        <input type="hidden" name="ruta" value="<?php echo $row['rutadeImagen']; ?>">
                        <input type="hidden" name="ruta_popup" value="<?php echo $row['rutaImagenPopup']; ?>">
                        <button type="submit" name="delete_galeria" class="btn-eliminar">Eliminar</button>
                    </form>
                </td>
            </tr>
            <?php endwhile; ?>
        </table>

        <h2>Registros de Noticias</h2>
        <table>
            <tr>
                <th>Imagen</th>
                <th>Categoría</th>
                <th>Título Blanco</th>
                <th>Título Verde</th>
                <th>Párrafo</th>
                <th>Acciones</th>
            </tr>
            <?php while ($row = $result_noticias->fetch_assoc()): ?>
            <tr>
                <td>
                    <img src="<?php echo htmlspecialchars($row['rutadeimagen']); ?>" 
                         alt="Imagen de noticia" 
                         class="preview-image">
                </td>
                <td><?php echo htmlspecialchars($row['texto1']); ?></td>
                <td><?php echo htmlspecialchars($row['tituloblanco']); ?></td>
                <td><?php echo htmlspecialchars($row['tituloverde']); ?></td>
                <td data-content><?php echo $row['parrafo']; ?></td>
                <td>
                    <form method="POST" onsubmit="return confirm('¿Está seguro de eliminar esta noticia?');">
                        <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                        <input type="hidden" name="ruta" value="<?php echo $row['rutadeimagen']; ?>">
                        <button type="submit" name="delete_noticia" class="btn-eliminar">Eliminar</button>
                    </form>
                </td>
            </tr>
            <?php endwhile; ?>
        </table>
    </div>
</body>
</html>
