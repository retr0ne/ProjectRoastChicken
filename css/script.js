// Simulación de datos de la base de datos
const products = [
    { name: "POLLO ENTERO ASADO", price: "35.000 COP", stock: 20, image: "src/broasterchicken.jpg" },
    { name: "1/2 POLLO ASADO", price: "20.000 COP", stock: 20, image: "src/broasterchicken.jpg" },
    { name: "1/4 DE POLLO ASADO", price: "8.000 COP", stock: 20, image: "src/broasterchicken.jpg" },
    { name: "POLLO ENTERO FRITO", price: "40.000 COP", stock: 20, image: "src/broasterchicken.jpg" },
    { name: "1/2 POLLO FRITO", price: "22.000 COP", stock: 20, image: "src/broasterchicken.jpg" },
    { name: "1/4 DE POLLO FRITO", price: "10.000 COP", stock: 20, image: "src/broasterchicken.jpg" },
    { name: "GASEOSA 1L", price: "", stock: 0, image: "src/broasterchicken.jpg" },
    { name: "GASEOSA 2L", price: "", stock: 0, image: "src/broasterchicken.jpg" },
    { name: "GASEOSA 3L", price: "", stock: 0, image: "src/broasterchicken.jpg" }
];

let productCounter = 0;

// Función para actualizar el contador de productos
function updateProductCounter(change) {
    productCounter += change;
    if (productCounter < 0) productCounter = 0;
    document.getElementById('product-counter').textContent = productCounter;
}

// Función para manejar la selección y deselección de productos
function toggleProductSelection(event) {
    const productCard = event.currentTarget;
    if (productCard.classList.contains('selected')) {
        productCard.classList.remove('selected');
        updateProductCounter(-1);
    } else {
        productCard.classList.add('selected');
        updateProductCounter(1);
    }
}

// Función para generar dinámicamente las tarjetas de productos
function generateProductCards() {
    const productGrid = document.getElementById('product-grid');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.onclick = toggleProductSelection;
        
        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;
        
        const productName = document.createElement('p');
        productName.textContent = product.name;
        
        const productPrice = document.createElement('p');
        productPrice.textContent = `${product.price} | ${product.stock} Disponibles`;
        
        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productGrid.appendChild(productCard);
    });
}

// Generar las tarjetas de productos al cargar la página
window.onload = generateProductCards;
