const modifyIcon = document.getElementById("modify");

$(document).ready(function(){
  tabla = $("#orders-table").DataTable({
      columnDefs:[{
      targets: -1,
      render: function (data, type, row) {
        return '<span id="modify" class="modify-icon"><label for="" class="icon-server"></label></span>'
      }
    }]
  });

  $('#orders-table').on('click', '.edit-button', function() {
    var data = tabla.row($(this).parents('tr')).data();
    alert("You clicked the button for Order #" + data[0]); // Assuming data[0] is the order number
});
})

$(document).on("click", ".modify-icon", function(){
  fila = $(this).closest("tr");
  id = parseInt(fila.find('td:eq(0)').text());
  opcion = 1;
  var respuesta = confirm("Estas seguro de querer entregar el pedido: "+ id + "?");
  if(respuesta){
    $.ajax({
      url: "database/crud.php",
      type: "POST",
      dataType: "json",
      data: {opcion:opcion, id:id},
      success: function(response){ 
        console.log("Respuesta del servidor:", response);
        alert("Se ha actualizado el pedido " + id + " con exito");
        tabla.row(fila.parents('tr')).remove().draw(); 
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error("Error en la solicitud AJAX:", textStatus, errorThrown);
    }
  });
  }
} )



/*modifyIcon.addEventListener("click", () =>{
  //showConfirmationModal()
  $("orders-table").trigger("reset");
  alert("hola");
});

function showConfirmationModal(orderId) {
  const modal = document.getElementById("confirmation-modal");
  modal.style.display = "block";

  const confirmBtn = document.getElementById("confirm-btn");
  const cancelBtn = document.getElementById("cancel-btn");

  confirmBtn.onclick = function () {
    modifyOrder(orderId);
    modal.style.display = "none";
  };

  cancelBtn.onclick = function () {
    modal.style.display = "none";
  };
}

function modifyOrder(orderId) {
  const orderIndex = orders.findIndex((order) => order.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex].status = "PAGADO";
    setTimeout(() => {
      orders.splice(orderIndex, 1);
      renderOrders();
    }, 500); // Simula un pequeño retraso antes de eliminar el pedido pagado
  }
}*/