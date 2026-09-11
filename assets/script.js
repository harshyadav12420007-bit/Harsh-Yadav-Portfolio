/* ===== TYPING ANIMATION ===== */
const roles = ["Graphic", "Web Designer", "UI/UX Designer", "Frontend Developer"];
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

// Start typing animation on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});

/* ===== STYLE SWITCHER TOGGLE ===== */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
const styleSwitcher = document.querySelector(".style-switcher");

if (styleSwitcherToggle && styleSwitcher) {
    styleSwitcherToggle.addEventListener("click", () => {
        styleSwitcher.classList.toggle("open");
    });
}

// Hide style switcher on scroll
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
    
    // Also save preference to localStorage
    localStorage.setItem("preferred-color", selectedColor);
}

// Restore saved color on load
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

// Restore theme mode preference
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
