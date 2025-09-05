// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Project detail page function
function openProject(projectId) {
    // Create project detail pages
    const projectDetails = {
        project1: {
            title: "Camera Project",
            description: "An 4k camera system with custom hardware. Features high-resolution imaging, real-time processing, and custom control interfaces for professional photography applications.",
            technologies: ["Python","3D printing", "Arduino", "Hardware Design"],
            features: [
                "High-resolution image capture",
                "Custom hardware integration",
                "Custom control interfaces",
                "Python"
            ],
            images: [
                "websiteImages/camera/7AA4DC16-AB79-402F-891A-7157628E1E73.JPG",
                "websiteImages/camera/C4264E49-FFAB-461A-BA41-4950F25FFE78.JPG",
                "websiteImages/camera/E5AF912B-569A-4671-9605-450CA66A1237.JPG",
                "websiteImages/camera/FE12ADE4-52DB-478B-9EDA-B543305B533B.JPG",
                "websiteImages/camera/IMG_1294.png",
                "websiteImages/camera/IMG_1295.png",
                "websiteImages/camera/IMG_1297.png",
                "websiteImages/camera/IMG_1301.png",
                "websiteImages/camera/IMG_1306.png",
                "websiteImages/camera/IMG_1314.png",
                "websiteImages/camera/IMG_1315.png",
                "websiteImages/camera/IMG_1316.png",
                "websiteImages/camera/IMG_1319.png"
            ]
        },
        project2: {
            title: "Custom Computer Case",
            description: "A handcrafted computer case with custom design and custom cable management. Features modular design and custom cooling solutions for high-performance computing.",
            technologies: ["CAD Design", "3D Printing", "Electronics", "Thermal Management"],
            features: [
                "Custom modular design",
                "Cable management",
                "Thermal optimization",
                "Unique aesthetic design"
            ],
            images: [
                "websiteImages/ComputerCase/1000028452.JPG",
                "websiteImages/ComputerCase/1000028461.JPG",
                "websiteImages/ComputerCase/1000028470.JPG",
                "websiteImages/ComputerCase/1000028475.JPG",
                "websiteImages/ComputerCase/1000028485.JPG"
            ]
        },
        project3: {
            title: "Electric Bike Conversion",
            description: "A custom electric bike with a completely custom frame. Features motor control, single 1000W motor with a 50V accumulator.",
            technologies: ["Electronics", "Custom frame", "Motor Control", "Mechanical Design"],
            features: [
                "Custom hand-made frame",
                "Motor control",
                "Custom rear axle hub"
            ],
            images: [
                "websiteImages/eBike/IMG_2883.png",
                "websiteImages/eBike/IMG_2891.png",
                "websiteImages/eBike/IMG_2904.png",
                "websiteImages/eBike/IMG_2911.png",
                "websiteImages/eBike/IMG_2917.png",
                "websiteImages/eBike/IMG_2922.png",
                "websiteImages/eBike/IMG_2983 2.png",
                "websiteImages/eBike/IMG_3185.png",
                "websiteImages/eBike/IMG_3227.png"
            ]
        },
        project4: {
            title: "Hotswap Mechanical Mouse",
            description: "A custom mechanical mouse with hot-swappable switches and RGB lighting. Features 3D printed housing and a custom hotswap switch implementation",
            technologies: ["3D Printing", "Electronics", "Mechanical Design"],
            features: [
                "Hot-swappable mechanical switches",
                "3D printed housing",
                "hot swap mechanism"
            ],
            images: [
                "websiteImages/HotswapMouse/1000028982.JPG",
                "websiteImages/HotswapMouse/1000028992.JPG",
                "websiteImages/HotswapMouse/1000028997.JPG",
                "websiteImages/HotswapMouse/1000029640.JPG",
                "websiteImages/HotswapMouse/1000029641.JPG",
                "websiteImages/HotswapMouse/1000029643.JPG"
            ]
        },
        project5: {
            title: "Pull-Up Social Media App",
            description: "A social media of what people will do. Make organizing hangouts a breeze",
            technologies: ["Swift", "JavaScript", "Firebase", "Mobile Development"],
            features: [
                "Social Media",
                "Apple Wallet plugin",
                "Personalized recommendations",
                "Data export capabilities"
            ],
            images: [
                "websiteImages/PullUPApp/IMG_3357.PNG",
                "websiteImages/PullUPApp/IMG_3359.PNG",
                "websiteImages/PullUPApp/IMG_3360.PNG",
                "websiteImages/PullUPApp/IMG_3361.PNG",
                "websiteImages/PullUPApp/IMG_3362.PNG",
                "websiteImages/PullUPApp/IMG_3363.PNG"
            ]
        },
        project6: {
            title: "TEG Mouse Project",
            description: "A thermoelectric generator mouse with energy harvesting capabilities. Features custom thermoelectric modules, Transformer circuits",
            technologies: ["Thermoelectric Design", "Power Management", "Transformer", "Electronics"],
            features: [
                "Thermoelectric energy harvesting",
                "Transformer circuits",
                "Baterryless",
                "Sustainable electronics"
            ],
            images: [
                "websiteImages/TEGMouse/1000029237.JPG",
                "websiteImages/TEGMouse/1000029238.JPG",
                "websiteImages/TEGMouse/1000029340.JPG",
                "websiteImages/TEGMouse/1000029343.JPG",
                "websiteImages/TEGMouse/1000029353.JPG",
                "websiteImages/TEGMouse/1000030169.JPG"
            ]
        },
        project7: {
            title: "Additional Project",
            description: "Future project placeholder for additional work and ongoing development projects.",
            technologies: ["TBD", "TBD", "TBD", "TBD", "TBD"],
            features: [
                "Project details TBD",
                "Features TBD",
                "Technologies TBD",
                "Implementation TBD",
                "Testing TBD",
                "Deployment TBD"
            ],
            images: [
                "websiteImages/camera/7AA4DC16-AB79-402F-891A-7157628E1E73.JPG",
                "websiteImages/camera/C4264E49-FFAB-461A-BA41-4950F25FFE78.JPG",
                "websiteImages/camera/E5AF912B-569A-4671-9605-450CA66A1237.JPG",
                "websiteImages/camera/FE12ADE4-52DB-478B-9EDA-B543305B533B.JPG",
                "websiteImages/camera/IMG_1294.HEIC",
                "websiteImages/camera/IMG_1295.HEIC"
            ]
        }
    };
    
    const project = projectDetails[projectId];
    if (project) {
        // Create modal for project details
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${project.title}</h2>
                    <span class="close-btn">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="project-gallery">
                        <div class="gallery-scroll">
                            ${project.images.map(image => 
                                `<div class="gallery-item" style="background-image: url('${image}'); background-size: cover; background-position: center;"></div>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="project-description">
                        <p>${project.description}</p>
                    </div>
                    <div class="project-technologies">
                        <h3>Technologies Used</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="project-features">
                        <h3>Key Features</h3>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: white;
                border-radius: 15px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .modal-header h2 {
                color: #1e293b;
                font-size: 1.5rem;
            }
            
            .close-btn {
                font-size: 1.5rem;
                cursor: pointer;
                color: #64748b;
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .project-gallery {
                margin-bottom: 1.5rem;
            }
            
            .gallery-scroll {
                display: flex;
                gap: 1rem;
                overflow-x: auto;
                padding: 0.5rem 0;
                scrollbar-width: thin;
                scrollbar-color: #cbd5e1 #f1f5f9;
            }
            
            .gallery-scroll::-webkit-scrollbar {
                height: 6px;
            }
            
            .gallery-scroll::-webkit-scrollbar-track {
                background: #f1f5f9;
                border-radius: 3px;
            }
            
            .gallery-scroll::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 3px;
            }
            
            .gallery-scroll::-webkit-scrollbar-thumb:hover {
                background: #94a3b8;
            }
            
            .gallery-item {
                min-width: 240px;
                height: 160px;
                background: #e2e8f0;
                border-radius: 8px;
                flex-shrink: 0;
                border: 2px solid #cbd5e1;
            }
            
            .project-description {
                margin-bottom: 1.5rem;
            }
            
            .project-description p {
                color: #64748b;
                line-height: 1.6;
            }
            
            .project-technologies {
                margin-bottom: 1.5rem;
            }
            
            .project-technologies h3 {
                color: #1e293b;
                margin-bottom: 0.5rem;
            }
            
            .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .tech-tag {
                background: linear-gradient(135deg, #2563eb, #7c3aed);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .project-features h3 {
                color: #1e293b;
                margin-bottom: 0.5rem;
            }
            
            .project-features ul {
                list-style: none;
                padding: 0;
            }
            
            .project-features li {
                color: #64748b;
                margin-bottom: 0.5rem;
                padding-left: 1rem;
                position: relative;
            }
            
            .project-features li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: #2563eb;
                font-weight: bold;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(modalStyles);
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            modalStyles.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                modalStyles.remove();
            }
        });
    }
}

// Video opening function
function openVideo(videoUrl) {
    window.open(videoUrl, '_blank');
}

// Resume download function
function downloadResume() {
    // Create a link to download the actual PDF resume
    const a = document.createElement('a');
    a.href = 'Resume/SaejoonParkResume.pdf';
    a.download = 'Saejoon_Park_Resume.pdf';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add active class to nav links
const navLinkElements = document.querySelectorAll('.nav-link');
navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        navLinkElements.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
