document.addEventListener('DOMContentLoaded', function () {
    console.log('OM site loaded!');

    const cartIcon = document.getElementById('cart-icon');
    const closeCartButton = document.getElementById('close-cart');
    const cart = document.getElementById('cart');
    const cartBody = document.querySelector('.cart-body');
    const addToCartButtons = document.querySelectorAll('.shop-product .cta-button');
    const sidebar = document.querySelector('.shop-sidebar');
    const animatedElements = document.querySelectorAll('.fade-in');
    const searchBar = document.getElementById('search-bar');
    const sortOptions = document.getElementById('sort-options');
    const header = document.querySelector('header');
    let cartItemCount = 0;

    // Cart toggle functionality
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cart.classList.toggle('open');
        });
    }

    if (closeCartButton) {
        closeCartButton.addEventListener('click', () => {
            cart.classList.remove('open');
        });
    }

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            cartItemCount++;
            updateCart();
        });
    });

    function updateCart() {
        if (cartBody) {
            cartBody.innerHTML = cartItemCount === 0
                ? '<p>No items in cart.</p>'
                : `<p>You have ${cartItemCount} item(s) in your cart.</p>`;
        }
    }

    updateCart();

    // Sidebar hover effect
    if (sidebar) {
        sidebar.addEventListener('mouseenter', () => sidebar.classList.add('shop-sidebar-expanded'));
        sidebar.addEventListener('mouseleave', () => sidebar.classList.remove('shop-sidebar-expanded'));
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => observer.observe(element));

    // Search functionality
    if (searchBar) {
        searchBar.addEventListener('input', function () {
            const filter = this.value.toLowerCase();
            const products = document.querySelectorAll('.shop-product');
            products.forEach(product => {
                const productName = product.querySelector('h3').innerText.toLowerCase();
                product.style.display = productName.includes(filter) ? '' : 'none';
            });
        });
    }

    // Sort functionality
    if (sortOptions) {
        sortOptions.addEventListener('change', function () {
            const products = Array.from(document.querySelectorAll('.shop-product'));
            const sortBy = this.value;
            products.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('p').innerText.replace('$', ''));
                const priceB = parseFloat(b.querySelector('p').innerText.replace('$', ''));
                return sortBy === 'price-asc' ? priceA - priceB : priceB - priceA;
            });
            const container = document.querySelector('.shop-products');
            if (container) {
                container.innerHTML = '';
                products.forEach(product => container.appendChild(product));
            }
        });
    }

    // Scroll listener for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
