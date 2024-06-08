document.addEventListener('DOMContentLoaded', function() {
    const itemsOfInventory = document.getElementById('itemsofinventory');

    // vea aca como tal esta el objeto que tiene de prueba los datos
    const inventoryData = [
        { name: 'Item 1', price: '10.00', quantity: 5 },
        { name: 'Item 2', price: '15.00', quantity: 0 },
        { name: 'Item 3', price: '20.00', quantity: 3 },
        { name: 'Item 4', price: '20.00', quantity: 30 },
        { name: 'Item 5', price: '25.00', quantity: 40 },
        { name: 'Item 6', price: '30.00', quantity: 50 },
        { name: 'Item 7', price: '35.00', quantity: 60 },
        { name: 'Item 8', price: '40.00', quantity: 70 },
        { name: 'Item 9', price: '45.00', quantity: 80 },
        { name: 'Item 10', price: '50.00', quantity: 90 },
        { name: 'Item 11', price: '55.00', quantity: 100 },
        { name: 'Item 12', price: '60.00', quantity: 110 },
        { name: 'Item 13', price: '70.00', quantity: 120 },
        { name: 'Item 14', price: '75.00', quantity: 130 },
        { name: 'Item 15', price: '80.00', quantity: 140 },
        { name: 'Item 16', price: '85.00', quantity: 150 },
        { name: 'Item 17', price: '90.00', quantity: 160 },
        { name: 'Item 18', price: '95.00', quantity: 170 },
        { name: 'Item 19', price: '100.00', quantity: 180 }
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
