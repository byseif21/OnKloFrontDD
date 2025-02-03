document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [
        { product: 'Product 1', quantity: 2, price: 25.00 },
        { product: 'Product 2', quantity: 1, price: 40.00 }
    ];

    const cartItemsTable = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    let total = 0;

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${(item.quantity * item.price).toFixed(2)}</td>
        `;
        cartItemsTable.appendChild(row);
        total += item.quantity * item.price;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;

    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for your purchase!');
        form.reset();
    });
});
