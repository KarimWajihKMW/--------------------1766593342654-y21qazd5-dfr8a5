document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    const products = [
        // Hot Drinks
        {
            id: 1,
            name: 'إسبريسو',
            price: 12,
            category: 'hot_drinks',
            image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            desc: 'قهوة مركزة وغنية بالنكهة'
        },
        {
            id: 2,
            name: 'كابتشينو',
            price: 18,
            category: 'hot_drinks',
            image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            desc: 'مزيج متوازن من الإسبريسو والحليب المبخر والرغوة'
        },
        {
            id: 3,
            name: 'لاتيه',
            price: 20,
            category: 'hot_drinks',
            image: 'https://images.unsplash.com/photo-1570968992077-029538caa6c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            desc: 'إسبريسو مع كمية وافرة من الحليب المبخر'
        },
        // Cold Drinks
        {
            id: 4,
            name: 'آيس أمريكانو',
            price: 16,
            category: 'cold_drinks',
            image: 'https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            desc: 'قهوة سوداء باردة ومنعشة مع الثلج'
        },
        {
            id: 5,
            name: 'موهيتو كلاسيك',
            price: 22,
            category: 'cold_drinks',
            image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            desc: 'ليمون ونعناع وصودا منعشة'
        },
        {
            id: 6,
            name: 'سبانيش لاتيه بارد',
            price: 24,
            category: 'cold_drinks',
            image: 'https://images.unsplash.com/photo-1461023058943-716d15664ecf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            desc: 'قهوة حلوة المذاق مع الحليب المكثف'
        },
        // Desserts
        {
            id: 7,
            name: 'تشيز كيك',
            price: 25,
            category: 'desserts',
            image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            desc: 'قطعة غنية من التشيز كيك بالفراولة'
        },
        {
            id: 8,
            name: 'كرواسون شوكولاتة',
            price: 14,
            category: 'desserts',
            image: 'https://images.unsplash.com/photo-1555507036-ab1f40388085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            desc: 'مخبوز طازج ومحشو بالشوكولاتة البلجيكية'
        },
        {
            id: 9,
            name: 'تيراميسو',
            price: 28,
            category: 'desserts',
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            desc: 'الحلوى الإيطالية الكلاسيكية بنكهة القهوة'
        }
    ];

    let cart = [];
    
    // --- Elements ---
    const menuContainer = document.getElementById('menu-container');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountBadge = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const cancelCheckoutBtn = document.getElementById('cancel-checkout');
    const orderForm = document.getElementById('order-form');
    const closeModalBg = document.getElementById('close-modal-bg');

    // --- Functions ---

    function renderMenu(category = 'all') {
        if (!menuContainer) return;
        menuContainer.innerHTML = '';
        
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(p => p.category === category);

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group';
            productCard.innerHTML = `
                <div class="h-48 overflow-hidden relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-amber-600 shadow-sm">
                        ${product.price} ريال
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-bold text-gray-800 mb-1">${product.name}</h3>
                    <p class="text-gray-500 text-sm mb-4 line-clamp-2">${product.desc}</p>
                    <button onclick="addToCart(${product.id})" class="w-full bg-amber-100 text-amber-800 py-2 rounded-lg font-medium hover:bg-amber-600 hover:text-white transition-colors flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        أضف للسلة
                    </button>
                </div>
            `;
            menuContainer.appendChild(productCard);
        });
    }

    // Expose addToCart globally
    window.addToCart = function(id) {
        const product = products.find(p => p.id === id);
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCartUI();
        showNotification(`تمت إضافة ${product.name} للسلة`);
    };

    window.removeFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    };

    window.updateQuantity = function(id, change) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(id);
            } else {
                updateCartUI();
            }
        }
    };

    function updateCartUI() {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center text-gray-500 mt-10 flex flex-col items-center">
                    <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    <p>السلة فارغة حالياً</p>
                </div>
            `;
            if(checkoutBtn) checkoutBtn.disabled = true;
            if(cartCountBadge) cartCountBadge.classList.add('hidden');
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;
                count += item.quantity;

                const cartItem = document.createElement('div');
                cartItem.className = 'flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100';
                cartItem.innerHTML = `
                    <img src="${item.image}" class="w-16 h-16 rounded-md object-cover flex-shrink-0">
                    <div class="flex-1">
                        <h4 class="text-sm font-bold text-gray-800">${item.name}</h4>
                        <p class="text-xs text-gray-500">${item.price} ريال</p>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <div class="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                            <button onclick="updateQuantity(${item.id}, -1)" class="px-2 py-1 text-gray-600 hover:bg-gray-200 transition">-</button>
                            <span class="px-2 text-sm font-medium">${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" class="px-2 py-1 text-gray-600 hover:bg-gray-200 transition">+</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            if(checkoutBtn) checkoutBtn.disabled = false;
            if(cartCountBadge) {
                cartCountBadge.textContent = count;
                cartCountBadge.classList.remove('hidden');
            }
        }

        if(cartTotalElement) cartTotalElement.textContent = total + ' ريال';
    }

    function openCart() {
        // Use Tailwind utility translate-x-full to hide/show
        // Removing it shows the sidebar (default transform is 0)
        cartSidebar.classList.remove('translate-x-full');
        cartOverlay.classList.remove('hidden');
        setTimeout(() => cartOverlay.classList.remove('opacity-0'), 10);
    }

    function closeCart() {
        // Adding it hides the sidebar to the right
        cartSidebar.classList.add('translate-x-full');
        cartOverlay.classList.add('opacity-0');
        setTimeout(() => cartOverlay.classList.add('hidden'), 300);
    }

    function showNotification(msg) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 opacity-0 transition-opacity duration-300';
        toast.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>${msg}</span>
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.remove('opacity-0');
        });

        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --- Event Listeners ---

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => {
                b.classList.remove('bg-amber-600', 'text-white');
                b.classList.add('bg-white', 'text-gray-600');
            });
            btn.classList.remove('bg-white', 'text-gray-600');
            btn.classList.add('bg-amber-600', 'text-white');

            renderMenu(btn.dataset.category);
        });
    });

    if(cartBtn) cartBtn.addEventListener('click', openCart);
    if(closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if(continueShoppingBtn) continueShoppingBtn.addEventListener('click', closeCart);
    if(cartOverlay) cartOverlay.addEventListener('click', closeCart);

    if(checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            closeCart();
            checkoutModal.classList.remove('hidden');
        });
    }

    if(cancelCheckoutBtn) {
        cancelCheckoutBtn.addEventListener('click', () => {
            checkoutModal.classList.add('hidden');
        });
    }
    
    if(closeModalBg) {
        closeModalBg.addEventListener('click', () => {
            checkoutModal.classList.add('hidden');
        });
    }

    if(orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('شكراً لك! تم استلام طلبك بنجاح وسيصلك قريباً.');
            checkoutModal.classList.add('hidden');
            cart = [];
            updateCartUI();
        });
    }

    // --- Init ---
    renderMenu();
});