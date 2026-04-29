document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins if available
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        
        // 3. 3D Reveal on Scroll for Sections
        const fadeElements = document.querySelectorAll('.fade-top, .fade-left, .fade-right, .portfolio__single, .offer__cta-single, .blog__single');
        fadeElements.forEach((elem) => {
            gsap.fromTo(elem, 
                { 
                    y: 60, 
                    opacity: 0, 
                    rotationX: -15, 
                    transformPerspective: 1000 
                },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 1.2,
                    ease: "power3.out"
                }
            );
        });

        // 5. Titles Text Reveal 3D (Exclude banner lines to avoid breaking nested spans)
        const titles = document.querySelectorAll('.title-anim');
        if (typeof SplitText !== "undefined") {
            titles.forEach(title => {
                const split = new SplitText(title, { type: "chars,words" });
                gsap.from(split.chars, {
                    opacity: 0,
                    y: 50,
                    rotationX: -90,
                    stagger: 0.02,
                    duration: 1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 90%"
                    }
                });
            });
        }

        // Advanced sequenced animation for the Hero section
        const heroBadge = document.querySelector('.banner__badge');
        const bannerLines = document.querySelectorAll('.banner__title .line');
        const heroDesc = document.querySelector('.banner__description');
        const heroCtas = document.querySelectorAll('.banner__cta a');
        const heroStats = document.querySelectorAll('.banner__stat');

        if (bannerLines.length > 0) {
            // Override the default CSS animations
            gsap.set([heroBadge, heroDesc, '.banner__cta', '.banner__stats'], { animation: "none", opacity: 0 });

            const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

            if (heroBadge) heroTl.to(heroBadge, { y: -10, opacity: 1, duration: 0.8 }, 0.2);
            
            heroTl.fromTo(bannerLines, 
                { opacity: 0, y: 50, rotationX: -45 },
                { opacity: 1, y: 0, rotationX: 0, stagger: 0.15, duration: 1.2 },
                "-=0.5"
            );

            if (heroDesc) {
                heroTl.fromTo(heroDesc, 
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1 },
                    "-=0.8"
                );
            }

            if (heroCtas.length > 0) {
                heroTl.fromTo(heroCtas, 
                    { opacity: 0, y: 20, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.5)" },
                    "-=0.7"
                );
            }

            if (heroStats.length > 0) {
                heroTl.fromTo(heroStats, 
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, stagger: 0.15, duration: 0.8 },
                    "-=0.6"
                );

                // Number Counter Animation for Stats
                const statNumbers = document.querySelectorAll('.banner__stat-number');
                statNumbers.forEach(stat => {
                    // Extract text (e.g. "17+")
                    const rawText = stat.innerText.trim();
                    const targetNumber = parseInt(rawText.replace(/[^0-9]/g, ''));
                    const suffixMatch = rawText.match(/[^0-9]+/);
                    const suffix = suffixMatch ? suffixMatch[0] : '';
                    
                    if (!isNaN(targetNumber)) {
                        let counter = { val: 0 };
                        gsap.to(counter, {
                            val: targetNumber,
                            duration: 2.5,
                            ease: "power3.out",
                            delay: 1.2, // start after timeline reveals stats
                            onUpdate: function() {
                                stat.innerHTML = Math.ceil(counter.val) + '<span>' + suffix + '</span>';
                            }
                        });
                    }
                });
            }
        }
    }

    // 1. Magnetic Buttons
    const magneticElements = document.querySelectorAll('.btn, .btn-hero-primary, .btn-hero-secondary, .social a, .portfolio__single-content a, .btn--primary, .btn--secondary, .btn--tertiary');
    magneticElements.forEach((elem) => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            if (typeof gsap !== "undefined") {
                gsap.to(elem, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.6,
                    ease: "power3.out"
                });
            } else {
                elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            }
        });

        elem.addEventListener('mouseleave', () => {
            if (typeof gsap !== "undefined") {
                gsap.to(elem, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)"
                });
            } else {
                elem.style.transform = `translate(0px, 0px)`;
            }
        });
    });

    // 2. Parallax and 3D Floating Elements in Banner
    const floatCards = document.querySelectorAll('.banner__float-card');
    const mainImage = document.querySelector('.banner__image-main img');
    const orbitRing = document.querySelector('.banner__orbit');
    
    if (document.querySelector('.banner')) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

            if (typeof gsap !== "undefined") {
                if (mainImage) {
                    gsap.to(mainImage, {
                        rotationY: xAxis,
                        rotationX: yAxis,
                        duration: 1.5,
                        ease: "power2.out"
                    });
                }
                
                floatCards.forEach((card, index) => {
                    const depth = (index + 1) * 2;
                    gsap.to(card, {
                        x: xAxis * depth,
                        y: yAxis * depth,
                        duration: 2,
                        ease: "power2.out"
                    });
                });

                if (orbitRing) {
                    gsap.to(orbitRing, {
                        x: xAxis * -1,
                        y: yAxis * -1,
                        duration: 2,
                        ease: "power2.out"
                    });
                }
            }
        });
    }

    // 4. Advanced Particles in Background
    const particleContainer = document.querySelector('.animated-bg');
    if (particleContainer && !document.querySelector('#premium-canvas')) {
        const canvas = document.createElement('canvas');
        canvas.id = 'premium-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.5';
        particleContainer.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = window.innerWidth > 768 ? 60 : 30;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                color: Math.random() > 0.5 ? '#6c63ff' : '#e91e63' // purple or pink
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Draw lines between close particles
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(108, 99, 255, ${1 - distance/120})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(drawParticles);
        }

        drawParticles();

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }

    // 6. Dynamic Circle Light on Cards (Requested Animation)
    const cards = document.querySelectorAll('.portfolio__single, .offer__cta-single, .blog__single, .banner__float-card, .service-f-single, .service-t__slider-single, .project-info-card');
    cards.forEach(card => {
        // Create circle light element
        const light = document.createElement('span');
        light.classList.add('circleLight');
        
        // Ensure card content is relative so light can be absolute
        card.style.position = 'relative';
        card.style.overflow = 'hidden'; // Important so light doesn't spill out
        card.appendChild(light);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            light.style.opacity = '0.5';
            light.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4), transparent 60%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            light.style.opacity = '0';
        });
    });
});
