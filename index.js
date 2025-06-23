document.addEventListener("DOMContentLoaded", function() {
    // Theme switching functionality
    const themeToggle = document.getElementById('theme-toggle');
    const desktopThemeToggle = document.getElementById('desktop-theme-toggle');
    
    // Function to set theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
    function handleThemeToggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }
    desktopThemeToggle.addEventListener('click', handleThemeToggle);
    themeToggle.addEventListener('click', handleThemeToggle);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    // Particles.js configuration
    tsParticles.load("particles-js", {
        fpsLimit: 60,
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },            color: {
                value: ["#4a90e2", "#61dafb"]
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#4a90e2",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });    // Smooth scrolling implementation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Remove active class from all nav links
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                // Add active class to clicked link
                this.classList.add('active');

                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                // Smooth scroll function
                const smoothScroll = (start, end, duration) => {
                    const startTime = performance.now();
                    
                    const scroll = (currentTime) => {
                        const timeElapsed = currentTime - startTime;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        // Easing function for smooth acceleration and deceleration
                        const easeInOutCubic = progress => {
                            return progress < 0.5
                                ? 4 * progress * progress * progress
                                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                        };
                        
                        const progressWithEasing = easeInOutCubic(progress);
                        const currentPosition = start + (end - start) * progressWithEasing;
                        
                        window.scrollTo(0, currentPosition);
                        
                        if (progress < 1) {
                            requestAnimationFrame(scroll);
                        }
                    };
                    
                    requestAnimationFrame(scroll);
                };

                // Start smooth scrolling with custom duration (1000ms = 1 second)
                smoothScroll(window.pageYOffset, offsetPosition, 1000);
            }
        });
    });

    // Navigation highlight on scroll
    const sections = document.querySelectorAll('section');
    const allNavLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('menu-open');
        navLinks.classList.toggle('menu-open');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('menu-open');
            navLinks.classList.remove('menu-open');
            document.body.classList.remove('no-scroll');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && navLinks.classList.contains('menu-open')) {
            menuToggle.classList.remove('menu-open');
            navLinks.classList.remove('menu-open');
            document.body.classList.remove('no-scroll');
        }
    });

    // Handle resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('menu-open');
                navLinks.classList.remove('menu-open');
                document.body.classList.remove('no-scroll');
            }
        }, 250);
    });
});