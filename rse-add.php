<?php
require_once 'dbconfig.php';
$conexion = getDBConnection();

// Definir variables para el formulario
$image = $title = $popupImage = "";
$error = "";
$uploadDir = "./assets/rse/";

// Procesar el formulario cuando se envía
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar y procesar los datos del formulario
    $title = trim($_POST["title"]);
    
    // Validar campos obligatorios
    if (empty($title)) {
        $error = "Por favor, completa todos los campos obligatorios.";
    } else {
        // Procesar imagen principal
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
        } else {
            $error = "Por favor, selecciona una imagen principal.";
        }
        
        // Procesar imagen del popup
        if (empty($error) && isset($_FILES['popupImage']) && $_FILES['popupImage']['error'] == 0) {
            $fileName = basename($_FILES['popupImage']['name']);
            $targetFilePath = $uploadDir . $fileName;
            
            // Subir la imagen
            if (move_uploaded_file($_FILES['popupImage']['tmp_name'], $targetFilePath)) {
                $popupImage = $targetFilePath;
            } else {
                $error = "Hubo un error al subir la imagen del popup.";
            }
        } else if (empty($error)) {
            $error = "Por favor, selecciona una imagen para el popup.";
        }
        
        // Si no hay errores, insertar en la base de datos
        if (empty($error)) {
            $stmt = $conexion->prepare("INSERT INTO rse_projects (image, title, popupImage) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $image, $title, $popupImage);
            
            if ($stmt->execute()) {
                // Redireccionar al panel de administración con mensaje de éxito
                header("Location: rse-admin.php?success=add");
                exit;
            } else {
                $error = "Error al guardar el proyecto: " . $stmt->error;
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
    <title>Agregar Nuevo Proyecto RSE</title>
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
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Agregar Nuevo Proyecto RSE</h1>
        
        <?php if (!empty($error)): ?>
            <div class="alert alert-danger">
                <?php echo $error; ?>  ?>
            <div class="alert alert-danger">
                <?php echo $error; ?>
            </div>
        <?php endif; ?>
        
        <form method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="title" class="form-label">Título *</label>
                <input type="text" class="form-control" id="title" name="title" value="<?php echo htmlspecialchars($title); ?>" required>
            </div>
            
            <div class="form-group">
                <label for="image" class="form-label">Imagen Principal *</label>
                <input type="file" class="form-control" id="image" name="image" accept="image/*" required onchange="previewImage(this, 'imagePreview')">
                <img id="imagePreview" class="preview-image" src="#" alt="Vista previa">
            </div>
            
            <div class="form-group">
                <label for="popupImage" class="form-label">Imagen Popup *</label>
                <input type="file" class="form-control" id="popupImage" name="popupImage" accept="image/*" required onchange="previewImage(this, 'popupImagePreview')">
                <img id="popupImagePreview" class="preview-image" src="#" alt="Vista previa">
            </div>
            
            <div class="form-group mt-4">
                <button type="submit" class="btn btn-primary">Guardar Proyecto</button>
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

