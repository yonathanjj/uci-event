document.addEventListener('DOMContentLoaded', function() {
    // --- Code for Header Scroll Effect & Hamburger Menu ---
    const header = document.querySelector('.main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const fanZonePrompt = document.querySelector('.fan-zone-prompt'); // <-- CHANGED: Now we select the text, not the container

    // Adds a background to the header on scroll
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Event listener to open/close the mobile menu overlay
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        fanZonePrompt.classList.toggle('hidden'); // <-- CHANGED: We now hide the text only
    });

    // Event listener to close the menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active') && link.getAttribute('target') !== '_blank') {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                fanZonePrompt.classList.remove('hidden'); // <-- CHANGED: We show the text again
            }
        });
    });



   // --- Logic for Modals with Integrated Slideshows ---
   const openModalButtons = document.querySelectorAll('[data-modal-target]');
   const closeModalButtons = document.querySelectorAll('.close-modal');
   const body = document.body;

   /**
    * Starts all slideshows within a specific modal.
    * @param {HTMLElement} modal The modal element that has been opened.
    */
   const startSlideshows = (modal) => {
       const slideshows = modal.querySelectorAll('.slideshow-container');
       slideshows.forEach(container => {
           const slides = container.querySelectorAll('.slide');
           // Don't start a slideshow if there's only one image or none
           if (slides.length <= 1) return;

           let currentIndex = 0;
           // Store the interval ID on the element itself so we can find and clear it later
           container.dataset.intervalId = setInterval(() => {
               slides[currentIndex].classList.remove('active');
               // Use the modulo operator to loop back to the start
               currentIndex = (currentIndex + 1) % slides.length;
               slides[currentIndex].classList.add('active');
           }, 3000); // 3 seconds per slide
       });
   };

   /**
    * Stops all running slideshows within a specific modal.
    * @param {HTMLElement} modal The modal element that is being closed.
    */
   const stopSlideshows = (modal) => {
       const slideshows = modal.querySelectorAll('.slideshow-container');
       slideshows.forEach(container => {
           // Check if an interval was stored on this container
           if (container.dataset.intervalId) {
               clearInterval(container.dataset.intervalId);
               delete container.dataset.intervalId; // Clean up the stored ID
           }
       });
   };

   /**
    * Opens a modal and starts its slideshows.
    * @param {HTMLElement} modal The modal element to open.
    */
   const openModal = (modal) => {
       if (modal == null) return;
       modal.classList.add('active');
       body.style.overflow = 'hidden';
       gsap.from(modal.querySelector('.modal'), { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.out' });
       startSlideshows(modal); // Start slideshows when modal opens
   };

   /**
    * Closes a modal and stops its slideshows.
    * @param {HTMLElement} modal The modal element to close.
    */
   const closeModal = (modal) => {
       if (modal == null) return;
       stopSlideshows(modal); // Stop slideshows before closing animation
       gsap.to(modal.querySelector('.modal'), {
           opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in',
           onComplete: () => {
               modal.classList.remove('active');
               body.style.overflow = 'auto';
               // Reset the modal's inline styles for the next time it opens
               gsap.set(modal.querySelector('.modal'), { clearProps: "all" });
           }
       });
   };

   // --- Event Listeners for Modals ---
   openModalButtons.forEach(button => {
       button.addEventListener('click', () => {
           const modal = document.querySelector(button.dataset.modalTarget);
           if (button.hasAttribute('data-modal-switch')) {
               const currentModal = button.closest('.modal-overlay');
               closeModal(currentModal);
               setTimeout(() => { openModal(modal); }, 300); // Wait for close animation
           } else {
               openModal(modal);
           }
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


   // --- Tab Logic to handle nested tabs ---
   const allTabs = document.querySelectorAll('.tab-link');

   allTabs.forEach(tab => {
       tab.addEventListener('click', () => {
           const tabGroup = tab.closest('.tabs');
           if (!tabGroup) return;

           const contentWrapper = tabGroup.nextElementSibling;
           if (!contentWrapper || !contentWrapper.classList.contains('tab-content-wrapper')) {
               console.error("Tab content wrapper not found!");
               return;
           }

           const targetId = tab.dataset.tab;
           const targetContent = contentWrapper.querySelector('#' + targetId);

           // Deactivate all tabs and content within the same group
           tabGroup.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
           contentWrapper.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));

           // Activate the clicked tab and its corresponding content
           tab.classList.add('active');
           if (targetContent) {
               targetContent.classList.add('active');
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