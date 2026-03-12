document.addEventListener('DOMContentLoaded', () => {
    // 1. Image Fallback Logic
    // This replaces the "ImageWithFallback" React component
    const allImages = document.querySelectorAll('.fallback-img');
    const placeholder = 'https://via.placeholder.com/400x400?text=Agrimart+Image';

    allImages.forEach(img => {
        img.addEventListener('error', () => {
            img.src = placeholder;
        });
    });

    // 2. Button Click Interaction
    const purchaseBtn = document.querySelector('.btn-purchase');
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', () => {
            alert('Thank you for choosing Agrimart! Redirecting to catalog...');
        });
    }

    // 3. Gallery Modal Logic
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalBody = document.getElementById('gallery-modal-body');
    const closeGalleryModal = document.querySelector('#gallery-modal .close-modal');

    if (galleryItems.length > 0 && galleryModal) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('h3').innerText;
                const desc = item.querySelector('p').innerText;

                if (galleryModalBody) {
                    galleryModalBody.innerHTML = `
                        <div class="modal-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                            <div class="modal-image">
                                <img src="${img.src}" alt="${title}" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                            </div>
                            <div class="modal-info">
                                <h2 style="color: var(--dark-green); margin-bottom: 1rem; font-size: 2rem;">${title}</h2>
                                <p style="font-size: 1.1rem; line-height: 1.6; color: #444; margin-bottom: 1.5rem;">${desc}</p>
                                <div style="background: #f9f9f9; padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--accent-orange);">
                                    <h4 style="margin-bottom: 0.5rem; color: var(--dark-green);">Performance Excellence</h4>
                                    <p style="font-size: 0.95rem; color: #666; font-style: italic;">
                                        This industrial-grade machinery is engineered for high-efficiency agricultural operations. 
                                        It features reinforced components and optimized power delivery, ensuring maximum durability 
                                        and peak performance even in the most demanding field conditions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                galleryModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        const closeGallery = () => {
            galleryModal.style.display = 'none';
            document.body.style.overflow = '';
        };

        if (closeGalleryModal) closeGalleryModal.onclick = closeGallery;

        window.addEventListener('click', (event) => {
            if (event.target == galleryModal) {
                closeGallery();
            }
        });
    }
});