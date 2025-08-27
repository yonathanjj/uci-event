document.addEventListener('DOMContentLoaded', function() {
    // --- Code for Header Scroll Effect ---
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        // Add 'scrolled' class to header when user scrolls down
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- GSAP Animations (No changes needed here) ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl.from('.video-background', { scale: 1.2, duration: 2.5, opacity: 0.5 })
          .to('.hero-anim-item', { opacity: 1, y: 0, duration: 1, stagger: 0.15 }, "-=1.5");

    gsap.to('.video-background', {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true }
    });

    // --- Logic for Modals (No changes needed here) ---
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

    // Tab Logic
    const allTabs = document.querySelectorAll('.tab-link');
    allTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabContainer = tab.closest('.modal-body');
            if (!tabContainer) return;
            const target = tabContainer.querySelector('#' + tab.dataset.tab);
            tabContainer.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
            tabContainer.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            tab.classList.add('active');
            if (target) {
                target.classList.add('active');
            }
        });
    });

    // Intersection Observer
    const animatedElements = document.querySelectorAll('.anim-element');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Register Section Animation
    gsap.from(".register-anim", {
        scrollTrigger: {
            trigger: ".register-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
        },
        duration: 1.2,
        opacity: 0,
        y: 100,
        ease: "power3.out",
        stagger: 0.2
    });
});