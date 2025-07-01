<?php
require_once '../dbconfig.php';
$conexion = getDBConnection();

// Verificar si se ha enviado una acción para cambiar el estado de una noticia
if (isset($_GET['toggle']) && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $stmt = $conexion->prepare("UPDATE noticias SET active = 1 - active WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
    
    // Redireccionar para evitar reenvío del formulario
    header("Location: admin.php");
    exit;
}

// Obtener todas las noticias
$sql = "SELECT id, image, category, titleBlack, titleGreen, date, active, language FROM noticias ORDER BY date DESC";
$resultado = $conexion->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administración de Galería</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <style>
        body {
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 1200px;
        }
        h1 {
            margin-bottom: 30px;
        }
        .thumbnail {
            width: 100px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
        }
        .table-responsive {
            margin-top: 20px;
        }
        .btn-group {
            white-space: nowrap;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>Administración de Galería</h1>
            <a href="news-add.php" class="btn btn-primary">
                <i class="bi bi-plus-lg"></i> Agregar Nueva Noticia
            </a>
        </div>
        
        <?php if (isset($_GET['success'])): ?>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <?php 
                    switch($_GET['success']) {
                        case 'add':
                            echo 'Noticia agregada correctamente.';
                            break;
                        case 'edit':
                            echo 'Noticia actualizada correctamente.';
                            break;
                        case 'delete':
                            echo 'Noticia eliminada correctamente.';
                            break;
                        default:
                            echo 'Operación completada con éxito.';
                    }
                ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <?php endif; ?>
        
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Categoría</th>
                        <th>Título</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Idioma</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ($resultado->num_rows > 0): ?>
                        <?php while($fila = $resultado->fetch_assoc()): ?>
                            <tr>
                                <td><?php echo $fila['id']; ?></td>
                                <td>
                                    <img src="<?php echo $fila['image']; ?>" alt="Miniatura" class="thumbnail">
                                </td>
                                <td><?php echo htmlspecialchars($fila['category']); ?></td>
                                <td>
                                    <?php 
                                        echo htmlspecialchars($fila['titleBlack']); 
                                        if (!empty($fila['titleGreen'])) {
                                            echo ' <span class="text-success">' . htmlspecialchars($fila['titleGreen']) . '</span>';
                                        }
                                    ?>
                                </td>
                                <td><?php echo date('d/m/Y', strtotime($fila['date'])); ?></td>
                                <td>
                                    <?php if ($fila['active']): ?>
                                        <span class="badge bg-success">Activa</span>
                                    <?php else: ?>
                                        <span class="badge bg-danger">Inactiva</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <?php echo $fila['language'] === 'es' ? 'Español' : 'English'; ?>
                                </td>
                                <td>
                                    <div class="btn-group">
                                        <a href="news-edit.php?id=<?php echo $fila['id']; ?>" class="btn btn-sm btn-warning">
                                            <i class="bi bi-pencil"></i> Editar
                                        </a>
                                        <a href="admin.php?toggle=1&id=<?php echo $fila['id']; ?>" class="btn btn-sm <?php echo $fila['active'] ? 'btn-secondary' : 'btn-success'; ?>">
                                            <i class="bi <?php echo $fila['active'] ? 'bi-eye-slash' : 'bi-eye'; ?>"></i>
                                            <?php echo $fila['active'] ? 'Desactivar' : 'Activar'; ?>
                                        </a>
                                        <a href="news-delete.php?id=<?php echo $fila['id']; ?>" class="btn btn-sm btn-danger" onclick="return confirm('¿Estás seguro de que deseas eliminar esta noticia?')">
                                            <i class="bi bi-trash"></i> Eliminar
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        <?php endwhile; ?>
                    <?php else: ?>
                        <tr>
                            <td colspan="8" class="text-center">No hay noticias disponibles. <a href="news-add.php">Agregar una nueva</a>.</td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        
        <div class="mt-4">
            <a href="index.html" class="btn btn-outline-primary">Volver al sitio</a>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

<?php $conexion->close(); ?>

