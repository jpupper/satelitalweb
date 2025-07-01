<?php
require_once '../dbconfig.php';
$conexion = getDBConnection();

// Definir variables para el formulario
$image = $category = $titleBlack = $titleGreen = $description = $modalImage = $modalTextLeft = $modalTextRight = "";
$error = "";
$uploadDir = "../../assets/galeria/";

// Procesar el formulario cuando se envía
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar y procesar los datos del formulario
    $category = trim($_POST["category"]);
    $titleBlack = trim($_POST["titleBlack"]);
    $titleGreen = trim($_POST["titleGreen"]);
    $description = trim($_POST["description"]);
    $modalTextLeft = trim($_POST["modalTextLeft"]);
    $modalTextRight = trim($_POST["modalTextRight"]);
    
    // Validar campos obligatorios
    if (empty($category) || empty($titleBlack) || empty($description) || empty($modalTextLeft) || empty($modalTextRight)) {
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
                $image = 'assets/galeria/' . $fileName;
            } else {
                $error = "Hubo un error al subir la imagen principal.";
            }
        } else {
            $error = "Por favor, selecciona una imagen principal.";
        }
        
        // Procesar imagen del modal
        if (empty($error) && isset($_FILES['modalImage']) && $_FILES['modalImage']['error'] == 0) {
            $fileName = basename($_FILES['modalImage']['name']);
            $targetFilePath = $uploadDir . $fileName;
            
            // Subir la imagen
            if (move_uploaded_file($_FILES['modalImage']['tmp_name'], $targetFilePath)) {
                $modalImage = 'assets/galeria/' . $fileName;
            } else {
                $error = "Hubo un error al subir la imagen del modal.";
            }
        } else if (empty($error)) {
            $error = "Por favor, selecciona una imagen para el modal.";
        }
        
        // Si no hay errores, insertar en la base de datos
        if (empty($error)) {
            $language = $_POST['language'];
            $stmt = $conexion->prepare("INSERT INTO noticias (image, category, titleBlack, titleGreen, description, modalImage, modalTextLeft, modalTextRight, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssssss", $image, $category, $titleBlack, $titleGreen, $description, $modalImage, $modalTextLeft, $modalTextRight, $language);
            
            if ($stmt->execute()) {
                // Redireccionar al panel de administración con mensaje de éxito
                header("Location: admin.php?success=add");
                exit;
            } else {
                $error = "Error al guardar la noticia: " . $stmt->error;
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
    <title>Agregar Nueva Noticia</title>
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
        <h1>Agregar Nueva Noticia</h1>
        
        <?php if (!empty($error)): ?>
            <div class="alert alert-danger">
                <?php echo $error; ?>
            </div>
        <?php endif; ?>
        
        <form method="post" enctype="multipart/form-data">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="category" class="form-label">Descripción (Categoría) *</label>
                        <input type="text" class="form-control" id="category" name="category" value="<?php echo htmlspecialchars($category); ?>" required>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="image" class="form-label">Imagen Galería *</label>
                        <input type="file" class="form-control" id="image" name="image" accept="image/*" required onchange="previewImage(this, 'imagePreview')">
                        <img id="imagePreview" class="preview-image" src="#" alt="Vista previa">
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="titleBlack" class="form-label">Título Negro *</label>
                        <input type="text" class="form-control" id="titleBlack" name="titleBlack" value="<?php echo htmlspecialchars($titleBlack); ?>" required>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="titleGreen" class="form-label">Título Verde</label>
                        <input type="text" class="form-control" id="titleGreen" name="titleGreen" value="<?php echo htmlspecialchars($titleGreen); ?>">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="description" class="form-label">Párrafo *</label>
                <textarea class="form-control" id="description" name="description" rows="4" required><?php echo htmlspecialchars($description); ?></textarea>
            </div>
            
            <div class="form-group">
                <label for="modalImage" class="form-label">Imagen Popup *</label>
                <input type="file" class="form-control" id="modalImage" name="modalImage" accept="image/*" required onchange="previewImage(this, 'modalImagePreview')">
                <img id="modalImagePreview" class="preview-image" src="#" alt="Vista previa">
            </div>
            
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="modalTextLeft" class="form-label">Texto Izquierdo Popup *</label>
                        <textarea class="form-control" id="modalTextLeft" name="modalTextLeft" rows="4" required><?php echo htmlspecialchars($modalTextLeft); ?></textarea>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="modalTextRight" class="form-label">Texto Derecho Popup *</label>
                        <textarea class="form-control" id="modalTextRight" name="modalTextRight" rows="4"><?php echo htmlspecialchars($modalTextRight); ?></textarea>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="language" class="form-label">Idioma *</label>
                <select class="form-control" id="language" name="language" required>
                    <option value="es">Español</option>
                    <option value="en">English</option>
                </select>
            </div>

            <div class="form-group mt-4">
                <button type="submit" class="btn btn-primary">Guardar Noticia</button>
                <a href="admin.php" class="btn btn-secondary">Cancelar</a>
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

