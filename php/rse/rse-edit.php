<?php
require_once '../dbconfig.php';
$conexion = getDBConnection();

// Verificar si se proporcionó un ID
if (!isset($_GET['id']) || empty($_GET['id'])) {
    header("Location: rse-admin.php");
    exit;
}

$id = intval($_GET['id']);
$error = "";
$uploadDir = "./assets/rse/";

// Obtener los datos del proyecto
$stmt = $conexion->prepare("SELECT * FROM rse_projects WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {
    header("Location: rse-admin.php");
    exit;
}

$proyecto = $resultado->fetch_assoc();
$stmt->close();

// Procesar el formulario cuando se envía
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar y procesar los datos del formulario
    $title = trim($_POST["title"]);
    
    // Validar campos obligatorios
    if (empty($title)) {
        $error = "Por favor, completa todos los campos obligatorios.";
    } else {
        // Inicializar con los valores actuales
        $image = $proyecto['image'];
        $popupImage = $proyecto['popupImage'];
        
        // Procesar imagen principal si se ha subido una nueva
        if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
            $fileName = basename($_FILES['image']['name']);
            $targetFilePath = $uploadDir . $fileName;
            
            // Verificar si el directorio existe, si no, crearlo
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }
            
            // Subir la imagen
            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
                $image = $targetFilePath;
            } else {
                $error = "Hubo un error al subir la imagen principal.";
            }
        }
        
        // Procesar imagen del popup si se ha subido una nueva
        if (empty($error) && isset($_FILES['popupImage']) && $_FILES['popupImage']['error'] == 0) {
            $fileName = basename($_FILES['popupImage']['name']);
            $targetFilePath = $uploadDir . $fileName;
            
            // Subir la imagen
            if (move_uploaded_file($_FILES['popupImage']['tmp_name'], $targetFilePath)) {
                $popupImage = $targetFilePath;
            } else {
                $error = "Hubo un error al subir la imagen del popup.";
            }
        }
        
        // Si no hay errores, actualizar en la base de datos
        if (empty($error)) {
            $language = $_POST['language'];
            $stmt = $conexion->prepare("UPDATE rse_projects SET image = ?, title = ?, popupImage = ?, language = ? WHERE id = ?");
            $stmt->bind_param("ssssi", $image, $title, $popupImage, $language, $id);
            
            if ($stmt->execute()) {
                // Redireccionar al panel de administración con mensaje de éxito
                header("Location: rse-admin.php?success=edit");
                exit;
            } else {
                $error = "Error al actualizar el proyecto: " . $stmt->error;
            }
            $stmt->close();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Proyecto RSE</title>
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
        .form-group {
            margin-bottom: 20px;
        }
        .preview-image {
            max-width: 100%;
            max-height: 200px;
            margin-top: 10px;
            border-radius: 5px;
        }
        .current-image {
            margin-top: 10px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Editar Proyecto RSE</h1>
        
        <?php if (!empty($error)): ?>
            <div class="alert alert-danger">
                <?php echo $error; ?>
            </div>
        <?php endif; ?>
        
        <form method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="title" class="form-label">Título *</label>
                <input type="text" class="form-control" id="title" name="title" value="<?php echo htmlspecialchars($proyecto['title']); ?>" required>
            </div>
            
            <div class="form-group">
                <label for="image" class="form-label">Imagen Principal</label>
                <div class="current-image">
                    <img src="<?php echo htmlspecialchars($proyecto['image']); ?>" alt="Imagen actual" class="preview-image">
                    <p class="text-muted">Imagen actual</p>
                </div>
                <input type="file" class="form-control" id="image" name="image" accept="image/*" onchange="previewImage(this, 'imagePreview')">
                <img id="imagePreview" class="preview-image" src="#" alt="Vista previa" style="display: none;">
                <small class="form-text text-muted">Deja este campo vacío si no deseas cambiar la imagen.</small>
            </div>
            
            <div class="form-group">
                <label for="popupImage" class="form-label">Imagen Popup</label>
                <div class="current-image">
                    <img src="<?php echo htmlspecialchars($proyecto['popupImage']); ?>" alt="Imagen popup actual" class="preview-image">
                    <p class="text-muted">Imagen popup actual</p>
                </div>
                <input type="file" class="form-control" id="popupImage" name="popupImage" accept="image/*" onchange="previewImage(this, 'popupImagePreview')">
                <img id="popupImagePreview" class="preview-image" src="#" alt="Vista previa" style="display: none;">
                <small class="form-text text-muted">Deja este campo vacío si no deseas cambiar la imagen.</small>
            </div>
            
            <div class="form-group">
                <label for="language" class="form-label">Idioma *</label>
                <select class="form-control" id="language" name="language" required>
                    <option value="es" <?php echo $proyecto['language'] === 'es' ? 'selected' : ''; ?>>Español</option>
                    <option value="en" <?php echo $proyecto['language'] === 'en' ? 'selected' : ''; ?>>English</option>
                </select>
            </div>

            <div class="form-group mt-4">
                <button type="submit" class="btn btn-primary">Actualizar Proyecto</button>
                <a href="rse-admin.php" class="btn btn-secondary">Cancelar</a>
            </div>
        </form>
    </div>
    
    <script>
        function previewImage(input, previewId) {
            const preview = document.getElementById(previewId);
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }
    </script>
</body>
</html>

<?php $conexion->close(); ?>

