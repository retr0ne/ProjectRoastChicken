document.addEventListener('DOMContentLoaded', function() {
    const orders = [
        { id: 1000006, value: 100000, date: '22/04/2024', cashier: 'Victor M.', status: 'PENDIENTE' },
        { id: 1000005, value: 20000, date: '22/04/2024', cashier: 'Victor M.', status: 'PENDIENTE' },
        { id: 1000004, value: 45000, date: '21/04/2024', cashier: 'Maria R.', status: 'PENDIENTE' },
        { id: 1000003, value: 108000, date: '21/04/2024', cashier: 'Maria R.', status: 'PENDIENTE' },
        { id: 1000002, value: 70000, date: '21/04/2024', cashier: 'Maria R.', status: 'PENDIENTE' },
        { id: 1000001, value: 15000, date: '21/04/2024', cashier: 'Maria R.', status: 'PENDIENTE' }
    ];

    const paidOrders = [];

    function renderOrders() {
        const tbody = document.querySelector('#orders-table tbody');
        tbody.innerHTML = '';

        paidOrders.forEach(order => {
            const tr = document.createElement('tr');

            const idTd = document.createElement('td');
            idTd.textContent = order.id;
            tr.appendChild(idTd);

            const valueTd = document.createElement('td');
            valueTd.textContent = order.value.toLocaleString();
            tr.appendChild(valueTd);

            const dateTd = document.createElement('td');
            dateTd.textContent = order.date;
            tr.appendChild(dateTd);

            const cashierTd = document.createElement('td');
            cashierTd.textContent = order.cashier;
            tr.appendChild(cashierTd);

            const viewTd = document.createElement('td');
            const viewLink = document.createElement('span');
            viewLink.classList.add('view-invoice');
            viewLink.textContent = 'Ver factura';
            viewLink.addEventListener('click', () => viewInvoice(order.id));
            viewTd.appendChild(viewLink);
            tr.appendChild(viewTd);

            tbody.appendChild(tr);
        });
    }

    function markAsPaid(orderId) {
        const orderIndex = orders.findIndex(order => order.id === orderId);
        if (orderIndex !== -1) {
            const order = orders[orderIndex];
            order.status = 'PAGADO';
            paidOrders.push(order);
            orders.splice(orderIndex, 1);
            renderOrders();
        }
    }

    function viewInvoice(orderId) {
        alert('Ver factura de la orden: ' + orderId);
    }

    // Simula que algunas órdenes han sido pagadas
    markAsPaid(1000006);
    markAsPaid(1000005);
    markAsPaid(1000004);
    markAsPaid(1000003);
    markAsPaid(1000002);
    markAsPaid(1000001);

    renderOrders();
});
