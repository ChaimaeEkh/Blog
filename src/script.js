document.addEventListener('DOMContentLoaded', () => {
    // Fixed Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('mobile-menu-active');
        document.body.style.overflow = 'hidden';
    });

    function closeMenuHandler() {
        mobileMenu.classList.remove('mobile-menu-active');
        document.body.style.overflow = '';
    }

    closeMenu.addEventListener('click', closeMenuHandler);
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenuHandler);
    });

    // Initialize Typed.js
    new Typed('#typed-output', {
        strings: [
            'Innovate Forward',
            'Transform Tomorrow',
            'Lead Technology'
        ],
        typeSpeed: 80,
        backSpeed: 40,
        loop: true
    });

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Scroll Progress Indicator
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-indicator').style.width = scrolled + '%';
    });

    // Animate elements on scroll
    gsap.utils.toArray('.tech-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Animate featured posts
    gsap.utils.toArray('.featured-post').forEach(post => {
        gsap.from(post, {
            scrollTrigger: {
                trigger: post,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
});