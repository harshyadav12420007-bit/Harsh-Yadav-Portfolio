/* ===== PRELOADER DISMISSAL ===== */
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("fade-out");
            // Trigger GSAP Load Animations after preloader fades out
            if (typeof initGSAPAnimations === "function") {
                initGSAPAnimations();
            }
        }, 500);
    }
});

/* ===== TYPING ANIMATION ===== */
const roles = ["Graphic Designer", "Web Designer", "UI/UX Designer", "Frontend Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 60;
const delayBetweenRoles = 2000;

function typeEffect() {
    const typingElement = document.querySelector(".typing");
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetweenRoles);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    initAnimeJSInteractions();
});

/* ===== GSAP SCROLLTRIGGER & HERO ANIMATIONS ===== */
function initGSAPAnimations() {
    if (typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    // --- 1. HERO SECTION GSAP ANIMATIONS (ON LOAD) ---
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl
        .from(".aside", {
            x: -100,
            opacity: 0,
            duration: 1
        })
        .from(".hello", {
            y: -40,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".my-profession", {
            x: -50,
            opacity: 0,
            duration: 0.8
        }, "-=0.5")
        .from(".home-info p", {
            y: 30,
            opacity: 0,
            duration: 0.7
        }, "-=0.5")
        .from(".home-info .btn", {
            scale: 0.7,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.8)"
        }, "-=0.4")
        .from(".img-frame img", {
            x: 80,
            opacity: 0,
            scale: 0.9,
            duration: 1
        }, "-=0.9")
        .from(".frame-corner.top-left", {
            x: -30,
            y: -30,
            opacity: 0,
            duration: 0.7
        }, "-=0.5")
        .from(".frame-corner.bottom-right", {
            x: 30,
            y: 30,
            opacity: 0,
            duration: 0.7
        }, "-=0.7");

    if (typeof ScrollTrigger === "undefined") return;

    // --- 2. ABOUT SECTION GSAP ANIMATIONS (ON SCROLL) ---
    gsap.utils.toArray(".section-title h2").forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    gsap.from(".about-text", {
        scrollTrigger: {
            trigger: ".about-text",
            start: "top 85%"
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out"
    });

    gsap.from(".personal-info .info-item", {
        scrollTrigger: {
            trigger: ".personal-info",
            start: "top 80%"
        },
        opacity: 0,
        x: -40,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
    });

    gsap.utils.toArray(".progress-in").forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = "0%";

        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: "top 90%"
            },
            width: targetWidth,
            duration: 1.2,
            ease: "power2.out"
        });
    });

    gsap.from(".timeline-item", {
        scrollTrigger: {
            trigger: ".timeline-wrapper",
            start: "top 80%"
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.4)"
    });

    // --- 3. SERVICES SECTION GSAP ANIMATIONS ---
    gsap.from(".service-item", {
        scrollTrigger: {
            trigger: ".service-cards-container",
            start: "top 80%"
        },
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

    // --- 4. PORTFOLIO SECTION GSAP ANIMATIONS ---
    gsap.from(".portfolio-item", {
        scrollTrigger: {
            trigger: ".portfolio-grid",
            start: "top 80%"
        },
        opacity: 0,
        scale: 0.85,
        stagger: 0.2,
        duration: 0.7,
        ease: "power2.out"
    });

    // --- 5. CONTACT SECTION GSAP ANIMATIONS ---
    gsap.from(".contact-info-item", {
        scrollTrigger: {
            trigger: ".contact-info-wrapper",
            start: "top 85%"
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out"
    });
}

/* ===== ANIME.JS INTERACTION ANIMATIONS ===== */
function initAnimeJSInteractions() {
    if (typeof anime === "undefined") return;

    // Interactive Button Ripple / Scale Animation
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            anime({
                targets: btn,
                scale: 1.06,
                duration: 250,
                easing: "easeOutQuad"
            });
        });

        btn.addEventListener("mouseleave", () => {
            anime({
                targets: btn,
                scale: 1,
                duration: 200,
                easing: "easeOutQuad"
            });
        });
    });

    // Hover Animation on Service Icons
    document.querySelectorAll(".service-item-inner").forEach(card => {
        const icon = card.querySelector(".icon i");
        if (!icon) return;

        card.addEventListener("mouseenter", () => {
            anime({
                targets: icon,
                rotate: "1turn",
                scale: 1.25,
                duration: 500,
                easing: "easeInOutBack"
            });
        });

        card.addEventListener("mouseleave", () => {
            anime({
                targets: icon,
                rotate: 0,
                scale: 1,
                duration: 300,
                easing: "easeOutSine"
            });
        });
    });

    // Pulse animation on timeline dot nodes
    anime({
        targets: '.circle-dot',
        scale: [1, 1.4, 1],
        opacity: [0.8, 1, 0.8],
        loop: true,
        duration: 2000,
        easing: 'easeInOutSine'
    });
}

/* ===== PORTFOLIO FILTERING SYSTEM ===== */
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        portfolioItems.forEach(item => {
            const category = item.getAttribute("data-category");

            if (filterValue === "all" || filterValue === category) {
                item.style.display = "block";
                if (typeof anime !== "undefined") {
                    anime({
                        targets: item,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 400,
                        easing: "easeOutQuad"
                    });
                }
            } else {
                item.style.display = "none";
            }
        });
    });
});

/* ===== CONTACT FORM SUBMISSION ===== */
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    if (typeof anime !== "undefined") {
        anime({
            targets: form,
            scale: [1, 0.98, 1],
            duration: 300,
            easing: "easeInOutQuad"
        });
    }

    alert("Thank you! Your message has been sent successfully.");
    form.reset();
}

/* ===== NAVIGATION LINK ACTIVE TOGGLE ===== */
const navLinks = document.querySelectorAll(".nav li a");
const sections = document.querySelectorAll(".section");

navLinks.forEach(link => {
    link.addEventListener("click", function() {
        navLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");

        if (window.innerWidth < 1200) {
            document.querySelector(".aside").classList.remove("open");
        }
    });
});

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

/* ===== STYLE SWITCHER TOGGLE ===== */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
const styleSwitcher = document.querySelector(".style-switcher");

if (styleSwitcherToggle && styleSwitcher) {
    styleSwitcherToggle.addEventListener("click", () => {
        styleSwitcher.classList.toggle("open");
    });
}

window.addEventListener("scroll", () => {
    if (styleSwitcher && styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open");
    }
});

/* ===== THEME COLOR SWITCHER ===== */
const colorPalette = {
    'color-1': '#ec1839',
    'color-2': '#fa5b0f',
    'color-3': '#37b182',
    'color-4': '#185ec7',
    'color-5': '#e91e63'
};

function setActiveStyle(colorClass) {
    const selectedColor = colorPalette[colorClass] || '#ec1839';
    document.documentElement.style.setProperty('--skin-color', selectedColor);
    localStorage.setItem("preferred-color", selectedColor);
}

const savedColor = localStorage.getItem("preferred-color");
if (savedColor) {
    document.documentElement.style.setProperty('--skin-color', savedColor);
}

/* ===== DAY / NIGHT LIGHT & DARK MODE ===== */
const dayNight = document.querySelector(".day-night");

if (dayNight) {
    dayNight.addEventListener("click", () => {
        const icon = dayNight.querySelector("i");
        document.body.classList.toggle("light");
        
        if (document.body.classList.contains("light")) {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
            localStorage.setItem("theme-mode", "light");
        } else {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
            localStorage.setItem("theme-mode", "dark");
        }
    });
}

const savedTheme = localStorage.getItem("theme-mode");
if (savedTheme === "light") {
    document.body.classList.add("light");
    if (dayNight) {
        const icon = dayNight.querySelector("i");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

/* ===== ASIDE MOBILE TOGGLER ===== */
const navToggler = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");

if (navToggler && aside) {
    navToggler.addEventListener("click", () => {
        aside.classList.toggle("open");
    });
}
