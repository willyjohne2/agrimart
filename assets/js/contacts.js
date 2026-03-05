// Mobile menu toggle
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// Form validation
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return phone === '' || /^[\d\s\+\-\(\)]{10,}$/.test(phone.replace(/\s/g, ''));
}

function submitForm() {
    let isValid = true;

    // Get elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Get groups
    const nameGroup = document.getElementById('nameGroup');
    const emailGroup = document.getElementById('emailGroup');
    const phoneGroup = document.getElementById('phoneGroup');
    const subjectGroup = document.getElementById('subjectGroup');
    const messageGroup = document.getElementById('messageGroup');

    // Reset errors
    [nameGroup, emailGroup, phoneGroup, subjectGroup, messageGroup].forEach(group => {
        if (group) group.classList.remove('error');
    });

    // Validate
    if (!name.value.trim()) {
        nameGroup.classList.add('error');
        isValid = false;
    }

    if (!validateEmail(email.value.trim())) {
        emailGroup.classList.add('error');
        isValid = false;
    }

    if (phone.value.trim() && !validatePhone(phone.value.trim())) {
        phoneGroup.classList.add('error');
        isValid = false;
    }

    if (!subject.value) {
        subjectGroup.classList.add('error');
        isValid = false;
    }

    if (!message.value.trim()) {
        messageGroup.classList.add('error');
        isValid = false;
    }

    // If valid, show success
    if (isValid) {
        document.getElementById('successMessage').style.display = 'block';
        
        // Clear form
        name.value = '';
        email.value = '';
        phone.value = '';
        subject.value = '';
        message.value = '';

        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);
    }

    return false;
}