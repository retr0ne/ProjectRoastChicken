document.addEventListener('DOMContentLoaded', function() {
    const itemsOfInventory = document.getElementById('itemsofinventory');

    // vea aca como tal esta el objeto que tiene de prueba los datos
    const inventoryData = [
        { name: 'Item 1', price: '10.000', quantity: 5 },
        { name: 'Item 2', price: '15.000', quantity: 0 },
        { name: 'Item 3', price: '20.000', quantity: 3 },
        { name: 'Item 4', price: '20.000', quantity: 30 },
        { name: 'Item 5', price: '25.000', quantity: 40 },
        { name: 'Item 6', price: '30.000', quantity: 50 },
        { name: 'Item 7', price: '35.000', quantity: 60 },
        { name: 'Item 8', price: '40.000', quantity: 70 },
        { name: 'Item 9', price: '45.000', quantity: 80 },
        { name: 'Item 10', price: '50.000', quantity: 90 },
        { name: 'Item 11', price: '55.000', quantity: 100 },
        { name: 'Item 12', price: '60.000', quantity: 110 },
        { name: 'Item 13', price: '70.000', quantity: 120 },
        { name: 'Item 14', price: '75.000', quantity: 130 },
        { name: 'Item 15', price: '80.000', quantity: 140 },
        { name: 'Item 16', price: '85.000', quantity: 150 },
        { name: 'Item 17', price: '90.000', quantity: 160 },
        { name: 'Item 18', price: '95.000', quantity: 170 },
        { name: 'Item 19', price: '100.000', quantity: 180 }
    ]; 

    function createItemCard(item) {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');
        
        if (item.quantity === 0) {
            itemCard.style.display = 'none';
        }

        const itemName = document.createElement('h2');
        itemName.textContent = item.name;

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `Precio: $${item.price}`;

        const itemQuantity = document.createElement('p');
        itemQuantity.classList.add('item-quantity');
        itemQuantity.textContent = `Cantidad: ${item.quantity}`;

        itemCard.appendChild(itemName);
        itemCard.appendChild(itemPrice);
        itemCard.appendChild(itemQuantity);

        itemCard.addEventListener('click', function() {
            itemCard.classList.toggle('selected');
        });

        return itemCard;
    }

    function renderInventory() {
        itemsOfInventory.innerHTML = ''; // Limpiar el contenido existente

        inventoryData.forEach(item => {
            const itemCard = createItemCard(item);
            itemsOfInventory.appendChild(itemCard);
        });
    }

    // Llamar a renderInventory inicialmente
    renderInventory();

    // Simular actualización de inventario
    setTimeout(() => {
        inventoryData[1].quantity = 2; // Cambiar la cantidad de Item 2
        renderInventory(); // Volver a renderizar el inventario
    }, 5000);
});

const botones = document.querySelectorAll(".boton");

//Codigo de prueba para el cambio de style de los botones.

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    boton.classList.add("fondo-negro"); 

    botones.forEach(otroBoton => {
      if (otroBoton !== boton) {
        otroBoton.classList.remove("fondo-negro");
        console.log("Hola mundo"); 
      }
    });
  });
});

let selectedProducts = [];
let productCounter = 0;

function updateProductCounter(change) {
  productCounter += change;
  if (productCounter < 0) productCounter = 0;
  document.getElementById('product-counter').textContent = productCounter;
}

function toggleProductSelection(itemCard, product) {
  const productName = product.name;

  if (itemCard.classList.contains('selected')) {
    itemCard.classList.remove('selected');
    selectedProducts = selectedProducts.filter(p => p.name !== productName);
    updateProductCounter(-1);
  } else {
    itemCard.classList.add('selected');
    selectedProducts.push(product);
    updateProductCounter(1);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const orders = [
      { id: 1000006, value: 100000, table: 9, status: 'PENDIENTE' },
      { id: 1000005, value: 20000, table: 12, status: 'PENDIENTE' },
      { id: 1000004, value: 45000, table: 10, status: 'PENDIENTE' },
      { id: 1000003, value: 108000, table: 2, status: 'PENDIENTE' },
      { id: 1000002, value: 70000, table: 13, status: 'PENDIENTE' },
      { id: 1000001, value: 15000, table: 8, status: 'PENDIENTE' }
  ];

  function renderOrders() {
      const tbody = document.querySelector('#orders-table tbody');
      tbody.innerHTML = '';

      orders.forEach(order => {
          const tr = document.createElement('tr');

          const idTd = document.createElement('td');
          idTd.textContent = order.id;
          idTd.style.backgroundColor = '#333';
          idTd.style.color = '#fff';
          tr.appendChild(idTd);

          const valueTd = document.createElement('td');
          valueTd.textContent = order.value.toLocaleString();
          tr.appendChild(valueTd);

          const tableTd = document.createElement('td');
          tableTd.textContent = order.table;
          tr.appendChild(tableTd);

          const statusTd = document.createElement('td');
          statusTd.textContent = order.status;
          tr.appendChild(statusTd);

          const modifyTd = document.createElement('td');
          const modifyIcon = document.createElement('span');
          modifyIcon.classList.add('modify-icon');
          modifyIcon.innerHTML = '<label for="" class="icon-server"></label>';
          modifyIcon.addEventListener('click', () => showConfirmationModal(order.id));
          modifyTd.appendChild(modifyIcon);
          tr.appendChild(modifyTd);

          tbody.appendChild(tr);
      });
  }

  function showConfirmationModal(orderId) {
      const modal = document.getElementById('confirmation-modal');
      modal.style.display = 'block';

      const confirmBtn = document.getElementById('confirm-btn');
      const cancelBtn = document.getElementById('cancel-btn');

      confirmBtn.onclick = function() {
          modifyOrder(orderId);
          modal.style.display = 'none';
      };

      cancelBtn.onclick = function() {
          modal.style.display = 'none';
      };
  }

  function modifyOrder(orderId) {
      const orderIndex = orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
          orders[orderIndex].status = 'PAGADO';
          setTimeout(() => {
              orders.splice(orderIndex, 1);
              renderOrders();
          }, 500); // Simula un pequeño retraso antes de eliminar el pedido pagado
      }
  }

  renderOrders();
});