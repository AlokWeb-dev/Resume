// Typing effect
const words = ["Frontend Developer", "Web Designer", "Freelancer", "Graphic Designer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typing = document.querySelector(".typing");

function typeEffect() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
        typing.textContent = currentWord.substring(0, charIndex++);
        if (charIndex > currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typing.textContent = currentWord.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();

// Scroll progress bar
const progress = document.querySelector(".progress-line");

window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.width = progressHeight + "%";
});

// Back to top button
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

topBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// Sticky navbar
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 60);
});

// Active nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// Theme toggle
const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const icon = themeBtn.querySelector("i");
    icon.className = document.body.classList.contains("light") ? "fa-solid fa-sun" : "fa-solid fa-moon";
});

// Reveal sections on scroll
const reveals = document.querySelectorAll("section");

function reveal() {
    const windowHeight = window.innerHeight;
    reveals.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < windowHeight - 100) {
            section.classList.add("active", "reveal");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal();
// Contact form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            formStatus.textContent = "Message sent successfully! I'll get back to you soon.";
            formStatus.classList.add("success");
            contactForm.reset();
        } else {
            formStatus.textContent = "Something went wrong. Please try again or email me directly.";
            formStatus.classList.add("error");
        }
    } catch (err) {
        formStatus.textContent = "Network error. Please check your connection and try again.";
        formStatus.classList.add("error");
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
});

// Mobile menu
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
    });
});
