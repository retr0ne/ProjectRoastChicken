document.addEventListener('DOMContentLoaded', function() {
  const itemsOfInventory = document.getElementById('itemsofinventory');
  const ElementoSeleccionados = document.getElementById('product-counter');
  const selectedProductsList = document.getElementById('selected-products-list');
  const facturarVentaBtn = document.getElementById('facturar-venta');
  const confirmarVentaBtn = document.getElementById('confirmar-venta-btn');

  const inventoryData = [
      { name: 'Cuarto de Pollo asado', price: '10.000', quantity: 5 },
      { name: 'Medio Pollo asado', price: '15.000', quantity: 0 },
      { name: 'Pollo asado', price: '20.000', quantity: 3 },
      { name: 'Arroz con pollo', price: '20.000', quantity: 30 },
      { name: 'Cuarto de pollo broaster', price: '25.000', quantity: 40 },
      { name: 'Medio pollo broaster', price: '30.000', quantity: 50 },
      { name: 'Pollo broaster', price: '35.000', quantity: 60 },
      { name: 'Ajiaco', price: '40.000', quantity: 70 },
      { name: 'Bandeja paisa', price: '45.000', quantity: 80 },
      { name: 'Croquetas de pollo', price: '50.000', quantity: 90 },
      { name: 'Lasana RoastChicken', price: '55.000', quantity: 100 },
      { name: 'Gaseosa Personal', price: '3.000', quantity: 110 },
      { name: 'Gaseosa 2L', price: '5.000', quantity: 120 },
      { name: 'Gaseosa 3L', price: '7.000', quantity: 130 },
      { name: 'Brasas sagradas', price: '80.000', quantity: 140 },
      { name: 'Alitas al vapor + gaseosa', price: '85.000', quantity: 150 },
      { name: 'Combo Familiar', price: '90.000', quantity: 160 },
      { name: 'Mr Roast Combo', price: '95.000', quantity: 170 },
      { name: 'ComboMax Chicken', price: '100.000', quantity: 180 }
  ];

  let contadorDeProductos = 0;
  let selectedProducts = [];

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
          if (itemCard.classList.toggle('selected')) {
              selectedProducts.push({ ...item, selectedQuantity: 1 });
              contadorDeProductos++;
          } else {
              selectedProducts = selectedProducts.filter(p => p.name !== item.name);
              contadorDeProductos--;
          }
          ActualizarElementosSelect();
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

  function ActualizarElementosSelect() {
      ElementoSeleccionados.textContent = contadorDeProductos;
  }

  function showFacturarModal() {
      selectedProductsList.innerHTML = '';

      selectedProducts.forEach(product => {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item');
          listItem.textContent = `${product.name} - $${product.price} x ${product.selectedQuantity}`;

          const increaseBtn = document.createElement('button');
          increaseBtn.classList.add('btn', 'btn-sm', 'btn-success', 'ml-2');
          increaseBtn.textContent = '+';
          increaseBtn.addEventListener('click', () => {
              product.selectedQuantity++;
              listItem.textContent = `${product.name} - $${product.price} x ${product.selectedQuantity}`;
          });

          const decreaseBtn = document.createElement('button');
          decreaseBtn.classList.add('btn', 'btn-sm', 'btn-danger', 'ml-2');
          decreaseBtn.textContent = '-';
          decreaseBtn.addEventListener('click', () => {
              if (product.selectedQuantity > 1) {
                  product.selectedQuantity--;
                  listItem.textContent = `${product.name} - $${product.price} x ${product.selectedQuantity}`;
              }
          });

          const removeBtn = document.createElement('button');
          removeBtn.classList.add('btn', 'btn-sm', 'btn-warning', 'ml-2');
          removeBtn.textContent = 'Eliminar';
          removeBtn.addEventListener('click', () => {
              selectedProducts = selectedProducts.filter(p => p.name !== product.name);
              listItem.remove();
              contadorDeProductos--;
              ActualizarElementosSelect();
          });

          listItem.appendChild(increaseBtn);
          listItem.appendChild(decreaseBtn);
          listItem.appendChild(removeBtn);
          selectedProductsList.appendChild(listItem);
      });

      $('#facturar-modal').modal('show');
  }

  function confirmVenta() {
      const mesa = document.getElementById('mesa-select').value;
      const trabajador = document.getElementById('usuario-label').textContent;
      
      const pedido = {
          productos: selectedProducts,
          mesa: mesa,
          trabajador: trabajador,
          total: selectedProducts.reduce((total, prod) => total + parseFloat(prod.price.replace('.', '')) * prod.selectedQuantity, 0)
      };

      console.log('Pedido confirmado:', pedido);

      selectedProducts = [];
      contadorDeProductos = 0;
      ActualizarElementosSelect();
      $('#facturar-modal').modal('hide');
  }

  renderInventory();

  $(document).on("click", "#caja", function(){
    alert("Caja Cerrada");
})

  facturarVentaBtn.addEventListener('click', showFacturarModal);
  confirmarVentaBtn.addEventListener('click', confirmVenta);
});

