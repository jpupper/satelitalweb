<?php
require_once '../dbconfig.php';
$conexion = getDBConnection();

// Datos de las noticias
$newsData = '[{"id":6,"image":"assets/galeria/corals.webp","category":"qdqdddqdq","titleBlack":"NOTICIA PRUEBA ESPAÑOL","titleGreen":"gawefawefawef","description":"qwdqwdDQWDQWDQWDQWFEWQ","date":"2025-06-30 22:20:12","modalImage":"assets/galeria/feedbacklimit.webp","modalTextLeft":"QWDQWDASDQWDDQWD","modalTextRight":"awefgawefawefawefszdcvawefwaef","active":1,"language":"es","formattedDate":"30/06/2025"},{"id":4,"image":"./assets/galeria/mineria.png","category":"RSE","titleBlack":"Mineria","titleGreen":"","description":"La actividad minera en sigue en expansión con nuevos proyectos en exploración y producción. Ghm, en conjunto con el gobierno provincial, buscan impulsar inversiones y empleo local, priorizando el desarrollo sostenible. Comunidades cercanas siguen de cerca el impacto ambiental y económico de la industria.","date":"2025-06-30 22:18:11","modalImage":"./assets/galeria/mineriapop.png","modalTextLeft":"La actividad minera sigue en expansión con nuevos proyectos en exploración y producción. Ghm, en conjunto con el gobierno provincial, buscan impulsar inversiones y empleo local, priorizando el desarrollo sostenible.","modalTextRight":"Comunidades cercanas siguen de cerca el impacto ambiental y económico de la industria .","active":1,"language":"es","formattedDate":"30/06/2025"},{"id":5,"image":"./assets/galeria/alfalfa.png","category":"SOSTENIBILIDAD","titleBlack":"Campo de","titleGreen":"Alfalfa","description":"En nuestra empresa, sostenemos un compromiso firme con la sustentabilidad y el cuidado del medio ambiente. Contamos con tres hectáreas principalmente dedicadas al cultivo de alfalfa, además de cultivar especies como orégano y tomillo. Aprovechamos la diversidad natural de nuestros terrenos para optimizar la producción agrícola, promoviendo un equilibrio sostenible que respete y preserve los ecosistemas locales.","date":"2025-06-30 22:18:11","modalImage":"./assets/galeria/alfalfa.png","modalTextLeft":"En nuestra empresa, sostenemos un compromiso firme con la sustentabilidad y el cuidado del medio ambiente. Contamos con tres hectáreas principalmente dedicadas al cultivo de alfalfa, además de cultivar especies como orégano y tomillo.","modalTextRight":"Aprovechamos la diversidad natural de nuestros terrenos para optimizar la producción agrícola, promoviendo un equilibrio sostenible que respete y preserve los ecosistemas locales.","active":1,"language":"es","formattedDate":"30/06/2025"},{"id":3,"image":"./assets/galeria/Captura de pantalla 2025-03-26 a la(s) 17.13.33.png","category":"Calingasta","titleBlack":"Día de las Infancias 2024","titleGreen":"Calingasta","description":"GHM Satelital donó al festejo por el día de las infancias en el departamento de Calingasta las ilustracio- nes, diseño, maquetación, y la impresión de un libro para colorear.","date":"2025-03-26 17:15:21","modalImage":"./assets/galeria/Captura de pantalla 2025-03-26 a la(s) 17.10.53.png","modalTextLeft":"-","modalTextRight":".","active":1,"language":"es","formattedDate":"26/03/2025"}]';

try {
    // Decodificar el JSON
    $news = json_decode($newsData, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Error al decodificar JSON: " . json_last_error_msg());
    }

    // Preparar la consulta SQL
    $stmt = $conexion->prepare("INSERT INTO noticias (id, image, category, titleBlack, titleGreen, description, date, modalImage, modalTextLeft, modalTextRight, active, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    if (!$stmt) {
        throw new Exception("Error en la preparación de la consulta: " . $conexion->error);
    }

    // Insertar cada noticia
    foreach ($news as $item) {
        $stmt->bind_param("isssssssssss",
            $item['id'],
            $item['image'],
            $item['category'],
            $item['titleBlack'],
            $item['titleGreen'],
            $item['description'],
            $item['date'],
            $item['modalImage'],
            $item['modalTextLeft'],
            $item['modalTextRight'],
            $item['active'],
            $item['language']
        );

        if (!$stmt->execute()) {
            throw new Exception("Error al insertar noticia ID {$item['id']}: " . $stmt->error);
        }
        
        echo "Noticia ID {$item['id']} insertada correctamente<br>";
    }

    echo "Todas las noticias han sido insertadas exitosamente";
    
    // Cerrar la conexión
    $stmt->close();
    $conexion->close();

} catch (Exception $e) {
    die("Error: " . $e->getMessage());
}
?>
