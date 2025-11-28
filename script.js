// Force scroll to top on reload (Immediate execution)
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Also reset on unload to be sure
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================

// ===================================
// INIT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxContent = document.getElementById('lightboxContent');

    // Clear hash if present
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }

    // Mobile Menu Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 60;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Highlight
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Initial check

    // Lightbox Functionality
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Project data for lightbox
    const projectData = {
        '1': {
            title: 'Electronics Design Lab: Robot Vehicle',
            description: 'Developed a wireless-controlled robot vehicle with comprehensive motor parameter modeling through SIMetrix simulation. Implemented integrating compensator for wheel speed regulation and programmed Arduino/ESP32 microcontrollers for wireless control via custom gyroscope-based controller with potentiometer speed control.',
            images: [
                'robot-circuit-top.jpg',
                'robot-vehicle-side.png',
                'robot-vehicle-front.png',
                'robot-circuit-angle.jpg'
            ],
            details: [
                'Determined motor parameters through SPICE simulation',
                'Implemented closed-loop control systems with PWM motor control',
                'Programmed ESP32 for Wi-Fi module integration',
                'Designed H-bridge motor driver circuit with current sensing',
                'Achieved precise encoder-based feedback control'
            ],
            tech: ['Arduino', 'ESP32', 'PWM Motor Control', 'SPICE Simulation', 'Encoder Feedback', 'Closed-Loop Control']
        },
        '2': {
            title: 'SoundNav',
            description: 'A communication system between ESP-32 boards with Bluetooth speaker integration designed to assist visually impaired individuals with accessible navigation.',
            images: ['soundnav-poster.jpg', 'soundnav-1.jpg', 'soundnav-2.jpg', 'soundnav-3.jpg', 'soundnav-4.jpg', 'soundnav-5.jpg'],
            details: [
                'Implemented ESP-NOW protocol for low-latency communication between boards.',
                'Integrated Bluetooth audio feedback for real-time navigation cues.',
                'Designed a user-friendly interface for seamless interaction.'
            ],
            tech: ['ESP32', 'Bluetooth', 'Accessibility', 'C++']
        },
        '3': {
            title: 'Smart Corsi Rosenthal Box Fan',
            description: 'Developed an advanced air purification system to improve indoor air quality. Comprehensive project detailing component selection, system integration, and performance validation for effective environmental control.',
            images: ['corsi-thumb.jpg', 'corsi-1.jpg', 'corsi-2.jpg', 'corsi-3.jpg'],
            details: [
                'Selected and integrated HEPA filters for optimal air purification',
                'Designed airflow optimization system for maximum efficiency',
                'Implemented sensor integration for real-time air quality monitoring',
                'Created system validation protocols',
                'Presented business case for sustainability impact'
            ],
            tech: ['Air Quality Sensors', 'HVAC Systems', 'IoT', 'System Design', 'Environmental Engineering']
        },
        '4': {
            title: 'Fuel Cell Testbed - Data Acquisition System',
            description: 'Engineered and deployed comprehensive data acquisition (DAQ) system for hydrogen fuel cell testbed at CU Boulder\'s Thermal Fluids Lab. Integrated thermocouple, voltage, and current input modules with NI cRIO controller, enabling real-time performance analysis for renewable energy research.',
            images: [
                'fuelcell-3d-clean.png',
                'fuelcell-poster.jpg',
                'fuelcell-pid.png',
                'fuelcell-daq.png'
            ],
            details: [
                'Designed LabVIEW interface for real-time data visualization',
                'Integrated multiple sensor types (thermocouples, voltage, current)',
                'Configured NI cRIO controller for high-speed data acquisition',
                'Validated system accuracy against benchmark measurements',
                'Enabled advanced fuel cell performance characterization'
            ],
            tech: ['LabVIEW', 'NI cRIO', 'NI MAX', 'Data Acquisition', 'Thermocouples', 'Fuel Cells', 'Renewable Energy']
        },
        '5': {
            title: 'Amply - Residential AI Compute',
            description: 'Redefining how energy and intelligence are created, starting at home. Amply pairs residential battery systems with AI compute hardware, transforming everyday houses into profitable, resilient micro-data centers that earn for their owners while stabilizing the grid.',
            images: [
                'amply-units.png',
                'amply-inside.png'
            ],
            details: [
                'Integrated residential battery systems with high-performance AI compute hardware',
                'Designed distributed computing architecture for home deployment',
                'Implemented thermal management for sustained compute performance',
                'Created profitable model subsidizing hardware through recurring compute revenue',
                'Developed system for grid stabilization through distributed energy resources'
            ],
            tech: ['AI Infrastructure', 'Energy Storage', 'Distributed Computing', 'Thermal Design', 'Grid Integration']
        },
        '6': {
            title: 'Solar Panel Data Acquisition System',
            description: 'Developed a real-time data logging system for a solar thermal testbed using Python and Arduino. Interfaced multiple K-type thermocouples and Hall-effect flow meters to monitor system performance under configurable series and parallel flow paths. Created a custom Python GUI to visualize temperature trends live and automatically export sensor data to CSV format for analysis.',
            images: [
                'solar-daq-2.png',
                'solar-daq-1.png',
                'solar-daq-3.png'
            ],
            details: [
                'Engineered a Python-based GUI logger for real-time temperature graphing and CSV data storage.',
                'Programmed Arduino to interface with MAX31855K thermocouple amplifiers via SPI protocol.',
                'Implemented precise flow rate monitoring using interrupt-based pulse counting from Hall-effect sensors.',
                'Designed a configurable hydraulic network allowing dynamic switching between series and parallel flow.',
                'Established robust serial communication for reliable data transfer between microcontroller and PC.'
            ],
            tech: ['Python', 'Arduino', 'Data Logging', 'SPI Protocol', 'Sensors', 'Tkinter GUI']
        }
    };

    // Event Delegation for Project Cards
    document.addEventListener('click', function (e) {
        const card = e.target.closest('.project-card');
        if (card) {
            console.log('Project card clicked via delegation:', card.getAttribute('data-project'));
            const projectId = card.getAttribute('data-project');
            const project = projectData[projectId];

            if (project && lightbox && lightboxContent) {
                // Build image gallery if project has images
                let imagesHTML = '';
                if (project.images && project.images.length > 0) {
                    imagesHTML = '<div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem;">';
                    project.images.forEach(imagePath => {
                        imagesHTML += `<img src="${imagePath}" alt="${project.title}" style="width: 100%; height: auto; border-radius: 4px; cursor: zoom-in;">`;
                    });
                    imagesHTML += '</div>';
                }

                // Build details list
                let detailsHTML = '<ul style="list-style-position: inside; margin: 1rem 0;">';
                project.details.forEach(detail => {
                    detailsHTML += `<li style="margin-bottom: 0.5rem;">${detail}</li>`;
                });
                detailsHTML += '</ul>';

                // Build tech tags
                let techHTML = '<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">';
                project.tech.forEach(tech => {
                    techHTML += `<span style="padding: 4px 12px; background-color: #F0F0F0; border-radius: 3px; font-size: 0.875rem;">${tech}</span>`;
                });
                techHTML += '</div>';

                lightboxContent.innerHTML = `
                    <h2 class="lightbox-title">${project.title}</h2>
                    ${imagesHTML}
                    <p class="lightbox-description">${project.description}</p>
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin: 2rem 0 1rem 0;">Key Achievements</h3>
                    ${detailsHTML}
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin: 2rem 0 1rem 0;">Technologies</h3>
                    ${techHTML}
                `;

                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Scroll lightbox to top to show all images
                setTimeout(() => {
                    lightbox.scrollTop = 0;

                    // Add click handlers to images for zoom
                    const lightboxImages = lightboxContent.querySelectorAll('img');
                    lightboxImages.forEach(img => {
                        img.style.cursor = 'zoom-in';
                        img.addEventListener('click', function (e) {
                            e.stopPropagation();
                            zoomImage(this.src);
                        });
                    });
                }, 10);
            }
        }
    });

    console.log('Portfolio loaded successfully! ✨');
});
