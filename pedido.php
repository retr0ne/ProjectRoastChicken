<?php
include_once 'database/conection.php';

$objeto = new Conexion();
$conexion = $objeto->Conectar();

try {
    $consulta = "SELECT id, total, mesa, estado FROM pedido WHERE estado='P'";
    $stmt = $conexion->prepare($consulta);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    // Log the error for debugging
    error_log("Database Error: " . $e->getMessage());
    
    // Return a JSON error response
    print json_encode(['error' => 'Error fetching data.']); 
} finally {
    $conexion = null; 
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roast Chicken</title>
    <link rel="stylesheet" href="css/cash.css">
    <link rel="stylesheet" href="css/stylespedido.css">
    <link rel="icon" href="src/icon.png" type="image/x-icon">
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>    
<!--    Datatables-->
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.20/datatables.min.js"></script>

</head>
<body>

    <header>
    <div class="container">
        <div class="btn-menu">
            <label for="btn-menu" class="icon-menu"></label>
            <img src="src/logo.png" alt="">
        </div>
    </div>
        
    </header>
    <input type="checkbox" id="btn-menu">
    <div class="container-menu">
        <div class="cont-menu">
            <nav>
                <a href="index.html"><label for="" class="icon-basket"></label>Venta</a>
                <a href="pedido.html"><label for="" class="icon-doc-text"></label>Pedido</a>
                <a href="registro.html"><label for="" class="icon-box"></label>Registro</a>
                <a href="#"><label for="" class="icon-suitcase"></label>Cerrar caja</a>
                <a href="login.html"><label for="" class="icon-logout"></label>Cerrar sesión</a>
            </nav>
            <label for="btn-menu" class="icon-cancel"></label>
        </div>
    </div>
   
    <main class="main-content-pedido">
        <table id="orders-table">
            <thead>
                <tr>
                    <th>Nro. de Pedido</th>
                    <th>Valor</th>
                    <th>Mesa</th>
                    <th>Estado</th>
                    <th>Modificar</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                foreach ($data as $dat){
                ?>
                <tr>
                    <td><?php echo $dat['id']?></td>
                    <td><?php echo $dat['total']?></td>
                    <td><?php echo $dat['mesa']?></td>
                    <td><?php echo $dat['estado']?></td>
                    <td>
                        <span id="modify" class="modify-icon">
                            <label for="" class="icon-server"></label>
                        </span>
                    </td>
                </tr>
                <?php 
                }
                ?>
            </tbody>
        </table>
    </main>
    <div></div>
    <div id="confirmation-modal" class="modal-pedido">
        <div class="modal-content">
            <p>¿Estás seguro que quieres cambiar el estado a PAGADO?</p>
            <button id="confirm-btn">Confirmar</button>
            <button id="cancel-btn">Atrás</button>
        </div>
    </div>
    <script src="Scripts/pedido.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js"></script>
</body>
</html>