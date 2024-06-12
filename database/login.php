<?php
session_start();
include 'conection.php'; 
$objeto = new Conexion();
$conn = $objeto->Conectar();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['cedula'];
    $password = $_POST['password'];

    // Consulta para verificar el usuario
    $stmt = $conn->prepare("SELECT cedula, contrasena, usuario FROM usuario WHERE cedula = '$username' AND contrasena = '$password'");
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        $_SESSION['user_id'] = $user['usuario'];
        $_SESSION['cedula'] = $user['cedula'];
        echo json_encode(['status' => 'success', 'cedula' => $user['cedula']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Usuario o contraseña incorrectos']);
    }
    
    $conn=null;
}
?>
