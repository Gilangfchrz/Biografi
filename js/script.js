// DOM Elements
const darkModeToggle = document.getElementById("dark-mode-toggle");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");
const skillsGrid = document.getElementById("skills-grid");
const portfolioGrid = document.getElementById("portfolio-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

// Dark Mode Functionality
function initDarkMode() {
  // Check for saved theme preference or default to 'light'
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateDarkModeIcon(savedTheme);

  // Toggle theme when button is clicked
  darkModeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateDarkModeIcon(newTheme);
  });
}

function updateDarkModeIcon(theme) {
  const icon = darkModeToggle.querySelector("i");
  icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}

// Navigation Functionality
function initNavigation() {
  // Toggle mobile menu when hamburger is clicked
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling to sections
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Active nav link highlighting based on scroll position
  window.addEventListener("scroll", updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Skills Data
const skillsData = [
  { name: "HTML5", level: 90 },
  { name: "CSS3", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "React", level: 75 },
  { name: "Node.js", level: 70 },
  { name: "Python", level: 65 },
  { name: "MongoDB", level: 60 },
  { name: "Git", level: 85 },
];

// Portfolio Data
const portfolioData = [
  {
    id: 1,
    title: "E-Commerce Website",
    description:
      "Full-stack e-commerce platform with React and Node.js, featuring secure payments and real-time inventory management.",
    image: "fas fa-shopping-cart",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "web",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description:
      "Secure mobile banking application with biometric authentication and real-time transaction monitoring.",
    image: "fas fa-mobile-alt",
    tags: ["React Native", "Firebase", "Security", "Biometrics"],
    category: "mobile",
  },
  {
    id: 3,
    title: "UI/UX Design System",
    description:
      "Comprehensive design system for consistent user experience across multiple platforms and devices.",
    image: "fas fa-palette",
    tags: ["Figma", "Design System", "Prototyping", "Accessibility"],
    category: "design",
  },
  {
    id: 4,
    title: "Task Management App",
    description:
      "Collaborative task management with real-time updates, team collaboration, and project tracking.",
    image: "fas fa-tasks",
    tags: ["Vue.js", "Socket.io", "PostgreSQL", "Real-time"],
    category: "web",
  },
  {
    id: 5,
    title: "Fitness Tracking App",
    description:
      "Mobile fitness app with workout tracking, progress monitoring, and social features.",
    image: "fas fa-dumbbell",
    tags: ["Flutter", "Firebase", "Health API", "Social"],
    category: "mobile",
  },
  {
    id: 6,
    title: "Brand Identity Design",
    description:
      "Complete brand identity design including logo, color palette, typography, and brand guidelines.",
    image: "fas fa-paint-brush",
    tags: ["Branding", "Logo Design", "Typography", "Guidelines"],
    category: "design",
  },
];

// Skills Rendering
function renderSkills() {
  skillsGrid.innerHTML = "";

  skillsData.forEach((skill) => {
    const skillElement = document.createElement("div");
    skillElement.className = "skill-item fade-in";
    skillElement.innerHTML = `
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">
                <div class="skill-progress" style="width: 0%" data-width="${skill.level}%"></div>
            </div>
        `;
    skillsGrid.appendChild(skillElement);
  });

  // Animate skill progress bars when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector(".skill-progress");
        const width = progressBar.getAttribute("data-width");
        progressBar.style.width = width;
      }
    });
  });

  document.querySelectorAll(".skill-item").forEach((item) => {
    observer.observe(item);
  });
}

// Portfolio Rendering
function renderPortfolio() {
  portfolioGrid.innerHTML = "";

  portfolioData.forEach((item, index) => {
    const portfolioElement = document.createElement("div");
    portfolioElement.className = "portfolio-item fade-in";
    portfolioElement.style.animationDelay = `${index * 0.1}s`;
    portfolioElement.innerHTML = `
            <div class="portfolio-image">
                <i class="${item.image}"></i>
            </div>
            <div class="portfolio-content">
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-description">${item.description}</p>
                <div class="portfolio-tags">
                    ${item.tags
                      .map((tag) => `<span class="tag">${tag}</span>`)
                      .join("")}
                </div>
            </div>
        `;
    portfolioGrid.appendChild(portfolioElement);
  });
}

// Portfolio Filtering
function initPortfolioFilter() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active filter button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter portfolio items
      const filter = button.getAttribute("data-filter");
      const portfolioItems = document.querySelectorAll(".portfolio-item");

      portfolioItems.forEach((item, index) => {
        const itemData = portfolioData[index];
        const shouldShow = filter === "all" || itemData.category === filter;

        if (shouldShow) {
          item.style.display = "block";
          item.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// Form Validation
function validateForm() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  let isValid = true;

  // Clear previous errors
  document.querySelectorAll(".error-message").forEach((error) => {
    error.classList.remove("show");
  });

  document
    .querySelectorAll(".form-group input, .form-group textarea")
    .forEach((input) => {
      input.classList.remove("error");
    });

  // Validate name
  if (name.value.trim().length < 2) {
    showFieldError("name-error", "Nama harus minimal 2 karakter");
    name.classList.add("error");
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showFieldError("email-error", "Format email tidak valid");
    email.classList.add("error");
    isValid = false;
  }

  // Validate subject
  if (subject.value.trim().length < 5) {
    showFieldError("subject-error", "Subject harus minimal 5 karakter");
    subject.classList.add("error");
    isValid = false;
  }

  // Validate message
  if (message.value.trim().length < 10) {
    showFieldError("message-error", "Pesan harus minimal 10 karakter");
    message.classList.add("error");
    isValid = false;
  }

  return isValid;
}

function showFieldError(errorId, message) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

// Form Submission
function handleFormSubmit(e) {
  e.preventDefault();

  if (validateForm()) {
    // Simulate form submission
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage (in real app, this would be sent to server)
    const submissions = JSON.parse(
      localStorage.getItem("contactSubmissions") || "[]"
    );
    submissions.push(formData);
    localStorage.setItem("contactSubmissions", JSON.stringify(submissions));

    // Show success message
    showToast("Pesan berhasil dikirim! Terima kasih telah menghubungi saya.");

    // Reset form
    contactForm.reset();

    // Clear any error states
    document.querySelectorAll(".error-message").forEach((error) => {
      error.classList.remove("show");
    });
    document
      .querySelectorAll(".form-group input, .form-group textarea")
      .forEach((input) => {
        input.classList.remove("error");
      });
  }
}

// Toast Notification
function showToast(message) {
  const toastMessage = toast.querySelector(".toast-message");
  toastMessage.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Smooth Scrolling
function initSmoothScrolling() {
  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in class
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
}

// Local Storage Functions
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

function loadFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
}

// Initialize all functionality
function init() {
  initDarkMode();
  initNavigation();
  renderSkills();
  renderPortfolio();
  initPortfolioFilter();
  initSmoothScrolling();
  initScrollAnimations();

  // Form event listener
  contactForm.addEventListener("submit", handleFormSubmit);

  // Real-time form validation
  const formInputs = contactForm.querySelectorAll("input, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("blur", () => {
      validateForm();
    });
  });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", init);

// Handle window resize
window.addEventListener("resize", () => {
  // Close mobile menu on resize
  if (window.innerWidth > 768) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Handle scroll for navbar background
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.backdropFilter = "blur(20px)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  }

  // Dark theme navbar background
  if (document.documentElement.getAttribute("data-theme") === "dark") {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(17, 24, 39, 0.98)";
    } else {
      navbar.style.background = "rgba(17, 24, 39, 0.95)";
    }
  }
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Console welcome message
console.log(`
Welcome to Aiman Portfolio!
Contact: aiman@example.com
Portfolio: Interactive Personal Profile Website
Built with: HTML5, CSS3, JavaScript
`);

// Add some fun interactions
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }
});

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});
