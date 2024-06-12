document.addEventListener('DOMContentLoaded', function() {
  const itemsOfInventory = document.getElementById('itemsofinventory');
  const ElementoSeleccionados = document.getElementById('product-counter');
  const selectedProductsList = document.getElementById('selected-products-list');
  const facturarVentaBtn = document.getElementById('facturar-venta');
  const confirmarVentaBtn = document.getElementById('confirmar-venta-btn');

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

  facturarVentaBtn.addEventListener('click', showFacturarModal);
  confirmarVentaBtn.addEventListener('click', confirmVenta);
});

