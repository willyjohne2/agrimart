// Product Data - Updated to KSh
const products = [
    {
        id: 1,
        name: "Eco-Harvest Pro Tractor",
        price: 4500000,
        image: "tractor1.jpeg",
        description: "A high-performance, fuel-efficient tractor designed for large-scale farming. Features advanced GPS navigation and ergonomic controls."
    },
    {
        id: 2,
        name: "Wheat Master Harvester",
        price: 12000000,
        image: "harvester.jpg",
        description: "State-of-the-art wheat harvester with superior grain separation technology and a wide header for maximum efficiency."
    },
    {
        id: 3,
        name: "Greenfield Irrigation System",
        price: 1500000,
        image: "irrigation.png",
        description: "Automated smart irrigation system with soil moisture sensors and precision spray nozzles to conserve water."
    },
    {
        id: 4,
        name: "Compact Utility Tractor",
        price: 2800000,
        image: "tractor2.jpeg",
        description: "Versatile utility tractor perfect for small to medium farms. compatible with hundreds of attachments for all-season use."
    },
    {
        id: 5,
        name: "Industrial Hay Baler",
        price: 3500000,
        image: "hay.jpg",
        description: "High-density hay baler capable of producing uniform, tightly packed bales for easy storage and transport."
    },
    {
        id: 6,
        name: "Automated Milking Machine",
        price: 5500000,
        image: "mliking1.jpg",
        description: "Gentle and efficient automated milking system designed to maximize yield while ensuring the comfort of your livestock."
    },
    {
        id: 7,
        name: "Terrain King Tractor",
        price: 6200000,
        image: "tractor3.jpeg",
        description: "Heavy-duty tractor built for tough terrains. 4WD with high torque engine and reinforced chassis."
    },
    {
        id: 8,
        name: "Pro-Series Grain Harvester",
        price: 13500000,
        image: "harvester2.jpg",
        description: "Next-gen harvester with AI-driven harvest optimization and high-capacity grain tank for fewer stops."
    }
];

// Helper to resolve image paths based on current directory
function getProductImagePath(imgName) {
    return '/assets/img/' + imgName;
}

// Testimonials Data
const testimonials = [
    {
        text: "Agri-Mart has transformed our farm operations. The Eco-Harvest tractor is a beast in the field!",
        author: "John Otieno, Greenfield Farms"
    },
    {
        text: "The customer service at Agri-Mart is unmatched. They helped us pick the perfect harvester for our wheat fields.",
        author: "Sarah Muthoni, Smith & Sons"
    },
    {
        text: "Incredible equipment. The automated milking machine has saved us countless hours every single day.",
        author: "Robert Ngeno, Dairy Valley"
    },
    {
        text: "Fast delivery and great maintenance support. Agri-Mart is our go-to for all agricultural machinery.",
        author: "Mwangi Wilson, Central Plains"
    }
];


let cart = {
    items: [],
    count: 0,
    total: 0
};


let productGrid, cartCount, cartTotal, cartStatus, testimonialContent, prevBtn, nextBtn, modal, modalBody, closeModal, hamburger, navLinks, overlay;
let cartDrawer, cartItemsContainer, closeCartBtn, drawerTotal, payBtn;

function initializeUI() {
    productGrid = document.getElementById('product-grid');
    cartCount = document.getElementById('cart-count');
    cartTotal = document.getElementById('cart-total');
    cartStatus = document.querySelector('.cart-status');
    testimonialContent = document.getElementById('testimonial-content');
    prevBtn = document.getElementById('prev-btn');
    nextBtn = document.getElementById('next-btn');
    modal = document.getElementById('product-modal');
    modalBody = document.getElementById('modal-body');
    closeModal = document.querySelector('.close-modal');
    hamburger = document.getElementById('hamburger');
    navLinks = document.getElementById('nav-links');
    overlay = document.getElementById('navbar-overlay');
    
    // Cart Drawer Elements
    cartDrawer = document.getElementById('cart-drawer');
    cartItemsContainer = document.getElementById('cart-items');
    closeCartBtn = document.getElementById('close-cart');
    drawerTotal = document.getElementById('drawer-cart-total');
    payBtn = document.getElementById('pay-btn');

    // Re-bind click listeners that might have been lost or were missing
    if (cartStatus) {
        cartStatus.onclick = toggleCart;
    }

    if (closeCartBtn) closeCartBtn.onclick = toggleCart;
    
    if (payBtn) {
        payBtn.onclick = () => {
            if (cart.items.length === 0) return;
            alert("✨ Processing payment for KSh " + cart.total.toLocaleString() + "...\nThank you for choosing Agri-Mart!");
            cart.items = [];
            cart.count = 0;
            cart.total = 0;
            updateCartUI();
            renderCart();
            toggleCart();
        };
    }

    if (closeModal) closeModal.onclick = closeModalFunction;
    if (hamburger) hamburger.onclick = toggleMenu;
    if (overlay) overlay.onclick = toggleMenu;

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.onclick = () => {
            if (navLinks) navLinks.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            if (hamburger) {
                const icon = hamburger.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
            document.body.style.overflow = '';
        };
    });

    if (prevBtn) {
        prevBtn.onclick = () => {
            testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
            renderTestimonial();
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            renderTestimonial();
        };
    }

    // Refresh UI with current cart state
    updateCartUI();
}

// Listen for contentLoaded event from include-header-footer.js
document.addEventListener('contentLoaded', (e) => {
    console.log(`Content loaded: ${e.detail.selector}`);
    initializeUI();
});


function renderProducts() {
    if (!productGrid) return;
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${getProductImagePath(product.image)}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">KSh ${product.price.toLocaleString()}</p>
                <div class="product-actions">
                    <button class="btn btn-details" onclick="openDetails(${product.id})">View Details</button>
                    <button class="btn btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    cart.items.push(product);
    cart.count = cart.items.length;
    cart.total += product.price;
    updateCartUI();
    renderCart();
}

function toggleCart() {
    if (!cartDrawer || !overlay) return;
    cartDrawer.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (cartDrawer.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function renderCart() {
    if (!cartItemsContainer) return;
    
    if (cart.items.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        if (drawerTotal) drawerTotal.textContent = 'KSh 0';
        return;
    }

    cartItemsContainer.innerHTML = cart.items.map((item, index) => `
        <div class="cart-item">
            <img src="${getProductImagePath(item.image)}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>KSh ${item.price.toLocaleString()}</p>
                <button class="remove-item" onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:0.8rem; padding:0;">Remove</button>
            </div>
        </div>
    `).join('');

    if (drawerTotal) {
        drawerTotal.textContent = `KSh ${cart.total.toLocaleString()}`;
    }
}

function removeFromCart(index) {
    const item = cart.items[index];
    cart.total -= item.price;
    cart.items.splice(index, 1);
    cart.count = cart.items.length;
    updateCartUI();
    renderCart();
}

function updateCartUI() {
    // Always re-query if elements are missing
    if (!cartCount) cartCount = document.getElementById('cart-count');
    if (!cartTotal) cartTotal = document.getElementById('cart-total');

    if (cartCount) cartCount.textContent = cart.count;

    if (cartTotal) {
        if (cart.total >= 10000) {
            const kValue = (cart.total / 1000).toFixed(0);
            cartTotal.textContent = `KSh ${kValue}k`;
        } else {
            cartTotal.textContent = `KSh ${cart.total.toLocaleString()}`;
        }
    }
}


// Cart status listener moved to initializeUI()


function openDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !modalBody || !modal) return;
    modalBody.innerHTML = `
        <div class="modal-grid">
            <div class="modal-image">
                <img src="${getProductImagePath(product.image)}" alt="${product.name}">
            </div>
            <div class="modal-info">
                <h2>${product.name}</h2>
                <p class="product-price">KSh ${product.price.toLocaleString()}</p>
                <p class="modal-description">${product.description}</p>
                <button class="btn btn-accent" onclick="addToCart(${product.id}); closeModalFunction()">Add to Cart</button>
            </div>
        </div>
    `;
    modal.style.display = "block";
}

function closeModalFunction() {
    if (modal) modal.style.display = "none";
}

// closeModal listener moved to initializeUI()
window.onclick = function (event) {
    if (modal && event.target == modal) {
        closeModalFunction();
    }
}

// overlay already declared at the top

function toggleMenu() {
    if (!navLinks || !overlay || !hamburger) return;
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
        document.body.style.overflow = 'hidden'; // Prevent scroll
    } else {
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        document.body.style.overflow = ''; // Re-enable scroll
    }
}

// hamburger listener moved to initializeUI()


// overlay listener moved to initializeUI()


// nav links listeners moved to initializeUI()


let testimonialIndex = 0;

function renderTestimonial() {
    if (!testimonialContent) return;
    const t = testimonials[testimonialIndex];
    testimonialContent.innerHTML = `
        <div class="testimonial-item">
            <div class="testimonial-card">
                <p>${t.text}</p>
                <h4>- ${t.author}</h4>
            </div>
        </div>
    `;
}

// testimonial listeners moved to initializeUI()


function init() {
    initializeUI();
    renderProducts();
    renderTestimonial();
}

try {
    init();
} catch (e) {
    console.error("Initialization error:", e);
}
