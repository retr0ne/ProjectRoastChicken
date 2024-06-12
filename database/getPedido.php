<?php
include_once 'database/conection.php';

$objeto = new Conexion();
$conexion = $objeto->Conectar();

try {
    $consulta = "SELECT id, total, mesa, fecha FROM pedido WHERE estado='P'";
    $stmt = $conexion->prepare($consulta);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    print json_encode($data, JSON_UNESCAPED_UNICODE); 
} catch (PDOException $e) {
    // Log the error for debugging
    error_log("Database Error: " . $e->getMessage());
    
    // Return a JSON error response
    print json_encode(['error' => 'Error fetching data.']); 
} finally {
    $conexion = null; 
}

?>