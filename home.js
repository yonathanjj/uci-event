document.addEventListener('DOMContentLoaded', function() {
    // --- Code for Header and Hero ---
    const header = document.querySelector('.main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // --- GSAP Animations for HERO SECTION ONLY ---
    gsap.registerPlugin(ScrollTrigger);
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl.from('.video-background', { scale: 1.2, duration: 2.5, opacity: 0.5 })
          .to('.hero-anim-item', { opacity: 1, y: 0, duration: 1, stagger: 0.15 }, "-=1.5");
    gsap.to('.video-background', {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true }
    });

    // --- Logic for Modals ---
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const body = document.body;

    const openModal = (modal) => {
        if (modal == null) return;
        modal.classList.add('active');
        body.style.overflow = 'hidden';
        gsap.from(modal.querySelector('.modal'), { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.out' });
    };

    const closeModal = (modal) => {
        if (modal == null) return;
        gsap.to(modal.querySelector('.modal'), {
            opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in',
            onComplete: () => {
                modal.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) { closeModal(overlay); }
        });
    });

    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector('#' + tab.dataset.tab);
            tabContents.forEach(tc => tc.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            target.classList.add('active');
        });
    });

    // --- Intersection Observer for CSS Animations on Scroll ---
    const animatedElements = document.querySelectorAll('.anim-element');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing after it's visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});



// --- GSAP Animation for Register & Footer Section ---

gsap.from(".register-anim", {
    scrollTrigger: {
        trigger: ".register-section",
        start: "top 80%", // Starts when the top of the section is 80% down the viewport
        toggleActions: "play none none reverse", // Plays on enter, reverses on scroll up
    },
    duration: 1.2,
    opacity: 0,
    y: 100, // Animate from 100px below
    ease: "power3.out",
    stagger: 0.2 // Animates the content and footer one after the other
});