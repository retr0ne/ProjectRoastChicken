<?php
include_once 'conection.php';

$objeto = new Conexion();
$conexion = $objeto->Conectar();

$id = (isset($_POST['id'] ))?$_POST['id']:'';
$fecha = (isset($_POST['fecha'] ))?$_POST['fecha']:'';
$cedulaUsuario = (isset($_POST['cedulaUsuario'] ))?$_POST['cedulaUsuario']:'';
$estado = (isset($_POST['estado'] ))?$_POST['estado']:'';
$mesa = (isset($_POST['mesa'] ))?$_POST['mesa']:'';
$total = (isset($_POST['total'] ))?$_POST['total']:'';
$opcion = (isset($_POST['opcion'] ))?$_POST['opcion']:'';

switch ($opcion) {
    case 1:
        $consulta = "UPDATE pedido SET estado = 'A' WHERE (id = '$id')";
        $stmt = $conexion->prepare($consulta);
        $stmt->execute();
        break;
    case 2:
        $consulta = "SELECT id, total, mesa, estado FROM pedido WHERE estado='P'";
        $stmt = $conexion->prepare($consulta);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:
        $consulta = "INSERT INTO pedido ( fecha, cedulaUsuario, estado, mesa, total) VALUES ( sysdate(), '$cedulaUsuario', 'P', '$mesa', '0')";
        $stmt = $conexion->prepare($consulta);
        $stmt->execute();

        $consulta = "SELECT id, total, mesa, estado FROM pedido WHERE estado='P'";
        $stmt = $conexion->prepare($consulta);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        break;
}

    $conexion = null; 
?>