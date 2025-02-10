// Navigation
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize EmailJS
(function() {
    // Replace with your actual EmailJS public key
    emailjs.init("zWP947vPiozE1VmdkgpPu");
})();

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Get form data
        const templateParams = {
            from_name: document.getElementById('name').value.trim(),
            from_email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim(),
            to_name: 'Koteswararao',
            to_email: 'ayinalakoteswararao@gmail.com'
        };

        try {
           // Send email using EmailJS
           await emailjs.send('service_79m9hylD', 'template_29mowsoD', templateParams);
            
            // Show success message
            const successMessage = document.getElementById('success-message');
            successMessage.classList.add('show-message');
            
            // Clear form
            contactForm.reset();
            
            // Redirect to thanks page
            setTimeout(() => {
                window.location.href = 'thanks.html';
            }, 2000);

        } catch (error) {
            // Handle error
            console.error('EmailJS Error:', error);
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) {
                errorMessage.textContent = 'Failed to send message. Please try again later.';
                errorMessage.classList.add('show-message');
                
                setTimeout(() => {
                    errorMessage.classList.remove('show-message');
                }, 5000);
            }
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Scroll animations
const fadeInOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize
window.addEventListener('load', () => {
    navSlide();
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Initial check
});

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Add some animation to the hero section
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 200);
}

// Typing Animation
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
    "Full Stack Developer",
    "AI & ML Engineer",
    "Web Developer",
    "Problem Solver"
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// Certificate Modal Functionality (only for image certificates)
const modal = document.getElementById('certModal');
const certImage = document.getElementById('certImage');
const closeModal = document.querySelector('.close-modal');

function openCertificate(imagePath) {
    // Only handle image certificates
    if (imagePath.endsWith('.jpg') || imagePath.endsWith('.png')) {
        modal.style.display = 'block';
        certImage.src = imagePath;
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeCertificateModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        certImage.src = '';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close modal when clicking close button
closeModal.addEventListener('click', closeCertificateModal);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeCertificateModal();
    }
});

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeCertificateModal();
    }
});
