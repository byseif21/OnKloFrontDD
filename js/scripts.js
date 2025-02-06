document.addEventListener('DOMContentLoaded', function () {
    console.log('مـ site loaded!');

    const cartIcon = document.getElementById('cart-icon');
    const closeCartButton = document.getElementById('close-cart');
    const cart = document.getElementById('cart');
    const cartBody = document.querySelector('.cart-body');
    const addToCartButtons = document.querySelectorAll('.shop-product .cta-button');
    const sidebar = document.querySelector('.shop-sidebar');
    const footer = document.querySelector('footer');
    const animatedElements = document.querySelectorAll('.fade-in');
    const searchBar = document.getElementById('search-bar');
    const sortOptions = document.getElementById('sort-options');
    const header = document.querySelector('header');
    const logo = document.querySelector('.header-logo');
    const navLinks = document.querySelector('.nav-links');
    let cartItemCount = 0;
    const shopProducts = document.querySelector('.shop-products');
    const products = shopProducts ? shopProducts.querySelectorAll('.shop-product') : [];

    // Cart toggle
    if (cartIcon) {
        cartIcon.addEventListener('click', () => cart.classList.toggle('open'));
    }
    if (closeCartButton) {
        closeCartButton.addEventListener('click', () => cart.classList.remove('open'));
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

    // Intersection Observer for fade-in animations
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

    // Sorting functionality
    if (sortOptions) {
        sortOptions.addEventListener('change', function () {
            const sortedProducts = Array.from(products).sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.product-price').innerText.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.product-price').innerText.replace('$', ''));
                return this.value === 'price-asc' ? priceA - priceB : priceB - priceA;
            });
            shopProducts.innerHTML = '';
            sortedProducts.forEach(product => shopProducts.appendChild(product));
        });
    }

    // Price range filter
    const priceRange = document.getElementById('price-range');
    const priceRangeValue = document.getElementById('price-range-value');
    if (priceRange) {
        priceRange.addEventListener('input', function () {
            const maxPrice = this.value;
            priceRangeValue.innerText = `$0 - $${maxPrice}`;
            products.forEach(product => {
                const productPrice = parseFloat(product.querySelector('.product-price').innerText.replace('$', ''));
                product.style.display = productPrice <= maxPrice ? 'flex' : 'none';
            });
        });
    }

    // Scroll behavior for header
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY;
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScrollTop = scrollTop;
    });

    // Sidebar Scroll Behavior (Stops Exactly at Footer)
    function updateSidebarPosition() {
        if (!sidebar || !footer) return;

        const sidebarHeight = sidebar.offsetHeight;
        const footerTop = footer.getBoundingClientRect().top + window.scrollY;
        const sidebarOffset = window.innerHeight * 0.35; // Matches top: 35%

        if (window.scrollY + sidebarOffset + sidebarHeight >= footerTop) {
            sidebar.style.position = 'absolute';
            sidebar.style.top = `${footerTop - sidebarHeight}px`;
        } else {
            sidebar.style.position = 'fixed';
            sidebar.style.top = '28%'; // Maintain original design
        }
    }

    window.addEventListener('scroll', updateSidebarPosition);
    updateSidebarPosition();

    // Header Scroll Behavior (Stops Exactly at Footer)
    function updateHeaderPosition() {
        if (!header || !footer) return;

        const headerHeight = header.offsetHeight;
        const footerTop = footer.getBoundingClientRect().top + window.scrollY;
        const headerOffset = window.innerHeight * 0.00; // For the space between the footer and the header (Small margin)

        // Add smooth transition
        header.style.transition = 'transform 0.3s ease-in-out';

        if (window.scrollY + headerHeight + headerOffset >= footerTop) {
            header.style.position = 'absolute';
            header.style.top = `${footerTop - headerHeight}px`;
        } else {
            header.style.position = 'sticky';
            header.style.top = '0';
        }
    }

    // Apply on scroll
    window.addEventListener('scroll', updateHeaderPosition);
    updateHeaderPosition();


    window.addEventListener('scroll', updateHeaderPosition);
    updateHeaderPosition();

    // Slider Functionality
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');

    if (slides && dots.length > 0) {
        let currentIndex = 0;
        const totalSlides = dots.length;

        function showSlide(index) {
            slides.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }

        // Auto Slide
        let autoSwitch = setInterval(nextSlide, 3000);

        // Manual dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                clearInterval(autoSwitch);
                currentIndex = parseInt(dot.getAttribute('data-index'), 10);
                showSlide(currentIndex);
                autoSwitch = setInterval(nextSlide, 3000);
            });
        });

        // Initialize the first slide
        showSlide(0);
    }
});
