window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

// jQuery code
$(document).ready(function () {
    // Show or hide the button based on scroll position
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#scrollToTopBtn').fadeIn();
        } else {
            $('#scrollToTopBtn').fadeOut();
        }
    });

    // Scroll to top when the button is clicked
    $('#scrollToTopBtn').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
});


// Animation
function handleAnimation(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const animationClass = entry.target.dataset.animation;
            entry.target.classList.add(animationClass);
            entry.target.classList.remove('hidden');
            observer.unobserve(entry.target);
        }
    });
}

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver(handleAnimation, options);
const targets = document.querySelectorAll('.animate__animated');

targets.forEach((target) => {
    observer.observe(target);
});