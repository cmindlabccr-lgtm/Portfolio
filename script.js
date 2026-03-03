document.addEventListener('DOMContentLoaded', () => {

    // 0. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Toggle body scroll lock when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // 1. Intersection Observer for Scroll Reveals
    const fadeElements = document.querySelectorAll('.section-header, .service-card, .project-card, .about-text, .contact-card');

    // Add base fade-in class
    fadeElements.forEach((el, index) => {
        el.classList.add('fade-in');
        // Add stagger for grid items
        if (el.classList.contains('service-card') || el.classList.contains('project-card')) {
            const delay = (index % 4) + 1; // Assuming max 4 cols
            el.classList.add(`stagger-delay-${delay}`);
        }
    });

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 3. Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Modal Logic for Video/Image Demos
    const modal = document.getElementById('video-modal');
    const openBtns = document.querySelectorAll('.open-modal');
    const closeBtn = document.querySelector('.close-modal');
    const mediaContainer = document.getElementById('media-container');

    // Open Modal
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const videoSrc = btn.getAttribute('data-video');
            const imgSrc = btn.getAttribute('data-image');
            const isIronLog = videoSrc && videoSrc.includes('Ironlog');

            // Adjust Modal Layout based on project type
            const modalLayout = modal.querySelector('.modal-layout');
            const infoCol = modal.querySelector('.modal-info-col');

            if (isIronLog) {
                modalLayout.style.gridTemplateColumns = '1.2fr 1fr';
                infoCol.style.display = 'block';
            } else {
                modalLayout.style.gridTemplateColumns = '1fr';
                infoCol.style.display = 'none';
            }

            // Clear previous media
            mediaContainer.innerHTML = '';

            // Inject Image or Video
            if (videoSrc) {
                const videoElement = document.createElement('video');
                videoElement.id = 'demo-player';
                videoElement.controls = true;
                videoElement.preload = 'metadata';
                videoElement.innerHTML = `<source src="${videoSrc}" type="video/mp4">Tu navegador no soporta la etiqueta de vídeo.`;
                mediaContainer.appendChild(videoElement);

                // Auto-play the demo video when opened
                setTimeout(() => {
                    videoElement.play().catch(e => console.log("Can't auto-play demo", e));
                }, 300);
            } else if (imgSrc) {
                const imgElement = document.createElement('img');
                imgElement.src = imgSrc;
                imgElement.style.width = '100%';
                imgElement.style.height = 'auto';
                imgElement.style.maxHeight = '85vh';
                imgElement.style.objectFit = 'contain';
                imgElement.style.display = 'block';
                mediaContainer.appendChild(imgElement);
            }

            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Modal functions
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
        const videoPlayer = document.getElementById('demo-player');
        if (videoPlayer) videoPlayer.pause(); // Pause video when closing
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close if clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    console.log("AI Portfolio loaded with animations and modal suport.");

    // 5. Custom Luxury Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card, .close-modal');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorFollower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorFollower.classList.remove('active');
            });
        });
    }
});
