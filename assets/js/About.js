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
    purchaseBtn.addEventListener('click', () => {
        alert('Thank you for choosing Agrimart! Redirecting to catalog...');
    });
});