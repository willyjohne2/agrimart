// Product Data - Updated to KSh
const products = [
    {
        id: 1,
        name: "Eco-Harvest Pro Tractor",
        price: 4500000,
        image: "img/tractor1.jpeg",
        description: "A high-performance, fuel-efficient tractor designed for large-scale farming. Features advanced GPS navigation and ergonomic controls."
    },
    {
        id: 2,
        name: "Wheat Master Harvester",
        price: 12000000,
        image: "img/harvester.jpg",
        description: "State-of-the-art wheat harvester with superior grain separation technology and a wide header for maximum efficiency."
    },
    {
        id: 3,
        name: "Greenfield Irrigation System",
        price: 1500000,
        image: "img/irrigation.png",
        description: "Automated smart irrigation system with soil moisture sensors and precision spray nozzles to conserve water."
    },
    {
        id: 4,
        name: "Compact Utility Tractor",
        price: 2800000,
        image: "img/tractor2.jpeg",
        description: "Versatile utility tractor perfect for small to medium farms. compatible with hundreds of attachments for all-season use."
    },
    {
        id: 5,
        name: "Industrial Hay Baler",
        price: 3500000,
        image: "img/hay.jpg",
        description: "High-density hay baler capable of producing uniform, tightly packed bales for easy storage and transport."
    },
    {
        id: 6,
        name: "Automated Milking Machine",
        price: 5500000,
        image: "img/mliking1.jpg",
        description: "Gentle and efficient automated milking system designed to maximize yield while ensuring the comfort of your livestock."
    },
    {
        id: 7,
        name: "Terrain King Tractor",
        price: 6200000,
        image: "img/tractor3.jpeg",
        description: "Heavy-duty tractor built for tough terrains. 4WD with high torque engine and reinforced chassis."
    },
    {
        id: 8,
        name: "Pro-Series Grain Harvester",
        price: 13500000,
        image: "img/harvester2.jpg",
        description: "Next-gen harvester with AI-driven harvest optimization and high-capacity grain tank for fewer stops."
    }
];

// Testimonials Data
const testimonials = [
    {
        text: "Agri-Mart has transformed our farm operations. The Eco-Harvest tractor is a beast in the field!",
        author: "John Doe, Greenfield Farms"
    },
    {
        text: "The customer service at Agri-Mart is unmatched. They helped us pick the perfect harvester for our wheat fields.",
        author: "Sarah Smith, Smith & Sons"
    },
    {
        text: "Incredible equipment. The automated milking machine has saved us countless hours every single day.",
        author: "Robert Brown, Dairy Valley"
    },
    {
        text: "Fast delivery and great maintenance support. Agri-Mart is our go-to for all agricultural machinery.",
        author: "James Wilson, Central Plains"
    }
];

// Cart State
let cart = {
    items: [],
    count: 0,
    total: 0
};

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const testimonialContent = document.getElementById('testimonial-content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const modal = document.getElementById('product-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Initialize Products
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
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

// Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.items.push(product);
    cart.count = cart.items.length;
    cart.total += product.price;
    updateCartUI();
}

function updateCartUI() {
    cartCount.textContent = cart.count;
    
    // Condensed formatting for totals over 10,000
    if (cart.total >= 10000) {
        const kValue = (cart.total / 1000).toFixed(0);
        cartTotal.textContent = `KSh ${kValue}k`;
    } else {
        cartTotal.textContent = `KSh ${cart.total.toLocaleString()}`;
    }
}

// Modal Logic
function openDetails(productId) {
    const product = products.find(p => p.id === productId);
    modalBody.innerHTML = `
        <div class="modal-grid">
            <div class="modal-image">
                <img src="${product.image}" alt="${product.name}">
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
    modal.style.display = "none";
}

closeModal.onclick = closeModalFunction;
window.onclick = function(event) {
    if (event.target == modal) {
        closeModalFunction();
    }
}

// Hamburger Toggle
hamburger.onclick = () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
};

// Close menu when clicking link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.onclick = () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').className = 'fas fa-bars';
    };
});

// Testimonial Logic
let testimonialIndex = 0;

function renderTestimonial() {
    const t = testimonials[testimonialIndex];
    testimonialContent.innerHTML = `
        <div class="testimonial-item">
            <p>"${t.text}"</p>
            <h4>- ${t.author}</h4>
        </div>
    `;
}

prevBtn.onclick = () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
};

nextBtn.onclick = () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial();
};

// Initial Render
renderProducts();
renderTestimonial();
