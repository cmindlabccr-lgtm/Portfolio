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
            const isKinetik = btn.getAttribute('data-kinetik') === 'true';
            const isIronLog = videoSrc && videoSrc.includes('Ironlog');

            // Adjust Modal Layout based on project type
            const modalLayout = modal.querySelector('.modal-layout');
            const infoCol = modal.querySelector('.modal-info-col');

            if (isIronLog || isKinetik) {
                modalLayout.style.gridTemplateColumns = '1.2fr 1fr';
                infoCol.style.display = 'block';
            } else {
                modalLayout.style.gridTemplateColumns = '1fr';
                infoCol.style.display = 'none';
            }

            // Populate Info Column dynamically based on project
            if (isIronLog) {
                infoCol.innerHTML = `
                    <h3>IronLog: El Diario Definitivo</h3>
                    <p class="modal-subtitle">Desarrollo Web / AI Gamification</p>
                    <div class="feature-list">
                        <div class="feature-item">
                            <i class="ph ph-notebook"></i>
                            <div>
                                <h4>Gestión Total</h4>
                                <p>Diario inteligente con RPE, rutinas dinámicas (guardar/cargar plantillas), cronómetro flotante y buscador de ejercicios.</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <i class="ph ph-chart-line-up"></i>
                            <div>
                                <h4>Análisis y Datos</h4>
                                <p>Radar de volumen muscular, mapa de calor de constancia anual, detector de PRs y gráficas de evolución.</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <i class="ph ph-sword"></i>
                            <div>
                                <h4>Gamificación RPG</h4>
                                <p>Sistema de puntos de experiencia (XP) y niveles para tu "Avatar de Atleta" basados en el volumen levantado.</p>
                            </div>
                        </div>
                    </div>
                `;
            } else if (isKinetik) {
                infoCol.innerHTML = `
                    <h3>Kinetik: Magia en CSS Puro</h3>
                    <p class="modal-subtitle">Creative Coding & Rendimiento</p>
                    <div class="feature-list">
                        <div class="feature-item">
                            <i class="ph ph-drop"></i>
                            <div>
                                <h4>Efecto "Metal Líquido"</h4>
                                <p>El truco: Se combinan manchas de color borrosas (blur) con un filtro SVG de Matriz de Color de altísimo contraste. Al superponerse obligan al navegador a "fundir" los bordes.</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <i class="ph ph-lightning"></i>
                            <div>
                                <h4>0% Imágenes / 0% Vídeos</h4>
                                <p>A diferencia de otras webs de lujo que usan pesados clips en bucle, esto pesa literalmente unos pocos *kilobytes* calculados en tiempo real por el procesador gráfico (GPU).</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <i class="ph ph-file-js"></i>
                            <div>
                                <h4>Sin Librerías JS</h4>
                                <p>Tampoco se usan herramientas externas como Three.js o WebGL. El movimiento orgánico (la danza de los blobs) se logra entrelazando 4 animaciones "@keyframes" con tiempos primos asimétricos para que nunca se repita igual.</p>
                            </div>
                        </div>
                    </div>
                `;
            }

            // Clear previous media
            mediaContainer.innerHTML = '';

            // Inject Image or Video or Kinetik Art
            if (isKinetik) {
                const kinetikHTML = `
                    <div class="fluid-art-wrapper" style="width: 100%; height: 100%; min-height: 60vh; border-radius: 20px;">
                        <svg style="visibility: hidden; position: absolute;" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <filter id="goo2">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo2" />
                                    <feComposite in="SourceGraphic" in2="goo2" operator="atop"/>
                                </filter>
                            </defs>
                        </svg>
                        <div class="fluid-background" style="filter: url('#goo2');">
                            <div class="blob blob-1"></div>
                            <div class="blob blob-2"></div>
                            <div class="blob blob-3"></div>
                            <div class="blob blob-4"></div>
                        </div>
                        <div class="fluid-glass" style="transform: scale(1.2);">
                            <h4 class="fluid-text">KINETIK</h4>
                        </div>
                    </div>
                `;
                mediaContainer.innerHTML = kinetikHTML;
                // Add entry class to the newly created wrapper
                setTimeout(() => {
                    mediaContainer.querySelector('.fluid-art-wrapper').classList.add('modal-media-entry');
                }, 50);
            } else if (videoSrc) {
                const videoElement = document.createElement('video');
                videoElement.id = 'demo-player';
                videoElement.controls = true;
                videoElement.autoplay = true;
                videoElement.style.width = '100%';
                videoElement.style.maxHeight = '85vh';
                videoElement.style.display = 'block';
                videoElement.classList.add('modal-media-entry');
                const sourceElement = document.createElement('source');
                sourceElement.src = videoSrc;
                sourceElement.type = 'video/mp4';
                videoElement.appendChild(sourceElement);
                mediaContainer.appendChild(videoElement);
            } else if (imgSrc) {
                const imgElement = document.createElement('img');
                imgElement.src = imgSrc;
                imgElement.style.width = '100%';
                imgElement.style.height = 'auto';
                imgElement.style.maxHeight = '85vh';
                imgElement.style.objectFit = 'contain';
                imgElement.style.display = 'block';
                imgElement.classList.add('modal-media-entry');
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

    // 6. 3D Parallax Logic for Éxodo Card
    const exodoCard = document.querySelector('.project-link[data-exodo="true"]')?.closest('.project-card');
    if (exodoCard) {
        exodoCard.classList.add('parallax-card');
        const wrapper = exodoCard.querySelector('.project-img-wrapper');

        exodoCard.addEventListener('mousemove', (e) => {
            const rect = exodoCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Normalize coordinates to -1 to 1
            const xc = (x - rect.width / 2) / (rect.width / 2);
            const yc = (y - rect.height / 2) / (rect.height / 2);

            // Set rotation values (max 10deg)
            const rotateX = -yc * 10;
            const rotateY = xc * 10;

            // Apply transform to the wrapper
            wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Set CSS variables for the shine effect
            wrapper.style.setProperty('--px', `${x}px`);
            wrapper.style.setProperty('--py', `${y}px`);
        });

        // Reset on mouse leave
        exodoCard.addEventListener('mouseleave', () => {
            wrapper.style.transform = `rotateX(0) rotateY(0)`;
        });
    }

    // ==========================================
    // 7. PromptForge Logic
    // ==========================================
    const modeBtns = document.querySelectorAll('.mode-btn');
    const pfForms = document.querySelectorAll('.pf-form');
    const resultText = document.getElementById('pf-result-text');
    const copyBtn = document.getElementById('pf-copy-btn');

    // Switch Modes
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Hide all forms, show selected
            const mode = btn.getAttribute('data-mode');
            pfForms.forEach(form => form.classList.remove('active-form'));
            document.getElementById(`${mode}-prompt-form`).classList.add('active-form');

            // Reset output
            resultText.textContent = "Esperando nueva configuración...";
            resultText.style.color = 'var(--text-secondary)';
            copyBtn.disabled = true;
        });
    });

    // Helper: Typewriter Effect
    function typeWriterEffect(text, element, speed = 10) {
        element.textContent = '';
        element.style.color = 'var(--accent-glow)';
        let i = 0;
        element.classList.add('typing-cursor');

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing-cursor');
                element.style.color = '#e5e5e5'; // Final color
                copyBtn.disabled = false;
            }
        }
        type();
    }

    // Generator Functions (Based on the Gem Architecture)

    // TEXT PROMPT
    document.getElementById('text-prompt-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const rol = document.getElementById('text-rol').value.trim();
        const obj = document.getElementById('text-obj').value.trim();
        const context = document.getElementById('text-context').value.trim();
        const constraints = document.getElementById('text-constraints').value.trim();
        const format = document.getElementById('text-format').value.trim();

        let prompt = `[ROLES Y CONTEXTO]\nActúa como un experto: ${rol}.\nTu perfil requiere respuestas precisas, profesionales y detalladas, evitando el lenguaje genérico o disculpas previas.\n\n[OBJETIVO PRINCIPAL]\nDebes realizar la siguiente tarea:\n${obj}\n`;

        if (context) prompt += `\n[CONTEXTO DEL PROYECTO]\n${context}\n`;
        if (constraints) prompt += `\n[RESTRICCIONES Y LIMITACIONES]\nCumple estrictamente con las siguientes reglas:\n- ${constraints}\n`;

        prompt += `\n[FORMATO DE SALIDA]\n${format ? format : 'Utiliza un formato Markdown estructurado, con uso de formato para resaltar conceptos clave y separar claramente las secciones.'}\n\n[INSTRUCCIONES ADICIONALES]\nAntes de generar la respuesta final, realiza un breve análisis paso a paso de tu enfoque. Asegúrate de adaptar tu tono al rol indicado, tal como dictan las mejores prácticas de Prompt Engineering.`;

        typeWriterEffect(prompt, resultText);
    });

    // CODE PROMPT
    document.getElementById('code-prompt-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const lang = document.getElementById('code-lang').value.trim();
        const obj = document.getElementById('code-obj').value.trim();
        const inputs = document.getElementById('code-inputs').value.trim();
        const conditions = document.getElementById('code-conditions').value.trim();
        const isCot = document.getElementById('code-cot').checked;

        let prompt = `[ROL TÉCNICO]\nEres un Desarrollador de Software Senior y Arquitecto de Sistemas experto en: ${lang}.\nTu código debe seguir los principios SOLID, Clean Code y debe estar completamente preparado para entornos de producción.\n\n[OBJETIVO DEL DESARROLLO]\n${obj}\n`;

        if (inputs) prompt += `\n[ENTRADAS Y ESTRUCTURAS DE DATOS]\n${inputs}\n`;
        if (conditions) prompt += `\n[EDGE CASES Y MANEJO DE ERRORES]\nPresta especial atención y solventa los siguientes puntos críticos:\n- ${conditions}\n`;

        if (isCot) prompt += `\n[RAZONAMIENTO: CHAIN OF THOUGHT]\nIMPORTANTE: Antes de escribir el bloque de código, añade una sección <razonamiento> donde expliques mentalmente paso a paso cómo vas a resolver el problema, qué estructuras de datos elegirás, cuál será su complejidad algorítmica y por qué.\n`;

        prompt += `\n[FORMATO ESPERADO]\n- Código fuente implementado de forma modular (evita archivos masivos).\n- Comentarios explicativos solo en la lógica compleja de negocio.\n- Breves instrucciones de cómo ejecutar/instalar/testear la solución.`;

        typeWriterEffect(prompt, resultText);
    });

    // AUDIOVISUAL PROMPT
    document.getElementById('av-prompt-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = document.getElementById('av-subject').value.trim();
        const action = document.getElementById('av-action').value.trim();
        const style = document.getElementById('av-style').value;
        const context = document.getElementById('av-context').value.trim();
        const lighting = document.getElementById('av-lighting').value;
        const lens = document.getElementById('av-lens').value;
        const mood = document.getElementById('av-mood').value.trim();

        let prompt = `[SUBJECT & ACTION]\n${subject}, ${action}.\n`;
        prompt += `\n[SETTING & CONTEXT]\n${context ? context : '(Contexto ambiguo o abstracto)'}.\n`;
        prompt += `\n[CINEMATOGRAPHY & LIGHTING]\n- Lighting: ${lighting}\n- Lens & Camera: ${lens}\n`;
        prompt += `\n[STYLE & MOOD]\n- Aesthetic: ${style}\n- Atmosphere: ${mood ? mood : 'Cinematográfico, profundo'}\n`;
        prompt += `\n[QUALITY & RENDER TAGS]\nRAW photo, masterpiece, hyper-realistic, highly detailed, photorealistic, cinematic composition, breathtaking, award-winning photography, volumetric lighting, HDR --v 6.1 --ar 16:9 --style raw`;

        typeWriterEffect(prompt, resultText);
    });

    // Copy to Clipboard
    copyBtn.addEventListener('click', () => {
        const textToCopy = resultText.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="ph ph-check"></i> Copiado';
            copyBtn.style.color = 'var(--accent-color)';
            copyBtn.style.borderColor = 'var(--accent-color)';

            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.color = '';
                copyBtn.style.borderColor = '';
            }, 2000);
        });
    });

});
